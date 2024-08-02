import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, ScrollView, Text, Switch } from 'react-native';
import { t } from "i18next";
import { StackScreenProps } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../config';
import CustomHeader from '../components/CustomHeader';
import CustomTextInput from '../components/CustomTextInput';
import MaskTextInput from '../components/MaskTextInput';
import SubmitButton from '../components/SubmitButton';
import { useFocusEffect, useTheme } from '@react-navigation/native';
import AppColors from '../config/colors';
import Toast from 'react-native-toast-message';
import { TOAST_TYPES } from '../config/enum';
import AppFonts from '../config/fonts';
import { AppContext } from '../theme/AppContext';
import CustomText from '../components/CustomText';

type RootStackParamList = {
    EditProfile: {};
};
type Props = StackScreenProps<RootStackParamList, 'EditProfile'>; // Props type for navigation and route parameters.

const EditProfile = ({ navigation }: Props) => {

    const { isDarkTheme, setIsDarkTheme } = useContext(AppContext);

    const { colors } = useTheme();

    const [firstName, setFirstName] = React.useState<any>('');
    const [lastName, setLastName] = React.useState<any>('');
    const [email, setEmail] = React.useState<any>('');
    const [phoneNumber, setPhoneNumber] = React.useState<any>();
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');

    const firstNameRef = React.useRef();
    const lastNameRef = React.useRef();
    const phoneNumberRef = React.useRef();
    const instaRef = React.useRef();
    const emailRef = React.useRef();
    const ssnRef = React.useRef();

    // Fetch user data from AsyncStorage when the component mounts
    useEffect(() => {
        fetchUserData();
    }, [])

    // Re-fetch user data when the screen is focused
    useFocusEffect(
        useCallback(() => {
            fetchUserData();
        }, [])
    )

    // Function to fetch user data from AsyncStorage
    const fetchUserData = async () => {
        await AsyncStorage.getItem(Config.Constants.AsyncStorageKeys.userData).then(data => {
            if (data) {
                const parsedData = JSON.parse(data);
                if (parsedData && parsedData.user) {
                    setFirstName(parsedData?.user?.givenName)
                    setLastName(parsedData?.user?.familyName)
                    setEmail(parsedData?.user?.email)
                }
            }

        }, [])

        await AsyncStorage.getItem(Config.Constants.AsyncStorageKeys.phonesNumber).then(phonedata => {
            setPhoneNumber(phonedata)
        }, [])

        AsyncStorage.getItem(Config.Constants.AsyncStorageKeys.phoneLogin).then(async (data) => {

            if (data) {
                if (JSON.parse(data)) {

                    await AsyncStorage.getItem(Config.Constants.AsyncStorageKeys.firstName).then(fNameData => {
                        setFirstName(fNameData)

                    }, [])

                    await AsyncStorage.getItem(Config.Constants.AsyncStorageKeys.lastName).then(lNameData => {
                        setLastName(lNameData)

                    }, [])

                    await AsyncStorage.getItem(Config.Constants.AsyncStorageKeys.email).then(emailData => {
                        setEmail(emailData)
                    }, [])
                }
            }
        });
    }

    // Function to handle form submission and validation
    const onSubmitPress = async () => {

        if (!firstName) {
            setFirstNameError(t('PleaseEnterFirstName'));
            return;
        } else if (!lastName) {
            setLastNameError(t('PleaseEnterLastName'));
            return;
        } else if (!email) {
            setEmailError(t('PleaseEnterEmailAddress'));
            return;
        } else if (!Config.validations.isValidEmail(email.trim())) {
            setEmailError(t('PleaseEnterValidEmailAddress'));
            return;
        } else if (!phoneNumber) {
            setPhoneNumberError(t('PleaseEnterPhoneNumber'));
            return;
        } else if (!/^\d{10}$/.test(phoneNumber)) {
            setPhoneNumberError(t('PleaseEnterCorrectPhoneNumber'));
            return;
        } else {

            setFirstNameError('')
            setLastNameError('')
            setEmailError('')
            setPhoneNumberError('')

            AsyncStorage.setItem(Config.Constants.AsyncStorageKeys.firstName, firstName);
            AsyncStorage.setItem(Config.Constants.AsyncStorageKeys.lastName, lastName);
            AsyncStorage.setItem(Config.Constants.AsyncStorageKeys.email, email);
            AsyncStorage.setItem(Config.Constants.AsyncStorageKeys.phoneNumber, phoneNumber);

            Toast.show({
                type: 'customToast',
                props: {
                    type: TOAST_TYPES.success,
                    message: 'Sucessfully update your profile.'
                }
            });

            navigation.pop();
        }

    }

    // Text change events
    const onFirstNameTextChange = (data: string) => {
        setFirstName(data)
    }
    const onLastNameTextChange = (data: string) => {
        setLastName(data)
    }
    const onEmailTextChange = (data: string) => {
        setEmail(data)
    }

    const onPhoneNumberTextChange = (str: string) => {
        setPhoneNumber(str);
    }

    return (
        <View style={Config.AppStyles.pageMainContainer}>
            <StatusBar barStyle='light-content' backgroundColor={colors.primary} />
            <CustomHeader
                title={t('EditProfile')}
                onLeftButtonPress={() => {
                    navigation.pop()
                }}
                titleStyle={{ color: colors.background }}
                leftImageStyle={{ tintColor: colors.background }}
                isShowLeftButton={true}
                safeAreaStyle={{ backgroundColor: colors.primary }}
                mainContainer={{ backgroundColor: colors.primary }}
                statusBarContainerStyle={{ backgroundColor: colors.primary }}
            />
            <ScrollView>
                <View style={styles.contentContainer}>
                    <CustomTextInput
                        returnKeyType='next'
                        refs={(ref) => {
                            firstNameRef.current = ref;
                        }}
                        onSubmitEditing={() => {
                            lastNameRef.current.focus();
                        }}
                        onChangeText={onFirstNameTextChange}
                        isSecureTextEntry={false}
                        placeholder={t('FirstName')}
                        title={t('FirstName')}
                        titleLabelStyle={{ color: colors.primary }}
                        customStyles={styles.commonStyle}
                        propText={firstName} />
                    {firstNameError ? <Text style={styles.errorText}>{firstNameError}</Text> : null}
                    <CustomTextInput
                        returnKeyType='next'
                        refs={(ref) => {
                            lastNameRef.current = ref;
                        }}
                        onSubmitEditing={() => {
                            emailRef.current.focus();
                        }}
                        onChangeText={onLastNameTextChange}
                        isSecureTextEntry={false}
                        placeholder={t('LastName')}
                        title={t('LastName')}
                        titleLabelStyle={{ color: colors.primary }}
                        customStyles={styles.commonStyle}
                        propText={lastName}
                    />
                    {lastNameError ? <Text style={styles.errorText}>{lastNameError}</Text> : null}
                    <CustomTextInput
                        returnKeyType='next'
                        refs={(ref) => {
                            emailRef.current = ref;
                        }}
                        onSubmitEditing={() => {
                            instaRef.current.focus();
                        }}
                        onChangeText={onEmailTextChange}
                        isSecureTextEntry={false}
                        placeholder={t('Email')}
                        title={t('Email')}
                        titleLabelStyle={{ color: colors.primary }}
                        customStyles={styles.commonStyle}
                        keyBoardType='email-address'
                        propText={email}
                    />
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                    <MaskTextInput
                        returnKeyType='next'
                        refs={(ref) => {
                            phoneNumberRef.current = ref;
                        }}
                        onSubmitEditing={() => {
                            ssnRef.current.focus();
                        }}
                        value={phoneNumber}
                        containerStyle={styles.commonStyle}
                        onChangeText={onPhoneNumberTextChange}
                        placeholder={t('PhoneNumber')}
                        title={t('PhoneNumber')}
                        titleLabelStyle={{ color: colors.primary }}
                        keyBoardType="numeric"
                    />
                    {phoneNumberError ? <Text style={styles.errorText}>{phoneNumberError}</Text> : null}

                    <View style={styles.flexRow}>
                        <View style={styles.flexRow}>
                            <CustomText title={isDarkTheme ? t('DarkMode') : t('LightMode')} Style={[styles.fieldTitle, { color: colors.primary }]} />
                        </View>
                        <Switch
                            value={isDarkTheme}
                            thumbColor={isDarkTheme ? AppColors.COLOR_BLACK : AppColors.COLOR_LABEL_EXTRA_LIGHT}
                            onChange={() => {
                                setIsDarkTheme((prev: any) => !prev);
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
            <SubmitButton
                onSubmitPress={onSubmitPress}
                title={t('UpdateProfile')}
                buttonStyle={[styles.verifyButton]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    editProfileCamera: { height: 13, width: 13 },
    profileImage: { height: 90, width: 90 },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    topMargin: {
        marginTop: Config.normalize(20),
    },
    profileImageView: {
        borderRadius: 50,
        borderWidth: 2,
        borderColor: Config.AppColors.COLOR_LABEL_DARK,
        overflow: 'hidden',
        alignSelf: 'center',
    },
    cameraButton: {
        height: 30,
        width: 30,
        borderRadius: 15,
        borderWidth: 1.5,
        borderColor: Config.AppColors.COLOR_SECONDARY,
        backgroundColor: Config.AppColors.COLOR_PRIMARY,
        position: 'absolute',
        bottom: -2,
        right: -2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImageCameraView: {
        width: 90,
        height: 90,
        alignSelf: 'center',
        marginVertical: 30
    },
    commonStyle: {
        marginTop: 10
    },
    verifyButton: {
        marginBottom: 30,
        marginHorizontal: 16,
        height: Config.normalize(60)
    },
    subTitleText: {
        color: Config.AppColors.COLOR_LABEL_DARK,
        fontFamily: Config.AppFonts.FiraCodeRegular,
        fontSize: Config.normalize(14),
        marginRight: Config.normalize(10),
        marginBottom: Config.normalize(15),
    },
    toggleView: {
        flex: 1,
        flexDirection: 'row',
        marginTop: Config.normalize(15),
    },
    errorText: {
        color: AppColors.COLOR_RED,
        fontFamily: AppFonts.FiraCodeRegular,
        marginBottom: Config.normalize(10),
        marginStart: Config.normalize(10)
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 7,
        marginTop: Config.normalize(20),
        justifyContent: 'space-between'
    },
    fieldTitle: {
        fontFamily: Config.AppFonts.FiraCodeBold,
        fontSize: 14,
    },
})

export default EditProfile;
