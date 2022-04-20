import { call, put } from "redux-saga/effects";
import { performPostRequest, performGetRequest, performDeleteRequest, performPutRequest } from "../axiosUtils";
import Urls from "../Urls";
import _ from 'lodash';
import { CommonAction } from '../ducks/common';
import { SessionAction } from '../ducks/sessionType'

function getParams(params) {
    return Object.entries(Object.assign({}, params)).
        map(([key, value]) => `${key}=${value}`).join('&')
}

export function* getSessionTypes(action) {
    try {
        yield put(CommonAction.startLoading())
        let endUrl = Urls.GET_SESSION_TYPE;
        let response = yield call(performGetRequest, endUrl);
        console.log("---response---", response);
        const { status } = response;
        if (_.inRange(status, 200, 299)) {
            yield put(SessionAction.setSessionTypes(response.payload))
        }
        yield put(CommonAction.stopLoading());
        action.success(response);
    } catch (error) {
        console.log(error);
        yield put(CommonAction.stopLoading());
        action.failure(error)
    }
}

export function* addSessionType(action) {
    try {
        yield put(CommonAction.startLoading())
        let endUrl = Urls.ADD_SESSION_TYPE;
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

export function* editSessionType(action) {
    try {
        yield put(CommonAction.startLoading())
        const params = {
            sessionTypeId: action.payload.sessionTypeId
        }
        let endUrl = Urls.EDIT_SESSION_TYPE + '?' + getParams(params);
        const body = {
            sessionType: action.payload.sessionType
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

export function* deleteSessionType(action) {
    try {
        yield put(CommonAction.startLoading())
        let endUrl = Urls.DELETE_SESSION_TYPE + '?' + getParams(action.payload);
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