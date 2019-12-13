import React, {useMemo, useCallback, useEffect} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import URI from 'urijs'
import dayjs from 'dayjs'
import {timeStrampFormatYMD} from '../common/js/util.js'
import {PROXY_URL} from '../config.js'
import './App.css'
import {
    setFrom, setTo, setDepartDate, setHighSpeed, setSearchParsed,
    setTrainList, setTicketTypes, setTrainTypes, setDepartStations, setArriveStations,
    prevDate, nextDate,
    toggleOrderType, toggleHighSpeed, toggleOnlyTickets, toggleIsFiltersVisible,
    setCheckedTicketTypes, setCheckedTrainTypes, setCheckedDepartStations, setCheckedArriveStations,
    setDepartTimeStart, setDepartTimeEnd, setArriveTimeStart, setArriveTimeEnd,
} from './store/actions.js'

import BaseHeader from "../base_comp/header/BaseHeader.jsx"
import BaseNav from "../base_comp/nav/BaseNav.jsx"
import List from "./components/list/List.jsx"
import Bottom from "./components/bottom/Bottom.jsx"

import useNav from '../hooks/useNav.js'

function App(props) {
    const {
        trainList, from, to, departDate, highSpeed, orderType, onlyTickets, isFiltersVisible,
        ticketTypes, trainTypes, departStations, arriveStations,
        checkedTicketTypes, checkedTrainTypes, checkedDepartStations, checkedArriveStations,
        departTimeStart, departTimeEnd, arriveTimeStart, arriveTimeEnd,
        searchParsed, dispatch
    } = props
    useEffect(() => {
        const queries = URI.parseQuery(window.location.search)
        const {from, to, date, highSpeed} = queries
        dispatch(setFrom(from))
        dispatch(setTo(to))
        dispatch(setDepartDate(timeStrampFormatYMD(dayjs(date).valueOf())))
        dispatch(setHighSpeed(highSpeed === 'true'))
        dispatch(setSearchParsed(true))
    }, [dispatch])
    useEffect(() => {
        if (!searchParsed) {
            return
        }
        const url = new URI(`${PROXY_URL}/rest/query`)
            .setSearch('from', from)
            .setSearch('to', to)
            .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
            .setSearch('highSpeed', highSpeed)
            .setSearch('orderType', orderType)
            .setSearch('onlyTickets', onlyTickets)
            .setSearch('checkedTicketTypes', Object.keys(checkedTicketTypes).join())
            .setSearch('checkedTrainTypes', Object.keys(checkedTrainTypes).join())
            .setSearch('checkedDepartStations', Object.keys(checkedDepartStations).join())
            .setSearch('checkedArriveStations', Object.keys(checkedArriveStations).join())
            .setSearch('departTimeStart', departTimeStart)
            .setSearch('departTimeEnd', departTimeEnd)
            .setSearch('arriveTimeStart', arriveTimeStart)
            .setSearch('arriveTimeEnd', arriveTimeEnd)
            .toString()
        fetch(url).then(res => res.json())
            .then(result => {
                const {
                    dataMap: {
                        directTrainInfo: {
                            trains,
                            filter: {
                                ticketType,
                                trainType,
                                depStation,
                                arrStation,
                            }
                        }
                    }
                } = result
                dispatch(setTrainList(trains))
                dispatch(setTicketTypes(ticketType))
                dispatch(setTrainTypes(trainType))
                dispatch(setDepartStations(depStation))
                dispatch(setArriveStations(arrStation))
            })
    }, [
        searchParsed, from, to, departDate, highSpeed, orderType, onlyTickets,
        checkedTicketTypes, checkedTrainTypes, checkedDepartStations, checkedArriveStations,
        departTimeStart, departTimeEnd, arriveTimeStart, arriveTimeEnd, dispatch
    ])

    const onBack = useCallback(() => {
        window.history.back()
    }, [])

    const {isPrevDisabled, isNextDisabled, prev, next} = useNav(departDate, prevDate, nextDate, dispatch)

    const bottomCbs = useMemo(() => {
        return bindActionCreators({
            toggleOrderType,
            toggleHighSpeed,
            toggleOnlyTickets,
            toggleIsFiltersVisible,
            setCheckedTicketTypes, setCheckedTrainTypes, setCheckedDepartStations, setCheckedArriveStations,
            setDepartTimeStart, setDepartTimeEnd, setArriveTimeStart, setArriveTimeEnd,
        }, dispatch)
    }, [dispatch])

    return (
        <div>
            <div className="header-wrapper">
                <BaseHeader title={`${from} - ${to}`} onBack={onBack}></BaseHeader>
            </div>
            <BaseNav date={departDate} prev={prev} next={next}
                     isPrevDisabled={isPrevDisabled} isNextDisabled={isNextDisabled}></BaseNav>
            <List list={trainList}></List>
            <Bottom highSpeed={highSpeed} orderType={orderType}
                    onlyTickets={onlyTickets} isFiltersVisible={isFiltersVisible}
                    ticketTypes={ticketTypes} trainTypes={trainTypes}
                    departStations={departStations} arriveStations={arriveStations}
                    checkedTicketTypes={checkedTicketTypes} checkedTrainTypes={checkedTrainTypes}
                    checkedDepartStations={checkedDepartStations} checkedArriveStations={checkedArriveStations}
                    departTimeStart={departTimeStart} departTimeEnd={departTimeEnd}
                    arriveTimeStart={arriveTimeStart} arriveTimeEnd={arriveTimeEnd}
                    {...bottomCbs}>
            </Bottom>
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
