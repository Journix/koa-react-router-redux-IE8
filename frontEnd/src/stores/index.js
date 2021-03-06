 import { routerReducer, routerMiddleware } from 'react-router-redux';  //ConnectedRouter as Router,
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
require('core-js/fn/object/assign');

import { Router, Route, Link, hashHistory, browserHistory} from 'react-router';

import { composeWithDevTools } from 'redux-devtools-extension';
// import createLogger from 'redux-logger'

import rootReducers from '../reducers';

const reducers = combineReducers(Object.assign(rootReducers, { router: routerReducer })) ;
//window.STATE_FROM_SERVER接收服务端初始状态
// export default createStore(reducer, window.STATE_FROM_SERVER) //不使用中间件的情况

const middleware = [ thunk, routerMiddleware(browserHistory) ]
if (process.env.NODE_ENV !== 'production') {
//   middleware.push(createLogger({collapsed:true}))
}

export default createStore(
  reducers,
  composeWithDevTools( applyMiddleware(...middleware) )
)
