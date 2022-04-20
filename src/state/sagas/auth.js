import { call, put } from 'redux-saga/effects';

import { CommonAction } from '../ducks/common';
import { performGetRequest, performGetRequestGoogle, performPostRequest, performPostRequestWithFile, performPostRequestWithFileCloudinary, performPutRequest, performPutRequestWithFile } from '../axiosUtils';
import Urls from '../Urls';
import { AuthAction } from '../ducks/auth';
import { Toast } from '../../utils/variable';

function getParams(params) {
  return Object.entries(Object.assign({}, params)).
    map(([key, value]) => `${key}=${value}`).
    join('&');
}

export function* logIn(action) {
  console.log("---action---", action);
  try {
    yield put(CommonAction.startLoading());
    let endUrl = Urls.LOG_IN;
    let response = yield call(performPostRequest, endUrl, action.payload);
    if (response.status == 200) {
      const message = response.message;
      const toastData = { success: true, message: message };
      yield put(AuthAction.setUserData(response.payload.user))
      yield put(AuthAction.setTokenData(response.payload.tokens))
      yield put(AuthAction.signInSuccess(true));
      yield put(CommonAction.showToast(toastData));
    }
    yield put(CommonAction.stopLoading());
    action.success(response);
  } catch (error) {
    const message = error.response ? error.response && error.response.data && error.response.data.message : "Network Error or Server down, Please try again later."
    const toastData = { success: false, message: message };
    yield put(CommonAction.showToast(toastData));
    yield put(CommonAction.stopLoading());
    action.failure(error);
  }
}

export function* signUp(action) {
  console.log("---action---", action);
  try {
    yield put(CommonAction.startLoading());
    let endUrl = Urls.SIGN_UP;
    let response = yield call(performPostRequest, endUrl, action.payload);
    const { status } = response;
    console.log("Response == ", response);
    if (status === 200) {
      yield put(AuthAction.setUserData(response.payload.user))
      yield put(AuthAction.setTokenData(response.payload.tokens))
    }
    const message = response.message;
    const toastData = { success: true, message: message };
    // yield put(AuthAction.signInSuccess(true));
    yield put(CommonAction.showToast(toastData));
    yield put(CommonAction.stopLoading());
    action.success(response)
  } catch (error) {
    console.log("ERROR : ", error);
    const message = error.response ? error.response && error.response.data && error.response.data.message : "Network Error or Server down, Please try again later."
    const toastData = { success: false, message: message };
    yield put(CommonAction.showToast(toastData));
    yield put(CommonAction.stopLoading());
    action.failure(error);
  }
}

export function* signInSocial(action) {
  try {
    yield put(CommonAction.startLoading());
    let endUrl = Urls.SOCIAL_SIGNIN;
    let response = yield call(performPostRequest, endUrl, action.payload);
    if (response.status) {
      const toastData = { type: true, message: response.message };
      yield put(AuthAction.saveLoginMessage(response.message))
      yield put(CommonAction.setShowLoginMessage(true))
      yield put(AuthAction.signInSuccess(true));
      yield put(AuthAction.setTokenData(response.payload.tokens));
      yield put(AuthAction.setUserData(response.payload.user));
      // yield put(CommonAction.showToast(toastData));
    }
    yield put(CommonAction.stopLoading());
    action.success(response);
  } catch (error) {
    const message = error.response ? error.response && error.response.data && error.response.data.message : "Network Error or Server down, Please try again later."
    const toastData = { type: false, message: message };
    yield put(CommonAction.showToast(toastData));
    yield put(CommonAction.stopLoading());
    action.failure(error);
  }
}

export function* updateSubscription(action) {
  try {
    yield put(CommonAction.startLoading());
    let endUrl = Urls.UPDATE_SUBSCRIPTION;
    let response = yield call(performPostRequest, endUrl, action.payload);
    // if (response.status) {
    //   const toastData = { type: true, message: response.message };
    //   yield put(CommonAction.showToast(toastData));
    // }
    yield put(CommonAction.stopLoading());
    yield put(AuthAction.isSubscribed(true));
    action.success(response);
  } catch (error) {
    const message = error.response ? error.response && error.response.data && error.response.data.message : "Network Error or Server down, Please try again later."
    const toastData = { type: false, message: message };
    yield put(CommonAction.showToast(toastData));
    yield put(CommonAction.stopLoading());
    action.failure(error);
  }
}

export function* forgotPassword(action) {
  try {
    yield put(CommonAction.startLoading());
    let endUrl = Urls.FORGOT_PASSWORD;
    let response = yield call(performPostRequest, endUrl, action.payload);
    if (response.status === 200) {
      const toastData = { type: true, message: response.message };
      yield put(CommonAction.showToast(toastData));
    } else if (response.status === 404) {
      const toastData = { type: false, message: response.message };
      yield put(CommonAction.showToast(toastData));
    }
    yield put(CommonAction.stopLoading());
    action.success(response);
  } catch (error) {
    const message = error.response ? error.response && error.response.data && error.response.data.message : "Network Error or Server down, Please try again later."
    const toastData = { type: false, message: message };
    yield put(CommonAction.showToast(toastData));
    yield put(CommonAction.stopLoading());
    action.failure(error);
  }
}

