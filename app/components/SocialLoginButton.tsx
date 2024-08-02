import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppColors from "../config/colors";
import AppFonts from "../config/fonts";
import normalize from "../config/normalize";

// Define the type for the props
type Props = {
    onPress: () => void;
    title: string;
    icon: any;

}

// Get screen width for responsive design
const screenDimensionWidth = Dimensions.get('window').width;

// custom social login button component
const SocialLoginButton = (props: Props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.9}
                style={styles.touchableOpacity}
                onPress={props.onPress}>
                <Text style={styles.touchableOpacityText}>{props.title}</Text>
            </TouchableOpacity>
            <Image resizeMode={'contain'} style={styles.iconStyle} source={props.icon} />
        </View>
    );
}

// Styles for the component
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: normalize(60),
        borderRadius: normalize(60),
        borderWidth: (1),
        backgroundColor: 'white',
        marginBottom: 2,
    },
    iconStyle: {
        position: 'absolute',
        height: normalize(22),
        width: normalize(22),
        marginLeft: normalize(16),
        marginRight: normalize(15),
        alignSelf: 'center',
    },
    touchableOpacityText: {
        color: AppColors.COLOR_LABEL_DARK,
        fontFamily: AppFonts.FiraCodeBold,
        fontSize: normalize(17),
    },
    touchableOpacity: {
        width: screenDimensionWidth - normalize(30),
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default SocialLoginButton;