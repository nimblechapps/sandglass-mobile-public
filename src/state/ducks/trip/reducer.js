import * as types from './types';
import _ from 'lodash';

const initialState = {
    tripDetails: {},
    tripPath: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.TRIP_DATA:
            return {
                ...state,
                tripDetails: action.payload
            }
        case types.TRIP_PATH:
            return {
                ...state,
                tripPath: action.payload
            }
        default:
            return state;
    }
}
export default reducer;