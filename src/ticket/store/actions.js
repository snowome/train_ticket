import * as types from './action_type.js'
import {timeStrampFormatYMD} from "../../common/js/util";

export function setDepartDate(departDate) {
    return {
        type: types.SET_DEPART_DATE,
        payload: departDate
    }
}

export function setArriveDate(arriveDate) {
    return {
        type: types.SET_ARRIVE_DATE,
        payload: arriveDate
    }
}

export function setDepartTimeStr(departTimeStr) {
    return {
        type: types.SET_DEPART_TIME_STR,
        payload: departTimeStr
    }
}

export function setArriveTimeStr(arriveTimeStr) {
    return {
        type: types.SET_ARRIVE_TIME_STR,
        payload: arriveTimeStr
    }
}

export function setDepartStation(departStation) {
    return {
        type: types.SET_DEPART_STATION,
        payload: departStation
    }
}

export function setArriveStation(arriveStation) {
    return {
        type: types.SET_ARRIVE_STATION,
        payload: arriveStation
    }
}

export function setTrainNumber(trainNumber) {
    return {
        type: types.SET_TRAIN_NUMBER,
        payload: trainNumber
    }
}

export function setDurationStr(durationStr) {
    return {
        type: types.SET_DURATION_STR,
        payload: durationStr
    }
}

export function seTtickets(tickets) {
    return {
        type: types.SET_TICKETS,
        payload: tickets
    }
}

export function setIsScheduleVisible(isScheduleVisible) {
    return {
        type: types.SET_IS_SCHEDULE_VISIBLE,
        payload: isScheduleVisible
    }
}
export function toggleIsScheduleVisible() {
    return (dispatch, getState) => {
        const {isScheduleVisible} = getState()
        dispatch(setIsScheduleVisible(!isScheduleVisible))
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
