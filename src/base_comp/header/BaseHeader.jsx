import React from 'react'
import PropTypes from 'prop-types'
import './BaseHeader.css'

export default function BaseHeader(props) {
    const {onBack, title} = props
    return (
        <div className="header">
            <div className="header-back" onClick={onBack}>
                <svg width="42" height="42">
                    <polyline points="25,13 16,21 25,29" stroke="#fff" strokeWidth="2" fill="none"/>
                </svg>
            </div>
            <h1 className="header-title">{title}</h1>
        </div>
    )
}

BaseHeader.propTypes = {
    onBack: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
}
