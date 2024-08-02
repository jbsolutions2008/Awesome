import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import config from "../config";

// manage lunch API data
const manageAppLaunchData = (navigation: any) => {

    AsyncStorage.getItem(config.Constants.AsyncStorageKeys.isLogin).then(data => {

        if (data) {
            if (JSON.parse(data)) {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'BottomTabBar' }],
                    }),
                );
            }
        }
    });
}

// clear all storage data after logout
const clearData = (navigation: any) => {
    AsyncStorage.setItem(config.Constants.AsyncStorageKeys.isLogin, JSON.stringify(false));
    AsyncStorage.setItem(config.Constants.AsyncStorageKeys.userData, '');
    AsyncStorage.setItem(config.Constants.AsyncStorageKeys.phoneNumber, '');
    AsyncStorage.setItem(config.Constants.AsyncStorageKeys.firstName, '');
    AsyncStorage.setItem(config.Constants.AsyncStorageKeys.lastName, '');
    AsyncStorage.setItem(config.Constants.AsyncStorageKeys.email, '');
    AsyncStorage.setItem(config.Constants.AsyncStorageKeys.phonesNumber, '');
    AsyncStorage.setItem(config.Constants.AsyncStorageKeys.googleLogin, '');
    AsyncStorage.setItem(config.Constants.AsyncStorageKeys.phoneLogin, '');
    AsyncStorage.setItem(config.Constants.AsyncStorageKeys.stackTheme, JSON.stringify(false));


    navigation.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [{ name: 'SignInScreen' }],
        }),
    );
}

// Exporting an object with the manageAppLaunchData and clearData function
export default {
    manageAppLaunchData,
    clearData
}