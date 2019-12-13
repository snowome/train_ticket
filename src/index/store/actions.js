import * as types from './action_type.js'
import {PROXY_URL} from '../../config.js'

export function serFrom(from) {
    return {
        type: types.SET_FROM,
        payload: from
    }
}

export function setTo(to) {
    return {
        type: types.SET_TO,
        payload: to
    }
}

export function exchangeFromTo() {
    return (dispatch, getState) => {
        const {from, to} = getState()
        dispatch(serFrom(to))
        dispatch(setTo(from))
    }
}

export function showCitySeletor(currentSelectLeftCity) {
    return (dispatch, getState) => {
        dispatch({
            type: types.SET_IS_CITY_SELECT_VISIBLE,
            payload: true
        })
        dispatch({
            type: types.SET_CURRENT_SELECT_LEFT_CITY,
            payload: currentSelectLeftCity
        })
    }
}

export function hideCitySeletor() {
    return {
        type: types.SET_IS_CITY_SELECT_VISIBLE,
        payload: false
    }
}

export function setSelectedCity(city) {
    return (dispatch, getState) => {
        const {currentSelectLeftCity} = getState()
        if (currentSelectLeftCity) {
            dispatch(serFrom(city))
        } else {
            dispatch(setTo(city))
        }
        dispatch(hideCitySeletor())
    }
}

export function setCityDate(cityDate) {
    return {
        type: types.SET_CITY_DATA,
        payload: cityDate
    }
}

export function setIsLoadingCityData(isLoadingCityData) {
    return {
        type: types.SET_IS_LOADING_CITY_DATA,
        payload: isLoadingCityData
    }
}

export function showDateSelector() {
    return {
        type: types.SET_IS_DATE_SELECT_VISIBLE,
        payload: true
    }
}

export function hideDateSelector() {
    return {
        type: types.SET_IS_DATE_SELECT_VISIBLE,
        payload: false
    }
}


export function toggleHighSpeed() {
    return (dispatch, getState) => {
        const {highSpeed} = getState()
        dispatch({
            type: types.SET_HIGH_SPEED,
            payload: !highSpeed
        })
    }
}

export function setDepartDate(departDate) {
    return {
        type: types.SET_DEPART_DATE,
        payload: departDate
    }
}

export function fetchCityData() {
    return (dispatch, getState) => {
        const {isLoadingCityData} = getState()
        if (isLoadingCityData) {
            return
        }
        const CACHE_NAME = 'city_data_cache'
        let cache = localStorage.getItem(CACHE_NAME)
        if (cache) {
            cache = JSON.parse(cache)
            if (cache.expires && cache.expires > Date.now()) {
                dispatch(setCityDate(cache.data))
                return
            }
        }
        dispatch(setIsLoadingCityData(true))
        fetch(`${PROXY_URL}/rest/cities?t=${Date.now()}`)
            .then(res => res.json())
            .then(cityData => {
                dispatch(setCityDate(cityData))
                localStorage.setItem(
                    CACHE_NAME,
                    JSON.stringify({
                        expires: Date.now() + 60 * 1000,
                        data: cityData
                    })
                )
                dispatch(setIsLoadingCityData(false))
            })
            .catch(err => {
                dispatch(setIsLoadingCityData(false))
            })
    }
}
