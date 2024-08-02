import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { BaseToast, ErrorToast } from 'react-native-toast-message';
import config from '.';
import { TOAST_TYPES } from './enum';

// determine the title for the toast
const getTitle = (title: any, type: string) => {

    // If a custom title is provided, use it
    if (title && title !== "") {
        return (
            <Text style={styles.customToastTitle}>{title}</Text>
        );
    } else {
        return (
            <Text style={styles.customToastTitle}>{type === TOAST_TYPES.success ? "Success" : "Error"}</Text>
        );
    }
}

// Configuration object for different types of toasts
const toastConfig = {

    success: (props) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: 'green' }}
            text1Style={{
                fontSize: 15,
                fontFamily: config.AppFonts.FiraCodeRegular
            }}
            text1NumberOfLines={0}
        />
    ),

    // Error toast configuration
    error: (props) => (
        <ErrorToast
            {...props}
            text1Style={{
                fontFamily: config.AppFonts.FiraCodeRegular,
                fontSize: 17
            }}
            text2Style={{
                fontFamily: config.AppFonts.FiraCodeRegular,
                fontSize: 15
            }}
        />
    ),

    // Custom toast configuration
    customToast: ({ props }) => (
        <View style={styles.customToastContainer}>
            <View style={[styles.verticalLine, {
                backgroundColor: props.type === TOAST_TYPES.success ? 'green' : 'red'
            }]} />
            <View style={styles.titleMessageContainer}>
                {getTitle(props.title, props.type)}
                {(props.message || props.message !== "") &&
                    <Text style={styles.customToastMessage}>{props.message}</Text>
                }
            </View>
        </View>
    )
};

// StyleSheet for custom toast styling
const styles = StyleSheet.create({
    titleMessageContainer: {
        justifyContent: 'center',
        margin: 10
    },
    verticalLine: {
        width: 15,
        backgroundColor: 'green',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    customToastTitle: {
        fontFamily: config.AppFonts.FiraCodeBold,
        fontSize: 16,
        color: 'black'
    },
    customToastMessage: {
        marginTop: 2,
        fontFamily: config.AppFonts.FiraCodeRegular,
        fontSize: 15,
        color: 'black'
    },
    customToastContainer: {
        width: Dimensions.get('window').width - 20,
        flexDirection: 'row',
        minHeight: 50,
        elevation: 3,
        borderRadius: 10,
        marginRight: 5,
        marginLeft: 5,
        shadowColor: 'gray',
        shadowOffset: { height: 3, width: 3 },
        shadowOpacity: 1,
        shadowRadius: 3,
        backgroundColor: 'white'
    },
})
export default toastConfig;