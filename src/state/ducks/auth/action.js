import * as types from './types';

export const logIn = (data, success, failure) => {
    return {
        type: types.LOG_IN,
        payload: data,
        success: (response) => success(response),
        failure: (response) => failure(response)
    }
}
export const signInSocial = (data, success, failure) => {
    return {
        type: types.SIGN_IN_SOCIAL,
        payload: data,
        success: (response) => success(response),
        failure: (response) => failure(response)
    }
}
export const signUp = (data, success, failure) => {
    return {
        type: types.SIGN_UP,
        payload: data,
        success: (response) => success(response),
        failure: (response) => failure(response)
    }
}
export const updateSubscription = (data, success, failure) => {
    return {
        type: types.UPDATE_SUBSCRIPTION,
        payload: data,
        success: (response) => success(response),
        failure: (response) => failure(response)
    }
}
export const signUpSuccess = (data) => {
    return {
        type: types.SIGN_UP_SUCCESS,
        payload: data
    }
}

export const signInSuccess = (data) => {
    return {
        type: types.SIGN_IN_SUCCESS,
        payload: data
    }
}
export const isSubscribed = (data) => {
    return {
        type: types.SUBSCRIBED,
        payload: data
    }
}

export const signOut = () => {
    return {
        type: types.SIGN_OUT,
    }
}



export const setTokenData = (data) => {
    return {
        type: types.SET_TOKEN_DATA,
        payload: data,
    }
}

export const setUserData = (data) => {
    return {
        type: types.SET_USER_DATA,
        payload: data
    }
}

export const saveLoginMessage = (data) => {
    console.log('Login message: ', data);
    return {
        type: types.SAVE_LOGIN_MESSAGE,
        payload: data
    }
}
export const isLiveView = (data) => {
    return {
        type: types.IS_LIVE_VIEW,
        payload: data
    }
}
export const delayStart = (data) => {
    return {
        type: types.DELAY_START,
        payload: data
    }
}
export const timeTrial = (data) => {
    return {
        type: types.TIME_TRIAL,
        payload: data
    }
}
export const isTimeTrial = (data) => {
    return {
        type: types.IS_TIME_TRIAL,
        payload: data
    }
}
export const forgotPassowrd = (data, success, failure) => {
    return {
        type: types.FORGOT_PASSWORD,
        payload: data,
        success: (response) => success(response),
        failure: (response) => failure(response)
    }
}

export const resetPassword = (data, token, success, failure) => {
    return {
        type: types.RESET_PASSWORD,
        payload: data,
        token: token,
        success: (response) => success(response),
        failure: (response) => failure(response)
    }
}

export const getPreference = (data, success, failure) => {
    return {
        type: types.PREFERENCE,
        payload: data,
        success: (response) => success(response),
        failure: (response) => failure(response)
    }
}


export const deviceSelectedDetails = (data) => {
    return {
        type: types.IS_DEVICE_SELECTED,
        payload: data
    }
} 