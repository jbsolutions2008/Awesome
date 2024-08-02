import Module from '../module';
import utils from '../utils';
import { TOAST_TYPES } from './enum';
import Toast from "react-native-toast-message";
import * as RootNavigation from './RootNavigation'

const GetApiCall = async (
    url: string,
    header: any,
    showLoader = true,
    showResponseError = true,
    showNoInternetMessage = true,
    manageApiResponse = true,
) => {

    // Show the loader if required
    if (showLoader) {
        Module.CustomLoader.isShowLoader(true);
    }

    // Make the GET request
    const rawResponse = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...header,
        },
    }).then(r => r.json())
        .catch(exc => {
            if (showNoInternetMessage) {
                // Handle no internet message here (if needed)
            }
            if (showLoader)
                Module.CustomLoader.isShowLoader(false);

            return null;
        });

    // Hide the loader after the request
    if (showLoader)
        Module.CustomLoader.isShowLoader(false);

    // Manage API response based on provided flags
    if (!manageApiResponse) {
        return null;
    } else if (rawResponse === null) {
        return null;
    } else if (rawResponse.code === undefined) {
        return rawResponse;
    } else if (
        rawResponse.code === 200 ||
        rawResponse.code === 201
    ) {
        return rawResponse;
    } else if (rawResponse.code === 401 ||
        rawResponse.code === 402 ||
        rawResponse.code === 403 ||
        rawResponse.code === 404) {
        utils.MethodUtils.clearData(RootNavigation.navigationRef);
        Toast.show({
            type: 'customToast',
            props: {
                type: TOAST_TYPES.success,
                message: 'Session expired, please sign in again.'
            }
        });
    } else {
        if (showResponseError)
            return null;
    }
};

const PostApiCall = async (
    url: string,
    payLoad: any,
    header: any,
    showLoader = true,
    showAlert = true,
    showNoInternetMessage = true,
    manageApiResponse = true,
) => {

    // Show the loader if required
    if (showLoader) {
        Module.CustomLoader.isShowLoader(true);
    }

    // Make the POST request
    const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'request_from': 'phone_app',
            ...header,
        },
        body: payLoad,
    }).then(r => r.json())
        .catch(exc => {
            if (showNoInternetMessage) {

            }
            if (showLoader)
                Module.CustomLoader.isShowLoader(false);
            return null;
        });

    // Hide the loader after the request
    if (showLoader)
        Module.CustomLoader.isShowLoader(false);

    // Manage API response based on provided flags
    if (!manageApiResponse) {
        return null;
    } else if (rawResponse === null) {
        return null;
    } else if (rawResponse.code === undefined) {
        return rawResponse;
    } else if (rawResponse.code === 200) {
        return rawResponse;
    } else if (rawResponse.code === 401 ||
        rawResponse.code === 402 ||
        rawResponse.code === 403 ||
        rawResponse.code === 404) {
        utils.MethodUtils.clearData(RootNavigation.navigationRef);
        Toast.show({
            type: 'customToast',
            props: {
                type: TOAST_TYPES.success,
                message: 'Session expired, please sign in again.'
            }
        });
    } else {
        if (showAlert) {
            utils.UserSession.ALERT_MESSAGE_DATA.title = "Error"
            if (rawResponse.message) {
                utils.UserSession.ALERT_MESSAGE_DATA.message = rawResponse.message
            } else {
                utils.UserSession.ALERT_MESSAGE_DATA.message = 'Something went wrong, Please try again.'
            }
            return null;
        } else {
            return rawResponse;
        }

    }
};

export default {
    GetApiCall,
    PostApiCall
};