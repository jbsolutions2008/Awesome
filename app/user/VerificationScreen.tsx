// 
import { t } from "i18next";
import React, { useState, useRef } from "react";
import { ActivityIndicator, StyleSheet, Text, View, StatusBar } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CommonActions } from "@react-navigation/native";
import CustomHeader from "../components/CustomHeader";
import AppColors from "../config/colors";
import AppFonts from "../config/fonts";
import normalize from "../config/normalize";
import AppStyles from "../config/app_styles";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import SubmitButton from "../components/SubmitButton";
import { Constants } from "../config/constants";
import Module from '../module';
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../config";
import Toast from "react-native-toast-message";
import { TOAST_TYPES } from "../config/enum";
import auth from '@react-native-firebase/auth';

type RootStackParamList = {
    VerificationScreen: {};
};
type Props = NativeStackScreenProps<RootStackParamList, 'VerificationScreen'>; // Props type for navigation and route parameters.

const VerificationScreen = ({ route, navigation }: Props) => {

    // Hooks
    const confirmation = route?.params?.confirmation;
    const phoneNumber = route?.params?.phoneNumber;
    const PhonesNumber = route?.params?.PhonesNumber;

    const [timeLeft, setTimeLeft] = useState<any>(Constants.INITIAL_VERIFICATION_CODE_RESEND_SECONDS);
    const [isVerifying, setIsVerifying] = useState<boolean>(false);
    const [otpCode, setOtpCode] = useState<any>();
    const [verificationCodeError, setVerificationCodeError] = React.useState('');
    const resendTimer = useRef(null);

    //  timeLeft changes.
    React.useEffect(() => {
        if (!timeLeft) return;
        resendTimer.current = setInterval(() => {
            setTimeLeft(timeLeft - 1);
            clearInterval(resendTimer.current);
        }, 1000);
        return () => clearInterval(resendTimer.current);
    }, [timeLeft]);

    // Navigates back to the previous screen.
    const onBackPress = () => {
        navigation.pop();
    }

    // phone number otp validation 
    const otpVarificationValidation = () => {
        if (!otpCode) {
            setVerificationCodeError(t('PleaseEnterPhoneNumber'));
            return false;
        }
        if (!/^\d{6}$/.test(otpCode)) {
            setVerificationCodeError('PleaseEnterCorrectPhoneNumber');
            return false;
        }
        setVerificationCodeError('');
        return true;
    }

    // varify enter otp
    const onVerifyPress = async () => {
        if (otpVarificationValidation()) {
            Module.CustomLoader.isShowLoader(true);
            otpVerification();
        }
    }

    // funtion for otp vartification and store data to async storage
    const otpVerification = async () => {
        try {
            await confirmation.confirm(otpCode);
            AsyncStorage.setItem(config.Constants.AsyncStorageKeys.isLogin, JSON.stringify(true));
            AsyncStorage.setItem(config.Constants.AsyncStorageKeys.phoneNumber, phoneNumber);
            AsyncStorage.setItem(config.Constants.AsyncStorageKeys.phonesNumber, PhonesNumber);
            AsyncStorage.setItem(config.Constants.AsyncStorageKeys.phoneLogin, JSON.stringify(true));
            Module.CustomLoader.isShowLoader(false);
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'BottomTabBar' }],
                }),
            );
        } catch (error) {
            Module.CustomLoader.isShowLoader(false);
            Toast.show({
                type: 'customToast',
                props: {
                    type: TOAST_TYPES.error,
                    message: 'Invalid code.'
                }
            });
        }
    }

    // time left to resend otp sent
    const callVerificationCodeSendAPI = async () => {
        try {
            const confirmation: any = await auth().signInWithPhoneNumber(phoneNumber);
            Module.CustomLoader.isShowLoader(false);
        } catch (error) {
            Module.CustomLoader.isShowLoader(false);
        }
        setTimeLeft(Constants.INITIAL_VERIFICATION_CODE_RESEND_SECONDS)
    }

    // resend verification
    const onResendVerificationPress = () => {
        if (timeLeft === 0 && !isVerifying) {
            Module.CustomLoader.isShowLoader(false);
            callVerificationCodeSendAPI()
        }
    }

    // change timer
    const getTimerText = () => {
        return (timeLeft > 9 ? "00:" : "00:0") + timeLeft
    }

    return (
        <>
            <StatusBar barStyle="light-content" />
            <View style={styles.container}>
                <CustomHeader
                    title={t('Verification')}
                    onLeftButtonPress={onBackPress}
                    statusBarContainerStyle={styles.satusBarColor}
                    titleStyle={{ color: AppColors.COLOR_WHITE }}
                    mainContainer={{ backgroundColor: AppColors.COLOR_BLACK }}
                />
                <Text style={[styles.titleAuthNumber, AppStyles.commonMargin]}>
                    {t('AuthenticateYourNumber')}
                </Text>
                <Text style={[styles.verificationCodeSentText, AppStyles.commonMargin]}>
                    {"We’ve send you the verification code by SMS to confirm your phone number " + phoneNumber + "."}
                </Text>
                <OTPInputView
                    style={styles.pinView}
                    pinCount={6}
                    autoFocusOnLoad
                    codeInputFieldStyle={styles.codeFieldStyle}
                    codeInputHighlightStyle={styles.codeHighlightStyle}
                    placeholderCharacter="-"
                    placeholderTextColor={AppColors.COLOR_LABEL_DARK}
                    code={otpCode}
                    onCodeChanged={(code) => {
                        setOtpCode(code);
                    }}
                />
                {verificationCodeError ? <Text style={styles.errorText}>{verificationCodeError}</Text> : null}
                <View style={[styles.submitButtonContainer, AppStyles.commonMargin]}>
                    <SubmitButton title={t('Continue')} onSubmitPress={onVerifyPress} />
                </View>
                <TouchableOpacity
                    activeOpacity={0.99}
                    style={styles.resendTouchable}
                    onPress={onResendVerificationPress}>
                    <Text style={styles.resendCodeText}>
                        {t('ResendCode') + (timeLeft > 0 ? ' ' + t('in') : '')}
                        {timeLeft > 0 &&
                            <Text style={styles.resendCodeTimerText}> {getTimerText()}</Text>
                        }
                    </Text>
                </TouchableOpacity>
                {isVerifying &&
                    <View style={styles.activityIndicatorContainer}>
                        <ActivityIndicator size={"large"} color={AppColors.COLOR_LABEL_DARK} />
                        <Text style={styles.codeCheckingText}>{t('CheckingYourCode')}</Text>
                    </View>
                }
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    satusBarColor: {
        backgroundColor: AppColors.COLOR_BLACK
    },
    activityIndicatorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    codeCheckingText: {
        fontSize: normalize(14),
        color: AppColors.COLOR_LABEL_LIGHT,
        fontFamily: AppFonts.FiraCodeBold,
        marginTop: normalize(10),
    },
    resendTouchable: {
        marginTop: normalize(17),
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: AppColors.COLOR_LABEL_DARK,
        borderBottomWidth: 1,
        alignSelf: 'center',
        minWidth: normalize(85),
    },
    resendCodeTimerText: {
        fontSize: normalize(14),
        color: AppColors.COLOR_LABEL_DARK,
        fontFamily: AppFonts.FiraCodeBold,
    },
    resendCodeText: {
        fontSize: normalize(14),
        color: AppColors.COLOR_LABEL_DARK,
        fontFamily: AppFonts.FiraCodeRegular,
    },
    pinView: {
        alignSelf: 'center',
        width: '90%',
        height: normalize(60),
        marginTop: normalize(30),
    },
    codeFieldStyle: {
        width: normalize(55),
        height: normalize(55),
        borderWidth: normalize(1),
        borderRadius: normalize(6),
        borderColor: AppColors.COLOR_LABEL_EXTRA_LIGHT,
        backgroundColor: AppColors.COLOR_TEXT_INPUT_BACKGROUND,
        color: AppColors.COLOR_LABEL_DARK,
        fontFamily: AppFonts.FiraCodeBold,
        fontSize: normalize(24),
    },
    codeHighlightStyle: {
        width: normalize(55),
        height: normalize(55),
        borderWidth: 1,
        borderRadius: normalize(6),
        borderColor: AppColors.COLOR_LABEL_DARK,
        color: AppColors.COLOR_LABEL_DARK,
        fontFamily: AppFonts.FiraCodeBold,
        fontSize: normalize(24),
    },
    verificationCodeSentText: {
        fontFamily: AppFonts.FiraCodeRegular,
        fontSize: normalize(15),
        color: AppColors.COLOR_LABEL_DARK,
        marginTop: normalize(12),
    },
    titleAuthNumber: {
        fontFamily: AppFonts.FiraCodeBold,
        fontSize: normalize(20),
        color: AppColors.COLOR_LABEL_DARK,
        marginTop: normalize(20),
    },
    submitButtonContainer: {
        marginTop: normalize(40),
    },
    container: {
        flex: 1,
        backgroundColor: AppColors.COLOR_WHITE
    },
    errorText: {
        color: AppColors.COLOR_RED,
        fontFamily: AppFonts.FiraCodeRegular,
        marginBottom: normalize(10),
        marginStart: normalize(10)
    },
});

export default VerificationScreen;