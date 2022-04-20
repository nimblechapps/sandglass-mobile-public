import _ from 'lodash';

import * as types from './types';

const initialState = {
    isLoading: false,
    visible: false,
    success: true,
    message: null,
    isSwitchProfile: false,
    isBackButtonClick: false,
    isFromSignOut: false,
    showLoginMessage: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.START_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case types.STOP_LOADING:
            return {
                ...state,
                isLoading: false
            }
        case types.SHOW_TOAST:
            return {
                ...state,
                visible: true,
                success: _.get(action, 'payload.success', true),
                message: _.get(action, 'payload.message', null),
            }
        case types.HIDE_TOAST:
            return {
                ...state,
                visible: false,
                message: null,
            }
        case types.SWITCH_PROFILE:
            return {
                ...state,
                isSwitchProfile: _.get(action, 'payload', false),
            }
        case types.IS_BACK_BUTTON_CLICK:
            return {
                ...state,
                isBackButtonClick: _.get(action, 'payload', false),
            }
        case types.IS_FROM_SIGNOUT:
            console.log('isFromSignOut ==== ', action.payload);
            return {
                ...state,
                isFromSignOut: action.payload,
            }
        case types.SHOW_LOGIN_MESSAGE:
            return {
                ...state,
                showLoginMessage: action.payload,
            }
        default:
            return state;
    }
}

export default reducer;