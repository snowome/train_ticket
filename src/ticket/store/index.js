import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'         // 用来支持异步action
import reducers from './reducers.js'
import state from './state.js'

export default createStore(
    combineReducers(reducers),
    state,
    applyMiddleware(thunk)
)
