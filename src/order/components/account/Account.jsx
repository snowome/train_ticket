import React, {useState, memo} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './Account.css'

const Account = memo(function Account(props) {
    const {price=0, length} = props
    const [expanded, setExpanded] = useState(false)

    return (
        <div className="account">
            <div className={classnames('price', {expanded})} onClick={() => setExpanded(!expanded)}>
                <div className="money">{price * length}</div>
                <div className="amount">支付金额</div>
            </div>
            <div className="button">提交按钮</div>
            <div className={classnames('layer', {hidden: !expanded})} onClick={() => setExpanded(false)}></div>
            <div className={classnames('detail', {hidden: !expanded})} onClick={() => setExpanded(false)}>
                <div className="title">金额详情</div>
                <ul>
                    <li>
                        <span>火车票</span>
                        <span>{price}</span>
                        <span>&#xd7;{length}</span>
                    </li>
                </ul>
            </div>
        </div>
    )
})
Account.propTypes = {
    price: PropTypes.number,
    length: PropTypes.number.isRequired,
}
export default Account
