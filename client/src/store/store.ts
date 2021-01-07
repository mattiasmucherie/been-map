import { createStore } from 'redux'
import { colorReducer } from './reducer'

// @ts-ignore
export default createStore(colorReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
