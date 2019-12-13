import React, {useMemo, useCallback, useEffect} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import URI from 'urijs'
import dayjs from 'dayjs'
import {PROXY_URL} from '../config.js'
import './App.css'

import BaseHeader from "../base_comp/header/BaseHeader";
import BaseDetail from "../base_comp/detail/BaseDetail";
import Account from "./components/account/Account";
import Choose from "./components/choose/Choose";
import Passengers from "./components/passengers/Passengers";
import Ticket from "./components/ticket/Ticket";
import Menu from "./components/menu/Menu";

import {setDepartStation, setArriveStation, setTrainNumber, setSeatType, setDepartDate,
    fetchInitial, createAdult, createChild, setSearchParsed,
    removePassenger, updatePassenger, hideMenu,
    showGenderMenu, showFollowAdultMenu, showTicketTypeMenu, } from './store/actions.js'

function App(props) {
    const { trainNumber, departStation, arriveStation, seatType,
        departDate, arriveDate, departTimeStr, arriveTimeStr, durationStr,
        price, passengers, menu, isMenuVisible, searchParsed, dispatch} = props

    const onBack = useCallback(() => {
        window.history.back()
    }, [])

    useEffect(() => {
        const queries = URI.parseQuery(window.location.search)
        const {trainNumber, dStation, aStation, type, date} = queries
            dispatch(setDepartStation(dStation))
            dispatch(setArriveStation(aStation))
            dispatch(setTrainNumber(trainNumber))
            dispatch(setSeatType(type))
            dispatch(setDepartDate(dayjs(date).valueOf()))
            dispatch(setSearchParsed(true))
    }, [dispatch])

    useEffect(() => {
        if (!searchParsed) {
            return
        }
        const url = new URI(`${PROXY_URL}/rest/order`)
            .setSearch('dStation', departStation)
            .setSearch('aStation', arriveStation)
            .setSearch('type', seatType)
            .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
            .toString()
        dispatch(fetchInitial(url))
    }, [searchParsed, dispatch, departStation, arriveStation, seatType, departDate])

    const passengersCbs = useMemo(() => {
        return bindActionCreators({
            createAdult,
            createChild,
            removePassenger,
            updatePassenger,
            showGenderMenu,
            showFollowAdultMenu,
            showTicketTypeMenu,
        }, dispatch)
    }, [dispatch])

    const menuCbs = useMemo(() => {
        return bindActionCreators({
            hideMenu
        }, dispatch)
    }, [dispatch])

    const chooseCbs = useMemo(() => {
        return bindActionCreators({
            updatePassenger
        }, dispatch)
    }, [dispatch])

    if (!searchParsed) {
        return null
    }

    return (
        <div className="app">
            <div className="header-wrapper">
                <BaseHeader title="订单填写" onBack={onBack}></BaseHeader>
            </div>
            <div className="detail-wrapper">
                <BaseDetail departDate={departDate} arriveDate={arriveDate}
                            departTimeStr={departTimeStr} arriveTimeStr={arriveTimeStr}
                            trainNumber={trainNumber} durationStr={durationStr}
                            departStation={departStation} arriveStation={arriveStation}>
                    <span className="train-icon" style={{display: 'block'}}></span>
                </BaseDetail>
            </div>
            <Ticket price={price} type={seatType}></Ticket>
            <Passengers passengers={passengers} {...passengersCbs}></Passengers>
            {
                passengers.length > 0 && (
                <Choose passengers={passengers} {...chooseCbs}></Choose>
                )
            }
            <Account length={passengers.length} price={price}></Account>
            <Menu show={isMenuVisible} {...menu} {...menuCbs}></Menu>
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
