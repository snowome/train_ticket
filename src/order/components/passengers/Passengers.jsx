import React, {useMemo, memo} from 'react'
import PropTypes from 'prop-types'
import './Passengers.css'

const Passenger = memo(function (props) {
    const {
        id, name, ticketType,
        licenceNo,
        gender, birthday,
        onRemove, onUpdate,
        showGenderMenu, showFollowAdultMenu, showTicketTypeMenu, followAdultName,
    } = props

    const isAdult = ticketType === 'adult'

    return (
        <li className="passenger">
            <i className="delete" onClick={() => onRemove(id)}>
                -
            </i>
            <ol className="items">
                <li className="item">
                    <label className="label name">姓名</label>
                    <input className="input name" value={name} onChange={(e) => onUpdate(id, {name: e.target.value})}
                           placeholder="乘客姓名"/>
                    <label className="ticket-type" onClick={() => showTicketTypeMenu(id)}>
                        {isAdult ? '成人票' : '儿童票'}
                    </label>
                </li>
                {
                    isAdult && (
                    <li className="item">
                        <label className="label licenceNo">身份证</label>
                        <input className="input name" value={licenceNo}
                                   onChange={(e) => onUpdate(id, {licenceNo: e.target.value})} placeholder="证件号码"/>
                    </li>
                    )
                }
                {
                    !isAdult && (
                    <li className="item arrow">
                        <label className="label gender">性别</label>
                        <input className="input gender"
                                   value={gender === 'male' ? '男' : gender === 'female' ? '女' : ''}
                                   onClick={() => showGenderMenu(id)}
                                   readOnly placeholder="请选择"/>
                    </li>
                    )
                }
                {
                    !isAdult && (
                    <li className="item">
                        <label className="label birthday">出生日期</label>
                        <input className="input birthday" value={birthday}
                                   onChange={(e) => onUpdate(id, {birthday: e.target.value})} placeholder="如 19951015"/>
                    </li>
                    )
                }
                {
                    !isAdult && (
                    <li className="item arrow">
                        <label className="label followAdult">同行成人</label>
                        <input className="input followAdult" value={followAdultName}
                                   onClick={() => showFollowAdultMenu(id)}
                                   readOnly placeholder="请选择"/>
                    </li>
                    )
                }
            </ol>
        </li>
    )
})
Passenger.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ticketType: PropTypes.string.isRequired,
    licenceNo: PropTypes.string,
    followAdult: PropTypes.number,
    gender: PropTypes.string,
    birthday: PropTypes.string,
    onRemove: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    showGenderMenu: PropTypes.func.isRequired,
    showFollowAdultMenu: PropTypes.func.isRequired,
    showTicketTypeMenu: PropTypes.func.isRequired,
    followAdultName: PropTypes.string,
}

const Passengers = memo(function Passengers(props) {
    const {
        passengers, createAdult, createChild, removePassenger, updatePassenger,
        showGenderMenu, showFollowAdultMenu, showTicketTypeMenu,
    } = props

    const nameMap = useMemo(() => {
        const ret = {}
        for (let passenger of passengers) {
            ret[passenger.id] = passenger.name
        }
        return ret
    }, [passengers])

    return (
        <div className="passengers">
            <ul>
                {
                    passengers.map((passenger, index) => {
                        return <Passenger {...passenger}
                                          followAdultName={nameMap[passenger.followAdult]}
                                          showGenderMenu={showGenderMenu}
                                          showFollowAdultMenu={showFollowAdultMenu}
                                          showTicketTypeMenu={showTicketTypeMenu}
                                          onRemove={removePassenger}
                                          onUpdate={updatePassenger}
                                          key={index}></Passenger>
                    })
                }
            </ul>
            <section className="add">
                <div className="adult" onClick={() => createAdult()}>添加成人</div>
                <div className="child" onClick={() => createChild()}>添加儿童</div>
            </section>
        </div>
    )
})
Passengers.propTypes = {
    passengers: PropTypes.array.isRequired,
    createAdult: PropTypes.func.isRequired,
    createChild: PropTypes.func.isRequired,
    removePassenger: PropTypes.func.isRequired,
    updatePassenger: PropTypes.func.isRequired,
    showGenderMenu: PropTypes.func.isRequired,
    showFollowAdultMenu: PropTypes.func.isRequired,
    showTicketTypeMenu: PropTypes.func.isRequired,
}
export default Passengers
