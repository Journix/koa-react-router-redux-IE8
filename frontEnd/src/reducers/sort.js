import { SORT_GET, SORT_CHANGE } from '../constants/ActionTypes'
require('core-js/fn/object/assign');

export default function sorts(state, action) {
    switch (action.type) {
        case SORT_CHANGE:
            return Object.assign({}, state, {selected: action.sortParams})
        case SORT_GET:
            return Object.assign({}, state)
        default:
            return state
    }
}
