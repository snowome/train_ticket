import React, {useState, useMemo, useRef, useEffect, memo} from 'react'
import PropTypes from 'prop-types'
import leftPad from 'left-pad'
import './Slider.css'

import useWinResize from "../../../hooks/useWinResize";

const Slider = memo(function Slider(props) {
    const {title, currentStartHours, currentEndHours, onStartChanged, onEndChanged} = props

    const prevCurrentStartHours = useRef(currentStartHours)
    const prevCurrentEndHours = useRef(currentEndHours)
    const [start, setStart] = useState(() => currentStartHours / 24 * 100 )
    const [end, setEnd] = useState(() => currentEndHours / 24 * 100 )
    if (prevCurrentStartHours.current !== currentStartHours) {
        setStart(currentStartHours / 24 * 100)
        prevCurrentStartHours.current = currentStartHours
    }
    if (prevCurrentEndHours.current !== currentEndHours) {
        setEnd(currentEndHours / 24 * 100)
        prevCurrentEndHours.current = currentEndHours
    }

    const range = useRef()
    const startHandle = useRef()
    const endHandle = useRef()
    const lastStartX = useRef()
    const lastEndX = useRef()
    const rangeWidth = useRef()
    const winSize = useWinResize()

    const startPercent = useMemo(() => {
        if (start > 100) {
            return 100
        }
        if (start < 0) {
            return 0
        }
        return start
    }, [start])
    const endPercent = useMemo(() => {
        if (end > 100) {
            return 100
        }
        if (end < 0) {
            return 0
        }
        return end
    }, [end])
    const startHours = useMemo(() => {
        return Math.round(startPercent * 24 / 100)
    }, [startPercent])
    const endHours = useMemo(() => {
        return Math.round(endPercent * 24 / 100)
    }, [endPercent])
    const startText = useMemo(() => {
        return leftPad(startHours, 2, '0') + ':00'
    }, [startHours])
    const endText = useMemo(() => {
        return leftPad(endHours, 2, '0') + ':00'
    }, [endHours])

    function onStartTouchBegin(e) {
        const touch = e.targetTouches[0]
        lastStartX.current = touch.pageX
    }
    function onEndTouchBegin(e) {
        const touch = e.targetTouches[0]
        lastEndX.current = touch.pageX
    }
    function onStartTouchMove(e) {
        const touch = e.targetTouches[0]
        const distance = touch.pageX - lastStartX.current
        lastStartX.current = touch.pageX
        setStart(start => start + (distance / rangeWidth.current) * 100)
    }
    function onEndTouchMove(e) {
        const touch = e.targetTouches[0]
        const distance = touch.pageX - lastEndX.current
        lastEndX.current = touch.pageX
        setEnd(end => end + (distance / rangeWidth.current) * 100)
    }

    useEffect(() => {
        const startCurrent = startHandle.current
        const endCurrent = endHandle.current
        
        startCurrent.addEventListener('touchstart', onStartTouchBegin, false)
        startCurrent.addEventListener('touchmove', onStartTouchMove, false)
        endCurrent.addEventListener('touchstart', onEndTouchBegin, false)
        endCurrent.addEventListener('touchmove', onEndTouchMove, false)
        return () => {
            startCurrent.removeEventListener('touchstart', onStartTouchBegin, false)
            startCurrent.removeEventListener('touchmove', onStartTouchMove, false)
            endCurrent.removeEventListener('touchstart', onEndTouchBegin, false)
            endCurrent.removeEventListener('touchmove', onEndTouchMove, false)
        }
    })

    useEffect(() => {
        rangeWidth.current = parseFloat(
            window.getComputedStyle(range.current).width
        )
    }, [winSize.width, winSize.height])

    useEffect(() => {
        onStartChanged(startHours)
    }, [onStartChanged, startHours])
    useEffect(() => {
        onEndChanged(endHours)
    }, [onEndChanged, endHours])

    return (
        <div className="option">
            <h3>{title}</h3>
            <div className="range-slider">
                <div ref={range} className="slider">
                    <div className="slider-range" style={{
                        left: startPercent + '%',
                        width: endPercent - startPercent + '%'
                    }}>
                    </div>
                    <i ref={startHandle} className="slider-handle" style={{left: startPercent + '%'}}>
                        <span>{startText}</span>
                    </i>
                    <i ref={endHandle} className="slider-handle" style={{left: endPercent + '%'}}>
                        <span>{endText}</span>
                    </i>
                </div>
            </div>
        </div>
    )
})
Slider.propTypes = {
    title: PropTypes.string.isRequired,
    currentStartHours: PropTypes.number.isRequired,
    currentEndHours: PropTypes.number.isRequired,
    onStartChanged: PropTypes.func.isRequired,
    onEndChanged: PropTypes.func.isRequired,
}

export default Slider
