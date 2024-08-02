import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView } from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import AppColors from "../config/colors";
import AppFonts from "../config/fonts";
import images from "../config/images";
import normalize from "../config/normalize";
import { Constants } from '../config/constants';
import { useTheme } from "@react-navigation/native";


// defining data type of props
type Props = {
    title?: string;
    titleStyle?: any;
    isCenterView?: boolean;
    centerView?: React.ReactNode;
    onLeftButtonPress: () => void;
    onRightButtonPress?: () => void;
    rightButtonTitle?: string;
    rightImage?: number;
    rightImageStyle?: any;
    rightButtonWidth?: number;
    isShowLeftButton?: boolean;
    leftImage?: number;
    leftImageUri?: string;
    leftButtonStyle?: any;
    safeAreaStyle?: any;
    leftImageStyle?: any;
    rightButtonStyle?: any;
    mainContainer?: any;
    statusBarContainerStyle?: any;
    showBadge?: boolean;
    unreadNotificationCount?: number;
}

// custom header component
const CustomHeader = (props: Props) => {

    const { isCenterView = false } = props;
    const { colors } = useTheme();

    return (
        <View>
            <View style={[styles.statusBarContainer, props.statusBarContainerStyle]} />
            <SafeAreaView style={[styles.headerView, props.safeAreaStyle]}>
                <View style={[styles.container, props.mainContainer]}>
                    {props.isShowLeftButton === true &&
                        <TouchableOpacity style={[styles.backButton, styles.flexLeftRight, props.leftButtonStyle]}
                            onPress={() => props.onLeftButtonPress()}>
                            <Image
                                style={[styles.backButtonImage, props.leftImageStyle]}
                                resizeMode='contain'
                                source={images.icons.backWhite} />
                        </TouchableOpacity>}
                    <View style={[styles.headerCenterTextContainer, styles.flexCenter]}>
                        {!isCenterView ?
                            <Text numberOfLines={1} style={[styles.headerCenterTextStyle, props.titleStyle]}>{props.title}</Text>
                            :
                            <View style={styles.centerView}>
                                {props.centerView}
                            </View>
                        }
                    </View>

                    <View style={styles.flexLeftRight}>
                        {props.rightButtonTitle &&
                            <TouchableOpacity
                                activeOpacity={0.9}
                                style={
                                    [
                                        styles.rightButton,
                                        {
                                            width: props.rightButtonWidth
                                        }
                                    ]
                                }
                                onPress={() => {
                                    if (props.onRightButtonPress) {
                                        props.onRightButtonPress()
                                    }
                                }}>
                                <Text
                                    style={styles.rightButtonText}>
                                    {props.rightButtonTitle}
                                </Text>
                            </TouchableOpacity>
                        }
                        {props.rightImage &&
                            <TouchableOpacity
                                activeOpacity={0.9}
                                style={[styles.rightButton, props.rightButtonStyle]}
                                onPress={() => {
                                    if (props.onRightButtonPress) {
                                        props.onRightButtonPress()
                                    }
                                }}>
                                <Image
                                    style={[styles.backButtonImage, props.rightImageStyle]}
                                    resizeMode={'contain'}
                                    source={props.rightImage} />
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
}

// Styles for the component
const styles = StyleSheet.create({
    notificationContainerStyle: {
        top: 8,
    },
    templateHeader: {
        zIndex: 1
    },
    headerView: {
        zIndex: 1,
        backgroundColor: AppColors.COLOR_BLACK
    },
    rightButtonText: {
        alignSelf: 'center',
        fontFamily: AppFonts.FiraCodeRegular,
        fontSize: normalize(14),
        color: 'white',
    },
    rightButton: {
        height: normalize(50),
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    backButtonImage: {
        height: normalize(25),
        width: normalize(25),
    },
    backButtonURIImage: {
        height: normalize(30),
        width: normalize(30),
    },
    backButton: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: normalize(50),
        width: normalize(48),
        zIndex: 100
    },
    headerCenterTextContainer: {
        height: normalize(50),
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerCenterTextStyle: {
        fontFamily: AppFonts.FiraCodeSemiBold,
        marginLeft: normalize(10),
        fontSize: normalize(17),
    },
    container: {
        flexDirection: 'row',
        height: normalize(50),
        width: Constants.SCREEN_WIDTH,
        justifyContent: 'space-between',
        borderBottomRightRadius: normalize(12),
        borderBottomLeftRadius: normalize(12),
        paddingHorizontal: 16
    },
    centerView: {
        height: normalize(50),
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusBarContainer: {
        width: Constants.SCREEN_WIDTH,
        height: getStatusBarHeight(),
        backgroundColor: AppColors.COLOR_PRIMARY,
    },
    flexLeftRight: {
        flex: 1
    },
    flexCenter: {
        flex: 10
    },
});

export default CustomHeader;