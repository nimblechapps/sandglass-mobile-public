import * as types from './types';

export const startLoading = () => {
    return {
        type: types.START_LOADING,
    }
}

export const stopLoading = () => {
    return {
        type: types.STOP_LOADING
    }
}

export const showToast = (data) => {
    return {
        type: types.SHOW_TOAST,
        payload: data
    }
}

export const hideToast = () => {
    return {
        type: types.HIDE_TOAST
    }
}

export const switchProfile = (data) => {
    return {
        type: types.SWITCH_PROFILE,
        payload: data
    }
}

export const setIsBackButtonClick = (data) => {
    return {
        type: types.IS_BACK_BUTTON_CLICK,
        payload: data
    }
}

export const setIsFromSignOut = (data) => {
    console.log('IS_FROM_SIGNOUT', data);
    return {
        type: types.IS_FROM_SIGNOUT,
        payload: data
    }
}
export const setShowLoginMessage = (data) => {
    return {
        type: types.SHOW_LOGIN_MESSAGE,
        payload: data
    }
}