import * as types from './types';

export const saveTrip = (data, success, failure) => {
    return {
        type: types.SAVE_TRIP,
        payload: data,
        success: (response) => success(response),
        failure: (response) => failure(response)
    }
}

export const completeTrip = (data, success, failure) => {
    return {
        type: types.COMPLETE_TRIP,
        payload: data,
        success: (response) => success(response),
        failure: (response) => failure(response)
    }
}

export const getTrip = (data, success, failure) => {
    return {
        type: types.GET_TRIP,
        payload: data,
        success: (response) => success(response),
        failure: (response) => failure(response)
    }
}

export const deleteTrip = (data, success, failure) => {
    return {
        type: types.DELETE_TRIP,
        payload: data,
        success: (response) => success(response),
        failure: (response) => failure(response)
    }
}

export const saveCompleteTrip = (data, success, failure) => {
    return {
        type: types.SAVE_COMPLETED_TRIP,
        payload: data,
        success: (response) => success(response),
        failure: (response) => failure(response)
    }
}

export const setTripData = (data) => {
    return {
        type: types.TRIP_DATA,
        payload: data
    }
}
export const setTripPath = (data) => {
    return {
        type: types.TRIP_PATH,
        payload: data
    }
}