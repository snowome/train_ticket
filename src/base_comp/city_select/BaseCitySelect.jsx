import React, {useState, useMemo, useEffect, useCallback, memo} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {PROXY_URL} from '../../config.js'
import './BaseCitySelect.css'

const CityItem = memo(function CityItem(props) {
    const {name, onSelect} = props
    return (
        <li className="city-li" onClick={() => onSelect(name)}>{name}</li>
    )
})
CityItem.propTypes = {
    name: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}

const CitySection = memo(function CitySection(props) {
    const {title, cities = [], onSelect} = props
    return (
        <ul className="city-ul">
            <li className="city-li" key="title" data-cate={title}>{title}</li>
            {
                cities.map(city => {
                    return (
                        <CityItem key={city.name} name={city.name} onSelect={onSelect}></CityItem>
                    )
                })
            }
        </ul>
    )
})
CitySection.propTypes = {
    title: PropTypes.string.isRequired,
    cities: PropTypes.array,
    onSelect: PropTypes.func.isRequired,
}

const AlphaIndex = memo(function (props) {
    const {alpha, onClick} = props
    return (
        <i className="city-index-item" onClick={() => onClick(alpha)}>{alpha}</i>
    )
})
AlphaIndex.propTypes = {
    alpha: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}
const alphabet = Array.from(new Array(26), (item, index) => {
    return String.fromCharCode(65 + index)
})

const CityList = memo(function CityList(props) {
    const {sections, onSelect, toAlpha} = props
    return (
        <div className="city-list">
            <div className="city-cate">
                {
                    sections.map(section => {
                        return (
                            <CitySection key={section.title} title={section.title}
                                         cities={section.citys} onSelect={onSelect}></CitySection>
                        )
                    })
                }
            </div>
            <div className="city-index">
                {
                    alphabet.map((alpha, index) => {
                        return <AlphaIndex alpha={alpha} key={index} onClick={toAlpha}></AlphaIndex>
                    })
                }
            </div>
        </div>
    )
})
CityList.propTypes = {
    sections: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    toAlpha: PropTypes.func.isRequired,
}

const SuggestItem = memo(function SuggestItem(props) {
    const {name, onClick} = props
    return (
        <li className="city-suggest-li" onClick={() => {onClick(name)}}>{name}</li>
    )
})
SuggestItem.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

const Suggest = memo(function Suggest(props) {
    const {searchKey, onSelect} = props
    const [result, setResult] = useState([])
    useEffect(() => {
        fetch(`${PROXY_URL}/rest/search?key=${encodeURIComponent(searchKey)}`)
            .then(res => res.json())
            .then(data => {
                const {result: resultArr, searchKey: sKey} = data
                if (sKey === searchKey) {
                    setResult(resultArr)
                }
            })
    }, [searchKey])
    const failBackResult = useMemo(() => {
        return result.length ? result : [{display: searchKey}]
    }, [result, searchKey])
    return (
        <div className="city-suggest">
            <ul className="city-suggest-ul">
                {
                    failBackResult.map((item, index) => {
                        return <SuggestItem name={item.display} onClick={onSelect} key={index}></SuggestItem>
                    })
                }
            </ul>
        </div>
    )
})
Suggest.propTypes = {
    searchKey: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}

const BaseCitySelect = memo(function BaseCitySelect(props) {
    const {show, cityDate, isLoading, onback, fetchCityData, onSelect} = props
    const [searchKey, setSearchKey] = useState('')

    const key = useMemo(() => {
        return searchKey.trim()
    }, [searchKey])

    useEffect(() => {
        if (!show || cityDate || isLoading) {
            return
        }
        fetchCityData()
    }, [show, cityDate, isLoading, fetchCityData])

    const toAlpha = useCallback(alhpa => {
        document.querySelector(`[data-cate='${alhpa}']`).scrollIntoView()
    }, [])

    const outputCitySections = () => {
        if (isLoading) {
            return <div>loading</div>
        }
        if (cityDate) {
            return <CityList sections={cityDate.cityList} onSelect={onSelect} toAlpha={toAlpha}></CityList>
        }
        return <div>error</div>
    }

    return (
        <div className={classnames('city-selector', {hidden: !show})}>
            <div className="city-search">
                <div className="search-back" onClick={() => onback()}>
                    <svg width="42" height="42">
                        <polyline points="25,13 16,21 25,29" stroke="#fff" strokeWidth="2" fill="none"></polyline>
                    </svg>
                </div>
                <div className="search-input-wrapper">
                    <input className="search-input" type="text"
                           value={searchKey} placeholder="城市、车站的中文或者拼音"
                           onChange={e => setSearchKey(e.target.value)}/>
                </div>
                <i className={classnames('search-clean', {hidden: key.length === 0})}
                   onClick={() => setSearchKey('')}>&#xf063;</i>
            </div>
            {
                Boolean(key) && (
                <Suggest searchKey={key} onSelect={key => {onSelect(key)}}></Suggest>
                )
            }
            {outputCitySections()}
        </div>
    )
})

BaseCitySelect.propTypes = {
    show: PropTypes.bool.isRequired,
    cityDate: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    onback: PropTypes.func.isRequired,
    fetchCityData: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
}

export default BaseCitySelect
