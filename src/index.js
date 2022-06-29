import 'react-app-polyfill/ie11' // For IE 11 support
import 'react-app-polyfill/stable'
import 'core-js'
import './polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { icons } from './assets/icons'

import { Provider } from 'react-redux'
// import store from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'

Sentry.init({
  dsn: 'https://9a72d0bab1eb4ef7aad763a77dacd7d8@o1302227.ingest.sentry.io/6539318',
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
})

React.icons = icons

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
