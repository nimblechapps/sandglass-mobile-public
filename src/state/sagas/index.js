import { takeEvery, all } from 'redux-saga/effects';
import * as AuthTypes from '../ducks/auth/types';
import * as SessionTypes from '../ducks/sessionType/types'
import * as CraftTypes from '../ducks/craft/types'
import * as TripTypes from '../ducks/trip/types'

import { signUp, signInSocial, updateSubscription, updateOnboarding, updateProfile, resendEmailVerificationCode, verifyEmailVerificationCode, forgotPassword, createPortfolio, logIn, getPreference } from './auth';
import { addSessionType, deleteSessionType, editSessionType, getSessionTypes } from './session';
import { addCraft, deleteCraft, editCraft, getCraftList, getCraftTypes } from './craft';
import { completeTrip, deleteTrip, getTrip, saveCompleteTrip, saveTrip } from './trip';


export default function* rootSaga() {
    yield all([
        // Auth
        yield takeEvery(AuthTypes.LOG_IN, logIn),
        yield takeEvery(AuthTypes.SIGN_UP, signUp),
        yield takeEvery(AuthTypes.FORGOT_PASSWORD, forgotPassword),
        yield takeEvery(AuthTypes.SIGN_IN_SOCIAL, signInSocial),
        yield takeEvery(AuthTypes.UPDATE_SUBSCRIPTION, updateSubscription),
        yield takeEvery(AuthTypes.PREFERENCE, getPreference),

        //Session Types
        yield takeEvery(SessionTypes.GET_SESSION_TYPE, getSessionTypes),
        yield takeEvery(SessionTypes.ADD_SESSION_TYPE, addSessionType),
        yield takeEvery(SessionTypes.EDIT_SESSION_TYPE, editSessionType),
        yield takeEvery(SessionTypes.DELETE_SESSION_TYPE, deleteSessionType),

        //Craft
        yield takeEvery(CraftTypes.GET_CRAFT_LIST, getCraftList),
        yield takeEvery(CraftTypes.ADD_CRAFT, addCraft),
        yield takeEvery(CraftTypes.GET_CRAFT_TYPES, getCraftTypes),
        yield takeEvery(CraftTypes.EDIT_CRAFT, editCraft),
        yield takeEvery(CraftTypes.DELETE_CRAFT, deleteCraft),

        //Trip
        yield takeEvery(TripTypes.SAVE_TRIP, saveTrip),
        yield takeEvery(TripTypes.COMPLETE_TRIP, completeTrip),
        yield takeEvery(TripTypes.GET_TRIP, getTrip),
        yield takeEvery(TripTypes.SAVE_COMPLETED_TRIP, saveCompleteTrip),
        yield takeEvery(TripTypes.DELETE_TRIP, deleteTrip),

        // yield takeEvery(AuthTypes.UPDATE_ONBOARDING, updateOnboarding),
        // yield takeEvery(AuthTypes.UPDATE_PROFILE, updateProfile),
        // yield takeEvery(AuthTypes.RESEND_EMAIL_VERIFICATION_CODE, resendEmailVerificationCode),
        // yield takeEvery(AuthTypes.VERIFY_EMAIL_VERIFICATION_CODE, verifyEmailVerificationCode),
        // yield takeEvery(AuthTypes.CREATE_PORTFOLIO, createPortfolio),
    ]);
}