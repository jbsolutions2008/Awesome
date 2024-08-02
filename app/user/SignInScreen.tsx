import { t } from "i18next";
import React, { useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from 'react-native'
import auth from '@react-native-firebase/auth';
import MaskTextInput from "../components/MaskTextInput";
import SocialLoginButton from "../components/SocialLoginButton";
import SubmitButton from "../components/SubmitButton";
import AppStyles from "../config/app_styles";
import AppColors from "../config/colors";
import images from "../config/images";
import normalize from "../config/normalize";
import Utility from "../config/Utility";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import config from "../config";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AppFonts from "../config/fonts";
import Module from '../module';
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNBootSplash from "react-native-bootsplash";
import utils from "../utils";

type RootStackParamList = {
    SignInScreen: {};
    VerificationScreen: {};
};
type Props = NativeStackScreenProps<RootStackParamList, 'SignInScreen'>; // Props type for navigation and route parameters.

const SignInScreen = ({ navigation }: Props) => {

    const [phoneNumber, setPhoneNumber] = useState<any>();
    const [phoneNumberError, setPhoneNumberError] = useState('');

    React.useEffect(() => {
        setTimeout(() => {
            RNBootSplash.hide(); // Hide splash screen after a delay.
        }, 1300)
        utils.MethodUtils.manageAppLaunchData(navigation)
    }, [])

    // phone number on change function
    const onPhoneNumberTextChange = (str: string) => {
        var newStr = str.slice(4);
        newStr = newStr.replace(')', '');
        newStr = newStr.replace(' ', '');
        newStr = newStr.replace('-', '');
        setPhoneNumber(str)
    }

    // social google login
    const onGoogleLoginPress = async () => {
        GoogleSignin.configure({
            scopes: [], // what API you want to access on behalf of the user, default is email and profile
            webClientId: config.Constants.GOOGLE_SIGNIN_ANDROID, // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            hostedDomain: '', // specifies a hosted domain restriction
            forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
            accountName: '',
        });
        Module.CustomLoader.isShowLoader(true);
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            Module.CustomLoader.isShowLoader(false);
            mapData(userInfo);
            await GoogleSignin.revokeAccess();
        } catch (error) {
            Module.CustomLoader.isShowLoader(false);
        }
    }

    // navigate and store data for asyncstorage
    const mapData = (data: any) => {
        utils.UserSession.USERDATA = data;
        AsyncStorage.setItem(config.Constants.AsyncStorageKeys.isLogin, JSON.stringify(true));
        AsyncStorage.setItem(config.Constants.AsyncStorageKeys.userData, JSON.stringify(data));
        AsyncStorage.setItem(config.Constants.AsyncStorageKeys.googleLogin, JSON.stringify(true));

        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'BottomTabBar' }],
            }),
        );
    }

    // Function to handle form submission and validation
    const onSubmitPress = async () => {
        if (!phoneNumber) {
            setPhoneNumberError(t('PleaseEnterPhoneNumber'));
            return;
        }
        else if (!/^\d{10}$/.test(phoneNumber)) {
            setPhoneNumberError(t('PleaseEnterCorrectPhoneNumber'));
            return;
        } else {
            Module.CustomLoader.isShowLoader(true);
            otpSent();

        }
    }

    // function for otp sent to firebase
    const otpSent = async () => {
        setPhoneNumberError('')
        try {
            const confirmation: any = await auth().signInWithPhoneNumber(`+91${phoneNumber}`);
            Module.CustomLoader.isShowLoader(false);
            navigation.navigate('VerificationScreen', {
                phoneNumber: `+91${phoneNumber}`,
                PhonesNumber: phoneNumber,
                confirmation: confirmation
            })
        } catch (error) {
            Module.CustomLoader.isShowLoader(false);
        }
    }

    return (
        <View style={styles.mainContainer}>
            <View style={[Utility.getStatusBarStyle(AppColors.COLOR_TRASPARENT)]} />
            <SafeAreaView style={{ flex: 1 }}>

                <View
                    style={[styles.scrollView, AppStyles.commonMargin]}>
                    <Text
                        style={[styles.titleSignIn, AppStyles.commonMargin]}>
                        {t('SignIn')}
                    </Text>
                    <View style={styles.marginViewTop}>
                        <MaskTextInput
                            onChangeText={onPhoneNumberTextChange}
                            placeholder={t('PhoneNumber')}
                            title={''}
                            keyBoardType="numeric"
                        />
                    </View>
                    {phoneNumberError ? <Text style={styles.errorText}>{phoneNumberError}</Text> : null}
                    <View style={styles.marginViewTop}>
                        <SubmitButton
                            onSubmitPress={onSubmitPress}
                            buttonStyle={styles.submitButtonStyle}
                            title={t('LogIn')} />
                    </View>
                    <View style={[styles.socialLoginButtonContainer, styles.googleLoginButtonContainer]}>
                        <SocialLoginButton icon={images.icons.googleIcon} onPress={onGoogleLoginPress} title={t('ContinueWithGoogle')} />
                    </View>

                </View>
            </SafeAreaView>

        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: AppColors.COLOR_WHITE,
    },
    viewContainer: {
        flex: 1,
        backgroundColor: AppColors.COLOR_WHITE,
        marginTop: normalize(50),
        borderTopWidth: normalize(3),
        borderBottomWidth: normalize(3),
        borderColor: AppColors.COLOR_LABEL_DARK,
    },
    titleSignIn: {
        fontFamily: AppFonts.FiraCodeSemiBold,
        fontSize: normalize(20),
        alignSelf: 'center',
        color: AppColors.COLOR_LABEL_DARK,
    },
    marginViewTop: {
        marginTop: normalize(15),
    },
    socialLoginButtonContainer: {
        marginTop: normalize(30),
        height: normalize(60)
    },
    scrollView: {
        marginTop: normalize(70),
        flex: 1,
    },
    googleLoginButtonContainer: {
        marginTop: normalize(100),
    },
    submitButtonStyle: {
        height: normalize(60),
        borderRadius: normalize(32),
    },
    errorText: {
        color: AppColors.COLOR_RED,
        fontFamily: AppFonts.FiraCodeRegular,
        marginBottom: normalize(10),
        marginStart: normalize(10)
    },
})

export default SignInScreen;