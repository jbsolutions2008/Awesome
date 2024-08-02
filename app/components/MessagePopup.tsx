import { t } from 'i18next';
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image,
} from 'react-native';
import Modal from 'react-native-modal';
import AppStyles from '../config/app_styles';
import AppColors from '../config/colors';
import AppFonts from '../config/fonts';
import normalize from '../config/normalize';
import utils from '../utils';
import SubmitButton from './SubmitButton';

// Define the type for the props
export type MessagePopupProps = {
    isVisible?: boolean;
    setVisible?: () => void;
    title: string;
    message: string;
    onOkButtonPress?: () => void;
    onCancelButtonPress?: () => void;
    titleStyle?: any;
    messageStyle?: any;
    image?: number;
    imageStyle?: any;
    okButtonTitle?: string;
    cancelButtonTitle?: string;
    okButtonStyle?: any;
    cancelButtonStyle?: any;
    okButtonTextStyle?: any;
    cancelButtonTextStyle?: any;
};

// custom message popup component
const MessagePopup = (props: MessagePopupProps) => {

    // Handler for Cancel button press
    const onCancelPress = () => {
        if (props.onCancelButtonPress)
            props.onCancelButtonPress()
        if (props.setVisible)
            props.setVisible();
        utils.UserSession.ALERT_MESSAGE_DATA.isForPermissionPopup = false;
        utils.UserSession.ALERT_MESSAGE_DATA.cancelButtonTitle = ''
    }

    // Handler for OK button press
    const onOkPress = () => {
        if (props.onOkButtonPress)
            props.onOkButtonPress()
        if (props.setVisible)
            props.setVisible();

        utils.UserSession.ALERT_MESSAGE_DATA.isForPermissionPopup = false;
        utils.UserSession.ALERT_MESSAGE_DATA.cancelButtonTitle = ''
    }

    return (
        <Modal
            hardwareAccelerated={true}
            animationOut="fadeOutDown"
            animationIn="fadeInUp"
            isVisible={props.isVisible}
            onBackdropPress={props.setVisible}>
            <View style={styles.mainContainer}>
                <View style={styles.centerContainerView}>
                    {props.image &&
                        <Image
                            resizeMode='contain'
                            source={props.image}
                            style={[styles.image, props.imageStyle]}
                        />
                    }
                    <Text style={[AppStyles.commonMargin, styles.titleText, props.titleStyle]}>{props.title}</Text>
                    <ScrollView
                        bounces={false}
                        style={styles.scrollView}>
                        <Text style={[AppStyles.commonMargin, styles.messageText, props.messageStyle]}>{
                            props.message
                        }</Text>
                    </ScrollView>
                    <View style={[AppStyles.commonMargin, styles.buttonsContainer]}>
                        {(props.cancelButtonTitle !== undefined && props.cancelButtonTitle !== null && props.cancelButtonTitle !== '') &&
                            <>
                                <View style={styles.separator} />
                                <SubmitButton
                                    buttonStyle={props.cancelButtonStyle}
                                    buttonTextStyle={props.cancelButtonTextStyle}
                                    isForHorizontalButtons={true}
                                    onSubmitPress={onCancelPress}
                                    title={props.cancelButtonTitle ? props.cancelButtonTitle : t('Cancel')}
                                />
                                <View style={AppStyles.componentSeparator} />
                            </>
                        }
                        <SubmitButton
                            buttonStyle={props.okButtonStyle}
                            buttonTextStyle={props.okButtonTextStyle}
                            isForHorizontalButtons={true}
                            onSubmitPress={onOkPress}
                            title={props.okButtonTitle ? props.okButtonTitle : t('Ok')}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

// Styles for the component
const styles = StyleSheet.create({
    separator: {
        height: normalize(20)
    },
    image: {
        alignSelf: 'center',
        height: normalize(80),
        width: normalize(80),
        marginTop: normalize(-40)
    },
    titleText: {
        color: AppColors.COLOR_LABEL_DARK,
        fontFamily: AppFonts.FiraCodeBold,
        fontSize: normalize(17),
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: normalize(25)
    },
    scrollView: {
        marginTop: normalize(15),
        marginBottom: normalize(15),
    },
    messageText: {
        color: AppColors.COLOR_LABEL_DARK,
        fontFamily: AppFonts.FiraCodeRegular,
        fontSize: normalize(17),
        textAlign: 'center',
        alignSelf: 'center',
    },
    buttonsContainer: {
        marginTop: normalize(20),
        marginBottom: normalize(20),
        flexDirection: 'row',
    },
    centerContainerView: {
        borderRadius: normalize(20),
        backgroundColor: 'white',
        marginTop: normalize(80),
        marginBottom: normalize(80),
    },
    mainContainer: {
        flex: 1,
        backgroundColor: AppColors.COLOR_TRASPARENT,
        justifyContent: 'center',
    },
});

export default MessagePopup;