export function* updateOnboarding(action) {
  try {
    yield put(CommonAction.startLoading());
    let endUrl = Urls.UPDATE_ONBOARDING;
    let response = yield call(performPutRequest, endUrl, action.payload);
    if (response.status) {
      yield put(AuthAction.setUserData(response.payload.user));
      // const toastData = { type: Toast.SUCCESS, message: response.message };
      // yield put(CommonAction.showToast(toastData));
    }
    yield put(CommonAction.stopLoading());
    action.success(response);
  } catch (error) {
    const message = error.response ? error.response && error.response.data && error.response.data.message : "Network Error or Server down, Please try again later."
    const toastData = { type: Toast.FAIL, message: message };
    yield put(CommonAction.showToast(toastData));
    yield put(CommonAction.stopLoading());
    action.failure(error);
  }
}
export function* getPreference(action) {
  try {
    yield put(CommonAction.startLoading());
    let endUrl = Urls.PREFERENCE + '?' + getParams(action.payload);
    let response = yield call(performGetRequest, endUrl)
    yield put(CommonAction.stopLoading());
    action.success(response);
  } catch (error) {
    const message = error.response ? error.response && error.response.data && error.response.data.message : "Network Error or Server down, Please try again later."
    const toastData = { success: false, message: message };
    yield put(CommonAction.showToast(toastData));
    yield put(CommonAction.stopLoading());
    action.failure(error);
  }
}
export function* updateProfile(action) {
  try {
    yield put(CommonAction.startLoading());
    let endUrl = Urls.UPDATE_PROFILE;
    let response = yield call(performPostRequestWithFile, endUrl, action.payload);
    if (response.status) {
      yield put(AuthAction.setUserData(response.payload.user));
      // const toastData = { type: Toast.SUCCESS, message: response.message };
      // yield put(CommonAction.showToast(toastData));
    }
    yield put(CommonAction.stopLoading());
    action.success(response);
  } catch (error) {
    const message = error.response ? error.response && error.response.data && error.response.data.message : "Network Error or Server down, Please try again later."
    const toastData = { type: Toast.FAIL, message: message };
    yield put(CommonAction.showToast(toastData));
    yield put(CommonAction.stopLoading());
    action.failure(error);
  }
}

export function* resendEmailVerificationCode(action) {
  try {
    yield put(CommonAction.startLoading());
    const endUrl = Urls.RESEND_EMAIL_VERIFICATION_CODE;
    const params = endUrl + '/?' + getParams(action.payload);
    const response = yield call(performGetRequest, params);
    if (response.status) {
      const toastData = { type: Toast.SUCCESS, message: response.message };
      yield put(CommonAction.showToast(toastData));
    }
    yield put(CommonAction.stopLoading());
    action.success(response);
  } catch (error) {
    const message = error.response ? error.response && error.response.data && error.response.data.message : "Network Error or Server down, Please try again later."
    const toastData = { success: false, message: message };
    yield put(CommonAction.showToast(toastData));
    yield put(CommonAction.stopLoading());
    action.failure(error);
  }
}

export function* verifyEmailVerificationCode(action) {
  try {
    yield put(CommonAction.startLoading());
    let endUrl = Urls.VERIFY_EMAIL_VERIFICATION_CODE;
    let response = yield call(performPostRequest, endUrl, action.payload);
    if (response.status) {
      yield put(AuthAction.setUserData(response.payload.user));
      const toastData = { type: Toast.SUCCESS, message: response.message };
      yield put(CommonAction.showToast(toastData));
    }
    yield put(CommonAction.stopLoading());
    action.success(response);
  } catch (error) {
    const message = error.response ? error.response && error.response.data && error.response.data.message : "Network Error or Server down, Please try again later."
    const toastData = { type: Toast.FAIL, message: message };
    yield put(CommonAction.showToast(toastData));
    yield put(CommonAction.stopLoading());
    action.failure(error);
  }
}



export function* createPortfolio(action) {
  try {
    yield put(CommonAction.startLoading());
    let endUrl = Urls.CREATE_PORTFOLIO;
    let response = yield call(performPostRequestWithFile, endUrl, action.payload);
    if (response.status) {
      yield put(AuthAction.setUserData(response.payload.user));
      // const toastData = { type: Toast.SUCCESS, message: response.message };
      // yield put(CommonAction.showToast(toastData));
    }
    yield put(CommonAction.stopLoading());
    action.success(response);
  } catch (error) {
    const message = error.response ? error.response && error.response.data && error.response.data.message : "Network Error or Server down, Please try again later."
    const toastData = { type: Toast.FAIL, message: message };
    yield put(CommonAction.showToast(toastData));
    yield put(CommonAction.stopLoading());
    action.failure(error);
  }
}
