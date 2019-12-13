import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import 'normalize.css/normalize.css'
import * as serviceWorker from '../serviceWorker.js'

import store from './store/index.js'
import '../common/css/reset.css'
import App from './App.jsx'

ReactDom.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('root')
)

if (process.env.NODE_ENV === 'production') {
    serviceWorker.register()
} else {
    serviceWorker.unregister()
}
