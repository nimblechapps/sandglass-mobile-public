const Urls = {
    BASE_URL: `http://192.168.1.209:4400/v1/`,
    // BASE_URL: 'https://sandglassapp-api.herokuapp.com/v1/',

    //AUTH------>
    SIGN_UP: 'auth/signup',
    LOG_IN: 'auth/login',
    USER_VERIFY: 'auth/user-verify/',
    CHANGE_PASSWORD: 'auth/changepassword',
    REFRESH_TOKEN: 'auth/refreshtokens',
    FORGOT_PASSWORD: 'auth/forgotpassword',
    RESET_PASSWORD: 'auth/resetpassword',
    SOCIAL_SIGNIN: 'auth/social-signin',
    UPDATE_SUBSCRIPTION: 'auth/updatesubscription',
    PREFERENCE: 'auth/preference',

    //Craft
    ADD_CRAFT: 'craft/addcraft',
    GET_CRAFT: 'craft/getcraft',
    GET_CRAFT_TYPE: 'craft/getcrafttype',
    EDIT_CRAFT: 'craft/editcraft',
    DELETE_CRAFT: 'craft/deletecraft',

    //Session
    ADD_SESSION_TYPE: 'session/addsessiontype',
    GET_SESSION_TYPE: 'session/getsessiontype',
    EDIT_SESSION_TYPE: 'session/editsessiontype',
    DELETE_SESSION_TYPE: 'session/deletesessiontype',

    //Trip
    SAVE_TRIP: 'trip/savetripdata',
    COMPLETE_TRIP: 'trip/completetrip',
    GET_TRIP: 'trip/gettripdata',
    SAVE_COMPLETED_TRIP: 'trip/savecompletedtrip',
    DELETE_TRIP: 'trip/deletetrip'
}

export default Urls;