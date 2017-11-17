require('core-js/fn/object/assign');
import { RECEIVE_MATRIX } from '../constants/ActionTypes'

export default function filters(state={}, action) {
    switch (action.type) {
        case RECEIVE_MATRIX:
            return Object.assign({}, state, action.lowest)

        default:
            return state
    }
}