import axios from "axios"
import Urls from "./Urls";
import { Globals } from "../utils/globals";

let GOOGLE = {
    GET_ADDRESS_URL: 'https://maps.googleapis.com/maps/api/js'
}

export const getAxiosInstance = (token) => {
    if (token) {
        return axios.create({
            baseURL: Urls.BASE_URL,
            timeout: 60000,
            headers: {
                "Content-Type": "application/json",
                'Authorization': token,
            },
        });
    } else {
        return axios.create({
            baseURL: Urls.BASE_URL,
            timeout: 60000,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}

export const getAxiosInstanceFileUpload = (token) => {
    if (token) {
        return axios.create({
            baseURL: Urls.BASE_URL,
            timeout: 60000,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': token,
            },
        });
    } else {
        return axios.create({
            baseURL: Urls.BASE_URL,
            timeout: 60000,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
}

// export const getAxiosInstanceFileUploadCloudinary = (token) => {
//     if (token) {
//         return axios.create({
//             baseURL: Urls.CLOUDINARY_URL,
//             headers: {
//                 "Content-type": "multipart/form-data",
//                 'Authorization': token
//             }
//         });
//     } else {
//         return axios.create({
//             baseURL: Urls.CLOUDINARY_URL,
//             headers: {
//                 "Content-type": "multipart/form-data",
//             },
//         });
//     }
// }
