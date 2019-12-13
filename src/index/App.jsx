import React, {useCallback, useMemo} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import './App.css'
import {timeStrampFormatYMD} from '../common/js/util.js'

import BaseHeader from '../base_comp/header/BaseHeader.jsx'
import BaseCitySelect from '../base_comp/city_select/BaseCitySelect.jsx'
import BaseDateSelect from '../base_comp/date_select/BaseDateSelect.jsx'
import DepartDate from './components/depart_date/DepartDate.jsx'
import HighSpeed from './components/high_speed/HighSpeed.jsx'
import Journey from './components/journey/Journey'
import Submit from './components/submit/Submit'

import {exchangeFromTo, showCitySeletor, hideCitySeletor, fetchCityData, setSelectedCity,
    showDateSelector, hideDateSelector, setDepartDate, toggleHighSpeed} from './store/actions.js'

function App(props) {
    const {from, to, isCitySelectVisible, isDateSelectVisible, cityDate,
        isLoadingCityData, departDate, highSpeed, dispatch} = props

    const onBack = useCallback(() => {
        window.history.back()
    }, [])

    const callbacks = useMemo(() => {
        return bindActionCreators({
            exchangeFromTo,
            showCitySeletor,
        }, dispatch)
    }, [dispatch])

    const hideCitySeletorCbs = useMemo(() => {
        return bindActionCreators({
            onback: hideCitySeletor,
            fetchCityData,
            onSelect: setSelectedCity,
        }, dispatch)
    }, [dispatch])

    const departDateCbs = useMemo(() => {
        return bindActionCreators({
            onClick: showDateSelector
        }, dispatch)
    }, [dispatch])

    const dateSelectCbs = useMemo(() => {
        return bindActionCreators({
            onBack: hideDateSelector
        }, dispatch)
    }, [dispatch])

    const onSelectDate = useCallback((day) => {
        if (!day) {
            return
        }
        if (day < timeStrampFormatYMD()) {
            return
        }
        dispatch(setDepartDate(day))
        dispatch(hideDateSelector())
    }, [dispatch])

    const highSpeedCbs = useMemo(() => {
        return bindActionCreators({
            toggle: toggleHighSpeed
        }, dispatch)
    }, [dispatch])

    return (
        <div>
            <div className="header-wrapper">
                <BaseHeader title="火车票" onBack={onBack}></BaseHeader>
            </div>
            <form className="form" action="./query.html">
                <Journey from={from} to={to} {...callbacks}></Journey>
                <DepartDate time={departDate} {...departDateCbs}></DepartDate>
                <HighSpeed highSpeed={highSpeed} {...highSpeedCbs}></HighSpeed>
                <Submit></Submit>
            </form>
            <BaseCitySelect show={isCitySelectVisible}
                            cityDate={cityDate}
                            isLoading={isLoadingCityData} {...hideCitySeletorCbs}></BaseCitySelect>
            <BaseDateSelect show={isDateSelectVisible} {...dateSelectCbs} onSelect={onSelectDate}></BaseDateSelect>
        </div>
    )
}

export default connect(
    function mapStateToProps(state) {
        return state
    },
    function mapDispatchToProps(dispatch) {
        return {dispatch}
    }
)(App)
