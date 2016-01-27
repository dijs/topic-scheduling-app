import React from 'react'
import {render} from 'react-dom'
import App from './containers/app'
import {Provider} from 'react-redux'
import configureStore from './store'

const store = configureStore()

render(
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>,
  document.getElementById('root')
)
