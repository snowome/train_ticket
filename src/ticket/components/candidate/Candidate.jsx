import React, {useState, useMemo, useCallback, useContext, memo} from 'react'
import PropTypes from 'prop-types'
import URI from 'urijs'
import dayjs from 'dayjs'
import './Candidate.css'
import {TrainContext} from '../../context.js'

const Channel = memo(function Channel(props) {
    const {name, desc, type} = props

    const {trainNumber, departStation, arriveStation, departDate} = useContext(TrainContext)

    const src = useMemo(() => {
        return new URI('order.html')
            .setSearch('trainNumber', trainNumber)
            .setSearch('dStation', departStation)
            .setSearch('aStation', arriveStation)
            .setSearch('type', type)
            .setSearch('date', dayjs(departDate).format('YYYY-YY-DD'))
            .toString()
    }, [trainNumber, departStation, arriveStation, departDate, type])

    return (
        <div className="channel">
            <div className="middle">
                <div className="name">{name}</div>
                <div className="desc">{desc}</div>
            </div>
            <a className="buy-wrapper" href={src}>
                <div className="buy">买票</div>
            </a>
        </div>
    )
})
Channel.propTypes = {
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

const Seat = memo(function Seat(props) {
    const {type, priceMsg, ticketsLeft, channels, expanded, onToggle, idx} = props

    return (
        <li>
            <div className="bar" onClick={() => onToggle(idx)}>
                <span className="seat">{type}</span>
                <span className="price"><i>￥</i>{priceMsg}</span>
                <span className="btn">{expanded ? '预定' : '收起'}</span>
                <span className="num">{ticketsLeft}</span>
            </div>
            <div className="channels" style={{height: expanded ? channels.length * 55 + 'px' : 0}}>
                {
                    channels.map((channel, index) => {
                        return <Channel {...channel} type={type} key={index}></Channel>
                    })
                }
            </div>
        </li>
    )
})
Seat.propTypes = {
    type: PropTypes.string.isRequired,
    priceMsg: PropTypes.string.isRequired,
    ticketsLeft: PropTypes.string.isRequired,
    channels: PropTypes.array.isRequired,
    expanded: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    idx: PropTypes.number.isRequired,
}

const Candidate = memo(function Candidate(props) {
    const {tickets} = props

    const [expandedIndex, setExpandedIndex] = useState(0)

    const onToggle = useCallback(index => {
        setExpandedIndex(index === expandedIndex ? -1 : index)
    }, [expandedIndex])

    return (
        <div className="candidate">
            <ul>
                {
                    tickets.map((ticket, index) => {
                        return <Seat {...ticket} expanded={expandedIndex === index}
                                     onToggle={onToggle} idx={index} key={index}></Seat>
                    })
                }
            </ul>
        </div>
    )
})
Candidate.propTypes = {
    tickets: PropTypes.array.isRequired
}
export default Candidate
