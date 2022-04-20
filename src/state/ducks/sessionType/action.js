import * as types from './types';

export const addSessionType = (data, success, failure) => {
    console.log('addSessionType: ', data);
    return {
        type: types.ADD_SESSION_TYPE,
        payload: data,
        success: (response) => success(response),
        failure: (response) => failure(response)
    }
}

export const getSessionType = (success, failure) => {
    return {
        type: types.GET_SESSION_TYPE,
        success: (response) => success(response),
        failure: (response) => failure(response)
    }
}

export const editSessionType = (data, success, failure) => {
    console.log('editSessionType: ', data);
    return {
        type: types.EDIT_SESSION_TYPE,
        payload: data,
        success: (response) => success(response),
        failure: (response) => failure(response)
    }
}

export const deleteSessionType = (data, success, failure) => {
    return {
        type: types.DELETE_SESSION_TYPE,
        payload: data,
        success: (response) => success(response),
        failure: (response) => failure(response)
    }
}
export const setSessionTypes = (data) => {
    return {
        type: types.SET_SESSION_TYPE,
        payload: data
    }
}