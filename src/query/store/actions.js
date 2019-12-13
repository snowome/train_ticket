import * as types from './action_type.js'
import {timeStrampFormatYMD} from '../../common/js/util.js'
import {ORDER_DEPART, ORDER_DURATION} from '../config.js'

export function setFrom(from) {
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

export function setDepartDate(departDate) {
    return {
        type: types.SET_DEPART_DATE,
        payload: departDate
    }
}

export function setHighSpeed(highSpeed) {
    return {
        type: types.SET_HIGH_SPEED,
        payload: highSpeed
    }
}

export function toggleHighSpeed() {
    return (dispatch, getState) => {
        const {highSpeed} = getState()
        dispatch(setHighSpeed(!highSpeed))
    }
}

export function setTrainList(trainList) {
    return {
        type: types.SET_TRAIN_LIST,
        payload: trainList
    }
}

export function toggleOrderType() {
    return (dispatch, getState) => {
        const {orderType} = getState()
        if (orderType === ORDER_DEPART) {
            dispatch({
                type: types.SET_ORDER_TYPE,
                payload: ORDER_DURATION
            })
        } else {
            dispatch({
                type: types.SET_ORDER_TYPE,
                payload: ORDER_DEPART
            })
        }
    }
}

export function toggleOnlyTickets() {
    return (dispatch, getState) => {
        const {onlyTickets} = getState()
        dispatch({
            type: types.SET_ONLY_TICKETS,
            payload: !onlyTickets
        })
    }
}

export function setTicketTypes(ticketTypes) {
    return {
        type: types.SET_TICKET_TYPES,
        payload: ticketTypes
    }
}

export function setCheckedTicketTypes(checkedTicketTypes) {
    return {
        type: types.SET_CHECKED_TICKET_TYPES,
        payload: checkedTicketTypes
    }
}

export function setTrainTypes(trainTypes) {
    return {
        type: types.SET_TRAIN_TYPES,
        payload: trainTypes
    }
}

export function setCheckedTrainTypes(checkedTrainTypes) {
    return {
        type: types.SET_CHECKED_TRAIN_TYPES,
        payload: checkedTrainTypes
    }
}

export function setDepartStations(departStations) {
    return {
        type: types.SET_DEPART_STATIONS,
        payload: departStations
    }
}

export function setCheckedDepartStations(checkedDepartStations) {
    return {
        type: types.SET_CHECKED_DEPART_STATIONS,
        payload: checkedDepartStations
    }
}

export function setArriveStations(arriveStations) {
    return {
        type: types.SET_ARRIVE_STATIONS,
        payload: arriveStations
    }
}

export function setCheckedArriveStations(checkedArriveStations) {
    return {
        type: types.SET_CHECKED_ARRIVE_STATIONS,
        payload: checkedArriveStations
    }
}

export function setDepartTimeStart(departTimeStart) {
    return {
        type: types.SET_DEPART_TIME_START,
        payload: departTimeStart
    }
}

export function setDepartTimeEnd(departTimeEnd) {
    return {
        type: types.SET_DEPART_TIME_END,
        payload: departTimeEnd
    }
}

export function setArriveTimeStart(arriveTimeStart) {
    return {
        type: types.SET_ARRIVE_TIME_START,
        payload: arriveTimeStart
    }
}

export function setArriveTimeEnd(arriveTimeEnd) {
    return {
        type: types.SET_ARRIVE_TIME_END,
        payload: arriveTimeEnd
    }
}

export function toggleIsFiltersVisible() {
    return (dispatch, getState) => {
        const {isFiltersVisible} = getState()
        dispatch({
            type: types.SET_IS_FILTERS_VISIBLE,
            payload: !isFiltersVisible
        })
    }
}

export function setSearchParsed(searchParsed) {
    return {
        type: types.SET_SEARCH_PARSED,
        payload: searchParsed
    }
}

export function nextDate() {
    return (dispatch, getstate) => {
        const {departDate} = getstate()
        dispatch(setDepartDate(timeStrampFormatYMD(departDate) + 86400 * 1000))
    }
}

export function prevDate() {
    return (dispatch, getstate) => {
        const {departDate} = getstate()
        dispatch(setDepartDate(timeStrampFormatYMD(departDate) - 86400 * 1000))
    }
}
