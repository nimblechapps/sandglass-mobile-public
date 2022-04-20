import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios";
import { useSelector } from "react-redux";
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { Globals } from "../utils/globals";

import { getAxiosInstance, getAxiosInstanceFileUpload, getAxiosInstanceFileUploadCloudinary, getAxiosInstanceGoogle, getAxiosInstanceMangopay } from "./axiosWrapper";
import Urls from "./Urls";
import store from './store';
import { AuthAction } from "./ducks/auth";
import _ from 'lodash';

const refreshAuthLogic = failedRequest =>
    axios.post(Urls.BASE_URL + Urls.REFRESH_TOKEN, {
        "refreshToken": getRefreshToken()
    }).then(async (tokenRefreshResponse) => {
        const kRefreshToken = tokenRefreshResponse.data.payload.tokens.refresh.token
        const kAccessToken = tokenRefreshResponse.data.payload.tokens.access.token

        await AsyncStorage.setItem("userToken", kAccessToken)
        await AsyncStorage.setItem("refreshToken", kRefreshToken)

        let tokens = {
            access: {
                token: kAccessToken,
            },
            refresh: {
                token: kRefreshToken,
            }
        }
        store.dispatch(AuthAction.setTokenData(tokens))
        failedRequest.response.config.headers['Authorization'] = kAccessToken;
        return Promise.resolve();
    });

const getAccessToken = () => {
    const data = store.getState();
    const accessToken = _.get(data, 'auth.userToken', '')
    return accessToken;
}
const getRefreshToken = () => {
    const data = store.getState();
    const refreshToken = _.get(data, 'auth.refreshToken', '')
    return refreshToken;
}

export const performGetRequest = (endPoint) => {
    const token = getAccessToken();
    const instance = getAxiosInstance(token);
    createAuthRefreshInterceptor(instance, refreshAuthLogic);

    return instance.get(endPoint)
        .then(response => response.data)
        .catch(e => {
            throw e;
        })
}

export const performPostRequest = (endPoint, data) => {
    const token = getAccessToken();
    const instance = getAxiosInstance(token);
    createAuthRefreshInterceptor(instance, refreshAuthLogic);

    return instance.post(endPoint, data)
        .then(response => response.data)
        .catch(e => {
            throw e;
        });
}

export const performPutRequest = (endPoint, data) => {
    const token = getAccessToken();
    const instance = getAxiosInstance(token);
    createAuthRefreshInterceptor(instance, refreshAuthLogic);

    return instance.put(endPoint, data)
        .then(response => response.data)
        .catch(e => {
            throw e;
        });
}

export const performDeleteRequest = (endPoint, data) => {
    const token = getAccessToken();
    const instance = getAxiosInstance(token);
    createAuthRefreshInterceptor(instance, refreshAuthLogic);

    return instance.delete(endPoint, data)
        .then(response => response.data)
        .catch(e => {
            throw e;
        });
}

export const performPostRequestWithFile = (endPoint, data) => {
    let token = getAccessToken();
    let instance = getAxiosInstanceFileUpload(token);
    createAuthRefreshInterceptor(instance, refreshAuthLogic);

    return instance.post(endPoint, data)
        .then(response => response.data)
        .catch(e => {
            throw e;
        });
}

export const performPutRequestWithFile = (endPoint, data) => {
    const token = getAccessToken();
    const instance = getAxiosInstanceFileUpload(token);
    createAuthRefreshInterceptor(instance, refreshAuthLogic);

    return instance.put(endPoint, data)
        .then(response => response.data)
        .catch(e => {
            throw e;
        });
}

export const performPostRequestWithFileCloudinary = (endPoint, data) => {
    let token = getAccessToken();
    let instance = getAxiosInstanceFileUploadCloudinary(token);
    createAuthRefreshInterceptor(instance, refreshAuthLogic);

    return instance.post(endPoint, data)
        .then(response => response.data)
        .catch(e => {
            throw e;
        });
}

export const performGetRequestGoogle = (endPoint) => {
    const instance = getAxiosInstanceGoogle();

    return instance.get(endPoint)
        .then(response => response.data)
        .catch(e => {
            throw e;
        });
}