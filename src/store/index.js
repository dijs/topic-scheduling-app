import {createStore, applyMiddleware, compose} from 'redux'
import reducer from '../reducers'

const createStoreWithMiddleware = compose(
  applyMiddleware(),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

export default function (initialState) {
  const store = createStoreWithMiddleware(reducer, initialState)
  return store
}
