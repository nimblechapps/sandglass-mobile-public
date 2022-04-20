import { call, put } from "redux-saga/effects";
import { performPostRequest, performGetRequest, performDeleteRequest, performPutRequest } from "../axiosUtils";
import Urls from "../Urls";
import _ from 'lodash';
import { CommonAction } from '../ducks/common';
import { TripAction } from '../ducks/trip';

function getParams(params) {
    return Object.entries(Object.assign({}, params)).
        map(([key, value]) => `${key}=${value}`).join('&')
}

export function* saveTrip(action) {
    try {
        yield put(CommonAction.startLoading())
        let endUrl = '';
        if (action.payload.tripId !== '') {
            const params = {
                tripId: action.payload.tripId
            }
            endUrl = Urls.SAVE_TRIP + '?' + getParams(params);
        } else {
            endUrl = Urls.SAVE_TRIP;
        }
        let response = yield call(performPostRequest, endUrl, action.payload.data);
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
export function* completeTrip(action) {
    try {
        yield put(CommonAction.startLoading())
        let endUrl = Urls.COMPLETE_TRIP + '?' + getParams(action.payload.data);
        let response = yield call(performPostRequest, endUrl, action.payload.tripDetails);
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

export function* getTrip(action) {
    try {
        yield put(CommonAction.startLoading())
        let endUrl = Urls.GET_TRIP + '?' + getParams(action.payload.data);;
        let response = yield call(performGetRequest, endUrl);
        console.log("---response---", response);
        const { status } = response;
        if (_.inRange(status, 200, 299)) {
            yield put(TripAction.setTripData(response.payload.tripData))
            yield put(TripAction.setTripPath(response.payload.routesData))
        }
        yield put(CommonAction.stopLoading());
        action.success(response);
    } catch (error) {
        console.log(error);
        yield put(CommonAction.stopLoading());
        action.failure(error)
    }
}

export function* deleteTrip(action) {
    try {
        yield put(CommonAction.startLoading())
        let endUrl = Urls.DELETE_TRIP + '?' + getParams(action.payload.data);;
        let response = yield call(performDeleteRequest, endUrl);
        console.log("---response---", response);
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
        yield put(CommonAction.stopLoading());
        action.failure(error)
    }
}

export function* saveCompleteTrip(action) {
    try {
        yield put(CommonAction.startLoading())
        let endUrl = Urls.SAVE_COMPLETED_TRIP + '?' + getParams(action.payload.data);
        let response = yield call(performPutRequest, endUrl, action.payload.result);
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