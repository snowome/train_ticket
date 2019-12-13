import {timeStrampFormatYMD} from '../../common/js/util.js'
import {ORDER_DEPART} from '../config.js'

const state = {
    from: null,
    to: null,
    departDate: timeStrampFormatYMD(Date.now()),
    highSpeed: false,
    trainList: [],
    orderType: ORDER_DEPART,
    onlyTickets: false,
    ticketTypes: [],
    checkedTicketTypes: {},
    trainTypes: [],
    checkedTrainTypes: {},
    departStations: [],
    checkedDepartStations: {},
    arriveStations: [],
    checkedArriveStations: {},
    departTimeStart: 0,
    departTimeEnd: 24,
    arriveTimeStart: 0,
    arriveTimeEnd: 24,
    isFiltersVisible: false,
    searchParsed: false
}

export default state
