import { call, put } from "redux-saga/effects";
import { performPostRequest, performGetRequest, performPutRequest, performDeleteRequest } from "../axiosUtils";
import Urls from "../Urls";
import _ from 'lodash';
import { CommonAction } from '../ducks/common';
import { CraftAction } from "../ducks/craft";

function getParams(params) {
    return Object.entries(Object.assign({}, params)).
        map(([key, value]) => `${key}=${value}`).join('&')
}

export function* getCraftList(action) {
    try {
        yield put(CommonAction.startLoading())
        let endUrl = Urls.GET_CRAFT;
        let response = yield call(performGetRequest, endUrl);
        const { status } = response;
        if (_.inRange(status, 200, 299)) {
            yield put(CraftAction.setCraft(response.payload))
        }
        yield put(CommonAction.stopLoading());
        action.success(response);
    } catch (error) {
        console.log(error);
        const message = error.response ? error.response && error.response.data && error.response.data.message : "Network Error or Server down, Please try again later."
        const toastData = { success: false, message: message };
        yield put(CommonAction.showToast(toastData));
        yield put(CommonAction.stopLoading());
        action.failure(error)
    }
}

export function* getCraftTypes(action) {
    try {
        yield put(CommonAction.startLoading())
        let endUrl = Urls.GET_CRAFT_TYPE;
        let response = yield call(performGetRequest, endUrl);

        const { status } = response;
        // if (_.inRange(status, 200, 299)) {
        //     yield put(CraftAction.setCraftTypes(response.payload))
        // }
        yield put(CommonAction.stopLoading());
        action.success(response);
    } catch (error) {
        console.log(error);
        const message = error.response ? error.response && error.response.data && error.response.data.message : "Network Error or Server down, Please try again later."
        const toastData = { success: false, message: message };
        yield put(CommonAction.showToast(toastData));
        yield put(CommonAction.stopLoading());
        action.failure(error)
    }
}

export function* addCraft(action) {
    try {
        yield put(CommonAction.startLoading())
        let endUrl = Urls.ADD_CRAFT;
        let response = yield call(performPostRequest, endUrl, action.payload);
        const { status } = response;
        if (_.inRange(status, 200, 299)) {
            const message = response.message;
            const toastData = { success: true, message: message };
            yield put(CommonAction.showToast(toastData));
        }
        yield put(CommonAction.stopLoading());
        action.success(response);
    } catch (error) {
        console.log(error);
        const message = error.response ? error.response && error.response.data && error.response.data.message : "Network Error or Server down, Please try again later."
        const toastData = { success: false, message: message };
        yield put(CommonAction.showToast(toastData));
        yield put(CommonAction.stopLoading());
        action.failure(error)
    }
}

export function* editCraft(action) {
    try {
        yield put(CommonAction.startLoading())
        const params = {
            craftId: action.payload.craftId
        }
        let endUrl = Urls.EDIT_CRAFT + '?' + getParams(params);
        const body = {
            type: action.payload.type,
            brand: action.payload.brand,
            model: action.payload.model
        }

        let response = yield call(performPutRequest, endUrl, body);
        const { status } = response;
        if (_.inRange(status, 200, 299)) {
            const message = response.message;
            const toastData = { success: true, message: message };
            yield put(CommonAction.showToast(toastData));
        }
        yield put(CommonAction.stopLoading());
        action.success(response);
    } catch (error) {
        console.log(error);
        const message = error.response ? error.response && error.response.data && error.response.data.message : "Network Error or Server down, Please try again later."
        const toastData = { success: false, message: message };
        yield put(CommonAction.showToast(toastData));
        yield put(CommonAction.stopLoading());
        action.failure(error)
    }
}

export function* deleteCraft(action) {
    try {
        yield put(CommonAction.startLoading())
        let endUrl = Urls.DELETE_CRAFT + '?' + getParams(action.payload);
        let response = yield call(performDeleteRequest, endUrl);
        const { status } = response;
        if (_.inRange(status, 200, 299)) {
            const message = response.message;
            const toastData = { success: true, message: message };
            yield put(CommonAction.showToast(toastData));
        }
        yield put(CommonAction.stopLoading());
        action.success(response);
    } catch (error) {
        console.log(error);
        const message = error.response ? error.response && error.response.data && error.response.data.message : "Network Error or Server down, Please try again later."
        const toastData = { success: false, message: message };
        yield put(CommonAction.showToast(toastData));
        yield put(CommonAction.stopLoading());
        action.failure(error)
    }
}