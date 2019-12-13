import * as types from './action_type.js'

export function setTrainNumber(trainNumber) {
    return {
        type: types.SET_TRAIN_NUMBER,
        payload: trainNumber,
    }
}

export function setDepartStation(departStation) {
    return {
        type: types.SET_DEPART_STATION,
        payload: departStation,
    }
}

export function setArriveStation(arriveStation) {
    return {
        type: types.SET_ARRIVE_STATION,
        payload: arriveStation,
    }
}

export function setSeatType(seatType) {
    return {
        type: types.SET_SEAT_TYPE,
        payload: seatType,
    }
}

export function setDepartDate(departDate) {
    return {
        type: types.SET_DEAPAT_DATE,
        payload: departDate,
    }
}

export function setArriveDate(arriveDate) {
    return {
        type: types.SET_ARRIVE_DATE,
        payload: arriveDate,
    }
}

export function setDepartTimeStr(departTimeStr) {
    return {
        type: types.SET_DEPART_TIME_STR,
        payload: departTimeStr,
    }
}

export function setArriveTimeStr(arriveTimeStr) {
    return {
        type: types.SET_ARRIVE_TIME_STR,
        payload: arriveTimeStr,
    }
}

export function setDurationStr(durationStr) {
    return {
        type: types.SET_DURATION_STR,
        payload: durationStr,
    }
}

export function setPrice(price) {
    return {
        type: types.SET_PRICE,
        payload: price,
    }
}

export function setPassengers(passenge) {
    return {
        type: types.SET_PASSENGERS,
        payload: passenge,
    }
}

export function setMenu(menu) {
    return {
        type: types.SET_MENU,
        payload: menu,
    }
}

export function setIsMenuVisible(isMenuVisible) {
    return {
        type: types.SET_IS_MENU_VISIBLE,
        payload: isMenuVisible,
    }
}

export function setSearchParsed(searchParsed) {
    return {
        type: types.SET_SEARCH_PARSED,
        payload: searchParsed,
    }
}

export function fetchInitial(url) {
    return (dispatch, getState) => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const {departTimeStr, arriveTimeStr, arriveDate, durationStr, price} = data
                dispatch(setDepartTimeStr(departTimeStr))
                dispatch(setArriveTimeStr(arriveTimeStr))
                dispatch(setArriveDate(arriveDate))
                dispatch(setDurationStr(durationStr))
                dispatch(setPrice(price))
            })
    }
}

let passengerIdSeed = 0

export function createAdult() {
    return (dispatch, getState) => {
        const {passengers} = getState()

        for (let passenger of passengers) {
            const keys = Object.keys(passenger)
            for (let key of keys) {
                if (!passenger[key]) {
                    return
                }
            }
        }

        dispatch(setPassengers([
            ...passengers,
            {
                id: ++passengerIdSeed,
                name: '',
                ticketType: 'adult',
                licenceNo: '',
                seat: 'Z',

            }
        ]))
    }
}

export function createChild() {
    return (dispatch, getState) => {
        const {passengers} = getState()
        let adultFound = null

        for (let passenger of passengers) {
            const keys = Object.keys(passenger)
            for (let key of keys) {
                if (!passenger[key]) {
                    return
                }
            }
            if (passenger.ticketType === 'adult') {
                adultFound = passenger.id
            }
        }

        if (!adultFound) {
            alert('请至少添加一个同行成人')
            return
        }

        dispatch(setPassengers([
            ...passengers,
            {
                id: ++passengerIdSeed,
                name: '',
                gender: 'none',
                birthday: '',
                followAdult: adultFound,
                ticketType: 'child',
                seat: 'Z',
            }
        ]))
    }
}

export function removePassenger(id) {
    return (dispatch, getState) => {
        const {passengers} = getState()

        const newPassengers = passengers.filter((passenger) => {
            return passenger.id !== id && passenger.followAdult !== id
        })
        dispatch(setPassengers(newPassengers))
    }
}

export function updatePassenger(id, data, keysToBeRemoved = []) {
    return (dispatch, getState) => {
        const {passengers} = getState()

        for (let i = 0; i < passengers.length; i++) {
            if (passengers[i].id === id) {
                const newPassengers = [...passengers]
                newPassengers[i] = Object.assign({}, passengers[i], data)
                for (let key of keysToBeRemoved) {
                    delete newPassengers[i][key]
                }
                dispatch(setPassengers(newPassengers))
                break
            }
        }
    }
}

export function showMenu(menu) {
    return (dispatch, getState) => {
        dispatch(setMenu(menu))
        dispatch(setIsMenuVisible(true))
    }
}

export function hideMenu() {
    return setIsMenuVisible(false)
}

export function showGenderMenu(id) {
    return (dispatch, getState) => {
        const {passengers} = getState()

        const passenger = passengers.find(passenger => passenger.id === id)
        if (!passenger) {
            return
        }
        dispatch(showMenu({
            options: [
                {
                    title: '男',
                    value: 'male',
                    active: 'male' === passenger.gender
                },
                {
                    title: '女',
                    value: 'female',
                    active: 'female' === passenger.gender
                },
            ],
            onPress(gender) {
                dispatch(updatePassenger(id, {gender}))
                dispatch(hideMenu())
            }
        }))
    }
}

export function showFollowAdultMenu(id) {
    return (dispatch, getState) => {
        const {passengers} = getState()
        const passenger = passengers.find(passenger => passenger.id === id)
        if (!passenger) {
            return
        }
        dispatch(showMenu({
            options: passengers
                .filter(passenger => passenger.ticketType === 'adult')
                .map(adult => {
                    return {
                        title: adult.name,
                        value: adult.id,
                        active: adult.id === passenger.followAdult
                    }
                }),
            onPress(followAdult) {
                dispatch(updatePassenger(id, {followAdult}))
                dispatch(hideMenu())
            }
        }))
    }
}

export function showTicketTypeMenu(id) {
    return (dispatch, getState) => {
        const {passengers} = getState()
        const passenger = passengers.find(passenger => passenger.id === id)
        if (!passenger) {
            return
        }

        dispatch(showMenu({
            options: [
                {
                    title: '成人票',
                    value: 'adult',
                    active: 'adult' === passenger.ticketType
                },
                {
                    title: '儿童票',
                    value: 'child',
                    active: 'child' === passenger.ticketType
                },
            ],
            onPress(ticketType) {
                if (ticketType === 'adult') {
                    dispatch(updatePassenger(id, {
                        ticketType,
                        licenceNo: ''
                    }, ['gender', 'followAdult', 'birthday']))
                    dispatch(hideMenu())
                } else {
                    const adult = passengers.find(passenger => passenger.id !== id && passenger.ticketType === 'adult')
                    if (adult) {
                        dispatch(updatePassenger(id, {
                            ticketType,
                            gender: '',
                            followAdult: adult.id,
                            birthday: '',
                        }, ['licenceNo']))
                    } else {
                        alert('没有其他成人乘客')
                    }
                }
                dispatch(hideMenu())
            }
        }))
    }
}
