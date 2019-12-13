import * as types from './action_type.js'
import stateInit from './state.js'

export default {
    from(state = stateInit.from, action) {
        const {type, payload} = action
        switch (type) {
            case types.SET_FROM:
                return payload
            default:
                return state
        }
    },
    to(state = stateInit.to, action) {
        const {type, payload} = action
        switch (type) {
            case types.SET_TO:
                return payload
            default:
                return state
        }
    },
    isCitySelectVisible(state = stateInit.isCitySelectVisible, action) {
        const {type, payload} = action
        switch (type) {
            case types.SET_IS_CITY_SELECT_VISIBLE:
                return payload
            default:
                return state
        }
    },
    currentSelectLeftCity(state = stateInit.currentSelectLeftCity, action) {
        const {type, payload} = action
        switch (type) {
            case types.SET_CURRENT_SELECT_LEFT_CITY:
                return payload
            default:
                return state
        }
    },
    cityDate(state = stateInit.cityDate, action) {
        const {type, payload} = action
        switch (type) {
            case types.SET_CITY_DATA:
                return payload
            default:
                return state
        }
    },
    isLoadingCityData(state = stateInit.isLoadingCityData, action) {
        const {type, payload} = action
        switch (type) {
            case types.SET_IS_LOADING_CITY_DATA:
                return payload
            default:
                return state
        }
    },
    isDateSelectVisible(state = stateInit.isDateSelectVisible, action) {
        const {type, payload} = action
        switch (type) {
            case types.SET_IS_DATE_SELECT_VISIBLE:
                return payload
            default:
                return state
        }
    },
    highSpeed(state = stateInit.highSpeed, action) {
        const {type, payload} = action
        switch (type) {
            case types.SET_HIGH_SPEED:
                return payload
            default:
                return state
        }
    },
    departDate(state = stateInit.departDate, action) {
        const {type, payload} = action
        switch(type) {
            case types.SET_DEPART_DATE:
                return payload
            default:
                return state
        }
    },
}
