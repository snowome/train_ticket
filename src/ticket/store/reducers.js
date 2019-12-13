import * as types from './action_type.js'
import stateInit from './state.js'

export default {
    departDate(state = stateInit.departDate, action){
        const {type, payload} = action
        switch(type) {
            case types.SET_DEPART_DATE:
                return payload
            default:
                return state
        }
    },
    arriveDate(state = stateInit.arriveDate, action){
        const {type, payload} = action
        switch(type) {
            case types.SET_ARRIVE_DATE:
                return payload
            default:
                return state
        }
    },
    departTimeStr(state = stateInit.departTimeStr, action){
        const {type, payload} = action
        switch(type) {
            case types.SET_DEPART_TIME_STR:
                return payload
            default:
                return state
        }
    },
    arriveTimeStr(state = stateInit.arriveTimeStr, action){
        const {type, payload} = action
        switch(type) {
            case types.SET_ARRIVE_TIME_STR:
                return payload
            default:
                return state
        }
    },
    departStation(state = stateInit.departStation, action){
        const {type, payload} = action
        switch(type) {
            case types.SET_DEPART_STATION:
                return payload
            default:
                return state
        }
    },
    arriveStation(state = stateInit.arriveStation, action){
        const {type, payload} = action
        switch(type) {
            case types.SET_ARRIVE_STATION:
                return payload
            default:
                return state
        }
    },
    trainNumber(state = stateInit.trainNumber, action){
        const {type, payload} = action
        switch(type) {
            case types.SET_TRAIN_NUMBER:
                return payload
            default:
                return state
        }
    },
    durationStr(state = stateInit.durationStr, action){
        const {type, payload} = action
        switch(type) {
            case types.SET_DURATION_STR:
                return payload
            default:
                return state
        }
    },
    tickets(state = stateInit.tickets, action){
        const {type, payload} = action
        switch(type) {
            case types.SET_TICKETS:
                return payload
            default:
                return state
        }
    },
    isScheduleVisible(state = stateInit.isScheduleVisible, action){
        const {type, payload} = action
        switch(type) {
            case types.SET_IS_SCHEDULE_VISIBLE:
                return payload
            default:
                return state
        }
    },
    searchParsed(state = stateInit.searchParsed, action){
        const {type, payload} = action
        switch(type) {
            case types.SET_SEARCH_PARSED:
                return payload
            default:
                return state
        }
    },
}
