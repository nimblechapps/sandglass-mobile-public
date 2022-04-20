import * as types from './types';
import _ from 'lodash';

const initialState = {
    isLogin: false,
    isSubscribed: false,
    userToken: null,
    refreshToken: null,
    userData: null,
    loginMessage: null,
    isDeviceBooked: false,
    isFromSignOut: false,
    deviceData: {},
    isLiveView: true,
    delayStart: '3s',
    timeTrial: 'Off',
    isTimeTrial: false

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SIGN_IN_SUCCESS:
            return {
                ...state,
                isLogin: action.payload,
            }
        case types.SUBSCRIBED:
            return {
                ...state,
                isSubscribed: action.payload,
            }
        case types.SIGN_OUT:
            return {
                ...state,
                isLogin: false,
                userToken: null,
                refreshToken: null,
                userData: null,
                isDeviceBooked: false,
                deviceData: {},
                isSubscribed: false,
            }
        case types.SET_TOKEN_DATA:
            return {
                ...state,
                userToken: _.get(action, 'payload.access.token', null),
                refreshToken: _.get(action, 'payload.refresh.token', null),
            }
        case types.SET_USER_DATA:
            return {
                ...state,
                userData: _.get(action, 'payload')
            }
        case types.SAVE_LOGIN_MESSAGE:
            return {
                ...state,
                loginMessage: _.get(action, 'payload')
            }
        case types.IS_LIVE_VIEW:
            return {
                ...state,
                isLiveView: _.get(action, 'payload')
            }
        case types.DELAY_START:
            return {
                ...state,
                delayStart: _.get(action, 'payload')
            }
        case types.TIME_TRIAL:
            return {
                ...state,
                timeTrial: _.get(action, 'payload')
            }
        case types.IS_TIME_TRIAL:
            return {
                ...state,
                isTimeTrial: _.get(action, 'payload')
            }
        case types.FORGOT_PASSWORD:
            return {
                ...state,
            }
        case types.RESET_PASSWORD:
            return {
                ...state,
            }
        case types.IS_DEVICE_SELECTED:
            return {
                ...state,
                isDeviceBooked: action.payload.isSelected,
                deviceData: action.payload.deviceData,
            }
        default:
            return state;
    }
}

export default reducer;