import React, {useEffect, useMemo, useCallback, lazy, Suspense} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import URI from 'urijs'
import dayjs from 'dayjs'
import {timeStrampFormatYMD} from '../common/js/util.js'
import {PROXY_URL} from '../config.js'
import useNav from "../hooks/useNav.js";
import './App.css'

import BaseHeader from "../base_comp/header/BaseHeader.jsx"
import BaseNav from "../base_comp/nav/BaseNav.jsx";
import BaseDetail from '../base_comp/detail/BaseDetail.jsx'
import Candidate from './components/candidate/Candidate.jsx'
// import Schedule from './components/schedule/Schedule.jsx'
import {TrainContext} from './context.js'

import {
    setDepartStation, setArriveStation, setTrainNumber, setDepartDate,
    setSearchParsed, prevDate, nextDate,
    setDepartTimeStr, setArriveTimeStr, setArriveDate, setDurationStr, seTtickets,
    toggleIsScheduleVisible,
} from './store/actions.js'

const Schedule = lazy(() => import('./components/schedule/Schedule.jsx'))

function App(props) {
    const {
        departDate, arriveDate, departTimeStr, arriveTimeStr,
        departStation, arriveStation, trainNumber, durationStr,
        tickets, isScheduleVisible, searchParsed, dispatch,
    } = props

    const onBack = useCallback(() => {
        window.history.back()
    }, [])

    useEffect(() => {
        const queries = URI.parseQuery(window.location.search)
        const {dStation, aStation, date, trainNumber} = queries
        dispatch(setDepartStation(dStation))
        dispatch(setArriveStation(aStation))
        dispatch(setDepartDate(timeStrampFormatYMD(dayjs(date).valueOf())))
        dispatch(setTrainNumber(trainNumber))
        dispatch(setSearchParsed(true))
    }, [dispatch])

    const { isPrevDisabled, isNextDisabled, prev, next} = useNav(departDate, prevDate, nextDate, dispatch)

    useEffect(() => {
        document.title = trainNumber
    }, [trainNumber])

    useEffect(() => {
        if (!searchParsed) {
            return
        }
        const url = new URI(`${PROXY_URL}/rest/ticket`)
            .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
            .setSearch('trainNumber', trainNumber)
            .toString()
        fetch(url)
            .then(response => response.json())
            .then(result => {
                const {detail, candidates} = result
                const {departTimeStr, arriveTimeStr, arriveDate, durationStr} = detail
                dispatch(setDepartTimeStr(departTimeStr))
                dispatch(setArriveTimeStr(arriveTimeStr))
                dispatch(setArriveDate(arriveDate))
                dispatch(setDurationStr(durationStr))
                dispatch(seTtickets(candidates))
            })
    }, [dispatch, searchParsed, departDate, trainNumber])

    const detailCbs = useMemo(() => {
        return bindActionCreators({
            toggleIsScheduleVisible,
        }, dispatch)
    }, [dispatch])

    if (!searchParsed) {
        return null
    }

    return (
        <div className="app">
            <div className="header-wrapper">
                <BaseHeader title={trainNumber} onBack={onBack}></BaseHeader>
            </div>
            <div className="nav-wrapper">
                <BaseNav date={departDate} isPrevDisabled={isPrevDisabled} isNextDisabled={isNextDisabled}
                         prev={prev} next={next}></BaseNav>
            </div>
            <div className="detail-wrapper">
                <BaseDetail departDate={departDate} arriveDate={arriveDate}
                            departTimeStr={departTimeStr} arriveTimeStr={arriveTimeStr}
                            trainNumber={trainNumber} durationStr={durationStr}
                            departStation={departStation} arriveStation={arriveStation}>
                    <span className="left"></span>
                    <span className="schedule" onClick={() => detailCbs.toggleIsScheduleVisible()}>时刻表</span>
                    <span className="right"></span>
                </BaseDetail>
            </div>
            <TrainContext.Provider value={{trainNumber, departStation, arriveStation, departDate}}>
                <Candidate tickets={tickets}></Candidate>
            </TrainContext.Provider>
            { isScheduleVisible &&
            <div className="mask" onClick={() => dispatch(toggleIsScheduleVisible())}>
                <Suspense fallback={<div>loading</div>}>
                    <Schedule date={departDate} trainNumber={trainNumber}
                                  departStation={departStation} arriveStation={arriveStation}></Schedule>
                </Suspense>
            </div>
            }
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
