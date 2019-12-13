import React from 'react'
import './journey.css'
import switchSvg from '../../images/switch.svg'

export default function Journey(props) {
    const {from, to, exchangeFromTo, showCitySeletor} = props

    return (
        <div className="journey">
            <div className="journey-station" onClick={() => showCitySeletor(true)}>
                <input className="journey-input journey-from" type="text" name="from" value={from} readOnly/>
            </div>
            <div className="journey-switch" onClick={() => exchangeFromTo()}>
                <img src={switchSvg} width="70" height="40" alt="switch" />
            </div>
            <div className="journey-station" onClick={() => showCitySeletor(false)}>
                <input className="journey-input journey-to" type="text" name="to" value={to} readOnly/>
            </div>
        </div>
    )
}
