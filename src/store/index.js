import {createStore, applyMiddleware, compose} from 'redux'
import reducer from '../reducers'

const createStoreWithMiddleware = compose(
  applyMiddleware()
)(createStore)

export default function (initialState) {
  const store = createStoreWithMiddleware(reducer, initialState)
  return store
}
