import * as types from './types';
import _ from 'lodash';

const initialState = {
    sessionTypes: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_SESSION_TYPE:
            return {
                ...state,
                sessionTypes: action.payload
            }
        default:
            return state;
    }
}
export default reducer;