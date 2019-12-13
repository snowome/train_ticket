import React, {useMemo} from 'react'
import PropTypes from 'prop-types'
import {timeStrampFormatYMD} from '../../../common/js/util.js'
import dayjs from 'dayjs'
import './departDate.css'

export default function DepartDate(props) {
    const {time, onClick} = props

    const timeYMD = timeStrampFormatYMD(time)
    const _departDate = new Date(timeYMD)

    const departDateStr = useMemo(() => {
        return dayjs(timeYMD).format('YYYY-MM-DD')
    }, [timeYMD])

    const isToday = timeYMD === timeStrampFormatYMD()

    const weekStr = `周${['日', '一', '二', '三', '四', '五', '六'][_departDate.getDay()]}${isToday ? '(今天)' : ''}`

    return (
        <div className="depart-date" onClick={onClick}>
            <input name="date" type="hidden" value={departDateStr}/>
            {departDateStr}
            <span className="depart-week">{weekStr}</span>
        </div>
    )
}
DepartDate.propTypes = {
    time: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
}
