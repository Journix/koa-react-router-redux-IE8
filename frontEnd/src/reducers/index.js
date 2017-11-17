/**
 * reducers里的方法一般需要满足 functional program的要素，仅作数据的中间处理
 * index as reducers的集散中心
 */
// import { combineReducers } from 'redux'
import sort from './sort'
import price from './price'

const rootReducer = {
  sort,
  price
}

export default rootReducer
