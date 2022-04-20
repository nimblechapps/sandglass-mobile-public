import { RectButton } from 'react-native-gesture-handler';
import * as types from './types';

export const getCraftListAction = (success, failure) => {
    return {
        type: types.GET_CRAFT_LIST,
        success: (response) => success(response),
        failure: (response) => failure(response)
    }
}

export const getCraftTypes = (success, failure) => {
    return {
        type: types.GET_CRAFT_TYPES,
        success: (response) => success(response),
        failure: (response) => failure(response)
    }
}

export const addCraft = (data, success, failure) => {
    return {
        type: types.ADD_CRAFT,
        payload: data,
        success: (response) => success(response),
        failure: (response) => failure(response)
    }
}

export const editCraft = (data, success, failure) => {
    return {
        type: types.EDIT_CRAFT,
        payload: data,
        success: (response) => success(response),
        failure: (response) => failure(response)
    }
}

export const deleteCraft = (data, success, failure) => {
    return {
        type: types.DELETE_CRAFT,
        payload: data,
        success: (response) => success(response),
        failure: (response) => failure(response)
    }
}

export const setCraft = (data) => {
    return {
        type: types.SET_CRAFT_LIST,
        payload: data
    }
}