import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import BaseHeader from "../header/BaseHeader";
import './BaseDateSelect.css'
import {timeStrampFormatYMD} from '../../common/js/util.js'

function Day(props) {
    const {day, onSelect} = props
    if (!day) {
        return <td className="null"></td>
    }
    const classes = []
    const now = timeStrampFormatYMD()
    if (day < now) {
        classes.push('disabled')
    }
    if ([6, 0].includes(new Date(day).getDay())) {
        classes.push('weekend')
    }
    const dateStr = now === day ? '今天' : new Date(day).getDate()
    return (
        <td className={classnames(classes)} onClick={() => onSelect(day)}>{dateStr}</td>
    )
}
Day.propTypes = {
    day: PropTypes.number,
    onSelect: PropTypes.func.isRequired
}

function Week(props) {
    const {days, onSelect} = props

    return (
        <tr className="date-table-days">
            {
                days.map((day, index) => {
                    return (
                        <Day key={index} day={day} onSelect={onSelect}></Day>
                    )
                })
            }
        </tr>
    )
}

Week.propTypes = {
    days: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired
}

function Month(props) {
    const {startTimeInMonth, onSelect} = props

    const startDay = new Date(startTimeInMonth)
    const curDay = new Date(startTimeInMonth)

    let days = []

    while (curDay.getMonth() === startDay.getMonth()) {
        days.push(curDay.getTime())
        curDay.setDate(curDay.getDate() + 1)
    }

    days = new Array(startDay.getDay() ? startDay.getDay() - 1 : 6).fill(null).concat(days)

    const lastDay = new Date(days[days.length - 1])
    days = days.concat(new Array(lastDay.getDay() ? 7 - lastDay.getDay() : 0).fill(null))

    const weeks = []
    for (let row = 0; row < days.length / 7; row++) {
        const week = days.slice(row * 7, (row + 1) * 7)
        weeks.push(week)
    }

    return (
        <table className="date-table">
            <thead>
                <tr>
                    <td colSpan="7"><h5>{startDay.getFullYear()}年{startDay.getMonth() + 1}月</h5></td>
                </tr>
            </thead>
            <tbody>
                <tr className="date-table-weeks">
                    <th>周一</th>
                    <th>周二</th>
                    <th>周三</th>
                    <th>周四</th>
                    <th>周五</th>
                    <th className="weekend">周六</th>
                    <th className="weekend">周日</th>
                </tr>
                {
                weeks.map((item, index) => {
                    return (
                        <Week key={index} days={item} onSelect={onSelect}></Week>
                    )
                })
            }
            </tbody>
        </table>
    )
}

Month.propTypes = {
    startTimeInMonth: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired,
}

export default function BaseDateSelect(props) {
    const {show, onSelect, onBack} = props

    const now = new Date()
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    now.setMilliseconds(0)
    now.setDate(1)
    const monthSequence = [now.getTime()]

    now.setMonth(now.getMonth() + 1)
    monthSequence.push(now.getTime())

    now.setMonth(now.getMonth() + 1)
    monthSequence.push(now.getTime())

    return (
        <div className={classnames('date-selector', {hidden: !show})}>
            <BaseHeader title="日期选择" onBack={onBack}></BaseHeader>
            <div className="date-selector-tables">
                {
                    monthSequence.map((month, index) => {
                        return (
                            <Month key={index} startTimeInMonth={month} onSelect={onSelect}></Month>
                        )
                    })
                }
            </div>
        </div>
    )
}
BaseDateSelect.propTypes = {
    show: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired
}
