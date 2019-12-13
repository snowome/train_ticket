import * as types from './action_type.js'
import stateInit from './state.js'

export default {
    trainNumber(state = stateInit.trainNumber, action) {
        const {type, payload} = action
        switch(type) {
            case types.SET_TRAIN_NUMBER:
                return payload
            default:
                return state
        }
    },
    departStation(state = stateInit.departStation, action) {
        const {type, payload} = action
        switch(type) {
            case types.SET_DEPART_STATION:
                return payload
            default:
                return state
        }
    },
    arriveStation(state = stateInit.arriveStation, action) {
        const {type, payload} = action
        switch(type) {
            case types.SET_ARRIVE_STATION:
                return payload
            default:
                return state
        }
    },
    seatType(state = stateInit.seatType, action) {
        const {type, payload} = action
        switch(type) {
            case types.SET_SEAT_TYPE:
                return payload
            default:
                return state
        }
    },
    departDate(state = stateInit.departDate, action) {
        const {type, payload} = action
        switch(type) {
            case types.SET_DEAPAT_DATE:
                return payload
            default:
                return state
        }
    },
    arriveDate(state = stateInit.arriveDate, action) {
        const {type, payload} = action
        switch(type) {
            case types.SET_ARRIVE_DATE:
                return payload
            default:
                return state
        }
    },
    departTimeStr(state = stateInit.departTimeStr, action) {
        const {type, payload} = action
        switch(type) {
            case types.SET_DEPART_TIME_STR:
                return payload
            default:
                return state
        }
    },
    arriveTimeStr(state = stateInit.arriveTimeStr, action) {
        const {type, payload} = action
        switch(type) {
            case types.SET_ARRIVE_TIME_STR:
                return payload
            default:
                return state
        }
    },
    durationStr(state = stateInit.durationStr, action) {
        const {type, payload} = action
        switch(type) {
            case types.SET_DURATION_STR:
                return payload
            default:
                return state
        }
    },
    price(state = stateInit.price, action) {
        const {type, payload} = action
        switch(type) {
            case types.SET_PRICE:
                return payload
            default:
                return state
        }
    },
    passengers(state = stateInit.passengers, action) {
        const {type, payload} = action
        switch(type) {
            case types.SET_PASSENGERS:
                return payload
            default:
                return state
        }
    },
    menu(state = stateInit.menu, action) {
        const {type, payload} = action
        switch(type) {
            case types.SET_MENU:
                return payload
            default:
                return state
        }
    },
    isMenuVisible(state = stateInit.isMenuVisible, action) {
        const {type, payload} = action
        switch(type) {
            case types.SET_IS_MENU_VISIBLE:
                return payload
            default:
                return state
        }
    },
    searchParsed(state = stateInit.searchParsed, action) {
        const {type, payload} = action
        switch(type) {
            case types.SET_SEARCH_PARSED:
                return payload
            default:
                return state
        }
    },
}
