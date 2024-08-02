import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { t } from "i18next";
import React, { useCallback, useEffect, useState } from "react";
import {
    Image,
    StyleSheet,
    View
} from 'react-native'
import { ScrollView } from "react-native-gesture-handler";
import CustomHeader from "../components/CustomHeader";
import CustomText from "../components/CustomText";
import config from "../config";
import normalize from "../config/normalize";

type RootStackParamList = {
    UserProfile: {};
    EditProfile: any
};
type Props = StackScreenProps<RootStackParamList, 'UserProfile'>; // Props type for navigation and route parameters.

const UserProfile = ({ navigation }: Props) => {

    const { colors } = useTheme();

    const [userData, setUserData] = useState<any>('');
    const [userFirstName, setUserFirstName] = useState<any>('');
    const [userLastName, setUserLastName] = useState<any>('');
    const [userEmail, setUserEmail] = useState<any>('');
    const [userPhoneNumber, setPhoneNumber] = useState<any>('');

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
        await AsyncStorage.getItem(config.Constants.AsyncStorageKeys.userData).then(data => {
            if (data) {
                const parsedData = JSON.parse(data);
                if (parsedData && parsedData.user) {
                    setUserData(parsedData.user);
                }
            }

        }, [])

        await AsyncStorage.getItem(config.Constants.AsyncStorageKeys.firstName).then(fNameData => {
            setUserFirstName(fNameData)

        }, [])

        await AsyncStorage.getItem(config.Constants.AsyncStorageKeys.lastName).then(lNameData => {
            setUserLastName(lNameData)

        }, [])

        await AsyncStorage.getItem(config.Constants.AsyncStorageKeys.email).then(emailData => {
            setUserEmail(emailData)
        }, [])

        await AsyncStorage.getItem(config.Constants.AsyncStorageKeys.phonesNumber).then(phoneData => {
            setPhoneNumber(phoneData)
        }, [])
    }

    // edit profile on click
    const headerRightButton = () => {
        navigation.navigate('EditProfile')
    }

    return (
        <View style={[config.AppStyles.pageMainContainer, { flex: 1, backgroundColor: colors.background }]}>
            <CustomHeader
                title={t('MyProfile')}
                rightImage={config.images.icons.pen}
                rightImageStyle={[styles.headerRightImage, { tintColor: colors.background }]}
                onLeftButtonPress={() => {
                    navigation.pop()
                }}
                safeAreaStyle={{ backgroundColor: colors.primary }}
                titleStyle={{ color: colors.background }}
                mainContainer={{ backgroundColor: colors.primary }}
                statusBarContainerStyle={{ backgroundColor: colors.primary }}
                onRightButtonPress={headerRightButton}
            />

            <ScrollView>
                <View style={[styles.flexRow, { justifyContent: 'space-between', }]}>
                    <View style={styles.flexRow}>
                        <Image
                            source={config.images.icons.user}
                            style={[styles.icon, { tintColor: colors.primary }]}
                            resizeMode='contain'
                        />
                        <CustomText title={t('Name')} Style={[styles.fieldTitle, { color: colors.primary }]} />
                    </View>
                    <CustomText title={userData?.name !== undefined ? userData?.name ? userData?.name : userFirstName + ' ' + userLastName : '-'} Style={[styles.fieldValue, { color: colors.primary }]} />
                </View>

                <View style={[styles.flexRow, { justifyContent: 'space-between', }]}>
                    <View style={styles.flexRow}>
                        <Image
                            source={config.images.icons.email}
                            style={[styles.icon, { tintColor: colors.primary }]}
                            resizeMode='contain'
                        />
                        {<CustomText title={t('Email')} Style={[styles.fieldTitle, { color: colors.primary }]} />}
                    </View>
                    <CustomText title={userData?.email !== undefined ? userData.email ? userData.email : userEmail : '-'} Style={[styles.fieldValue, { color: colors.primary }]} />
                </View>


                <View style={[styles.flexRow, { justifyContent: 'space-between', }]}>
                    <View style={styles.flexRow}>
                        <Image
                            source={config.images.icons.phone}
                            style={[styles.icon, { tintColor: colors.primary }]}
                            resizeMode='contain'
                        />
                        {<CustomText title={t('PhoneNumber')} Style={[styles.fieldTitle, { color: colors.primary }]} />}
                    </View>
                    <CustomText title={userData.phone_number !== undefined ? userData.country_code + ' ' + userData.phone_number : userPhoneNumber} Style={[styles.fieldValue, { color: colors.primary }]} />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    headerRightImage: {
        height: 15,
        width: 15,
    },
    topView: {
        flexDirection: 'row',
        height: normalize(70),
        width: config.Constants.SCREEN_WIDTH,
        backgroundColor: config.AppColors.COLOR_PRIMARY,
        justifyContent: 'space-between',
        borderBottomRightRadius: normalize(12),
        borderBottomLeftRadius: normalize(12),
        paddingHorizontal: 16,
    },
    backButton: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: normalize(50),
        width: normalize(48),
        zIndex: 100
    },
    flexLeftRight: {
        flex: 1
    },
    topViewTitle: {
        fontSize: normalize(22),
        fontFamily: config.AppFonts.FiraCodeBold,
        color: config.AppColors.COLOR_SCREEN_BACKGROUND,
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 7,
    },
    icon: {
        height: 16,
        width: 16,
        marginRight: 15
    },
    fieldTitle: {
        fontFamily: config.AppFonts.FiraCodeRegular,
        fontSize: 14,
    },
    fieldValue: {
        marginLeft: 10,
        fontSize: 15,
        fontFamily: config.AppFonts.FiraCodeRegular,
        textAlign: 'right',
        flex: 1,
    },
    fieldBoldTitle: {
        fontFamily: config.AppFonts.FiraCodeRegular,
        fontSize: 14,
        fontWeight: 'bold'
    },
    changePhoneButton: {
        backgroundColor: config.AppColors.COLOR_TRASPARENT,
        height: 20
    },
    changePhoneButtonContainer: {
        backgroundColor: config.AppColors.COLOR_TRASPARENT,
        height: 20,
        alignSelf: 'flex-end',
        marginTop: -15
    },
    changePhoneText: {
        textAlign: 'right',
        fontSize: 12,
        color: config.AppColors.COLOR_PRIMARY,
        textDecorationLine: 'underline',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitButtonStyle: {
        height: normalize(64),
        borderRadius: normalize(32),
    },
})

export default UserProfile;