import * as types from './action_type.js'
import stateInit from './state.js'

export default {
    from(state = stateInit.from, action) {
        const {type, payload} = action
        switch(type) {
            case types.SET_FROM:
                return payload
            default:
                return state
        }
    },
    to(state = stateInit.to, action) {
        const {type, payload} = action
        switch(type) {
            case types.SET_TO:
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
    highSpeed(state = stateInit.highSpeed, action) {
        const {type, payload} = action
        let newCheckedTrainTypes

        switch(type) {
            case types.SET_HIGH_SPEED:
                return payload
            case types.SET_CHECKED_TRAIN_TYPES:
                newCheckedTrainTypes = payload
                return Boolean(newCheckedTrainTypes[1] && newCheckedTrainTypes[5])
            default:
                return state
        }
    },
    trainList(state = stateInit.trainList, action) {
        const {type, payload} = action
        switch(type) {
            case types.SET_TRAIN_LIST:
                return payload
            default:
                return state
        }
    },
    orderType(state = stateInit.orderType, action) {
        const {type, payload} = action
        switch(type) {
            case types.SET_ORDER_TYPE:
                return payload
            default:
                return state
        }
    },
    onlyTickets(state = stateInit.onlyTickets, action) {
        const {type, payload} = action
        switch(type) {
            case types.SET_ONLY_TICKETS:
                return payload
            default:
                return state
        }
    },
    ticketTypes(state = stateInit.ticketTypes, action) {
        const {type, payload} = action
        switch(type) {
            case types.SET_TICKET_TYPES:
                return payload
            default:
                return state
        }
    },
    checkedTicketTypes(state = stateInit.checkedTicketTypes, action) {
        const {type, payload} = action
        switch(type) {
            case types.SET_CHECKED_TICKET_TYPES:
                return payload
            default:
                return state
        }
    },
    trainTypes(state = stateInit.trainTypes, action) {
        const {type, payload} = action
        switch(type) {
            case types.SET_TRAIN_TYPES:
                return payload
            default:
                return state
        }
    },
    checkedTrainTypes(state = stateInit.checkedTrainTypes, action) {
        const {type, payload} = action
        let highSpeed, newCheckedTrainTypes

        switch(type) {
            case types.SET_CHECKED_TRAIN_TYPES:
                return payload
            case types.SET_HIGH_SPEED:
                highSpeed = payload
                newCheckedTrainTypes = {...state}

                if (highSpeed) {
                    newCheckedTrainTypes[1] = true
                    newCheckedTrainTypes[5] = true
                } else {
                    delete newCheckedTrainTypes[1]
                    delete newCheckedTrainTypes[5]
                }
                return newCheckedTrainTypes
            default:
                return state
        }
    },
    departStations(state = stateInit.departStations, action) {
        const {type, payload} = action
        switch(type) {
            case types.SET_DEPART_STATIONS:
                return payload
            default:
                return state
        }
    },
    checkedDepartStations(state = stateInit.checkedDepartStations, action) {
        const {type, payload} = action
        switch(type) {
            case types.SET_CHECKED_DEPART_STATIONS:
                return payload
            default:
                return state
        }
    },
    arriveStations(state = stateInit.arriveStations, action) {
        const {type, payload} = action
        switch(type) {
            case types.SET_ARRIVE_STATIONS:
                return payload
            default:
                return state
        }
    },
    checkedArriveStations(state = stateInit.checkedArriveStations, action) {
        const {type, payload} = action
        switch(type) {
            case types.SET_CHECKED_ARRIVE_STATIONS:
                return payload
            default:
                return state
        }
    },
    departTimeStart(state = stateInit.departTimeStart, action) {
        const {type, payload} = action
        switch(type) {
            case types.SET_DEPART_TIME_START:
                return payload
            default:
                return state
        }
    },
    departTimeEnd(state = stateInit.departTimeEnd, action) {
        const {type, payload} = action
        switch(type) {
            case types.SET_DEPART_TIME_END:
                return payload
            default:
                return state
        }
    },
    arriveTimeStart(state = stateInit.arriveTimeStart, action) {
        const {type, payload} = action
        switch(type) {
            case types.SET_ARRIVE_TIME_START:
                return payload
            default:
                return state
        }
    },
    arriveTimeEnd(state = stateInit.arriveTimeEnd, action) {
        const {type, payload} = action
        switch(type) {
            case types.SET_ARRIVE_TIME_END:
                return payload
            default:
                return state
        }
    },
    isFiltersVisible(state = stateInit.isFiltersVisible, action) {
        const {type, payload} = action
        switch(type) {
            case types.SET_IS_FILTERS_VISIBLE:
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
