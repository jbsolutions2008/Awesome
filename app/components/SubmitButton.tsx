import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import config from "../config";
import AppColors from "../config/colors";
import AppFonts from "../config/fonts";
import normalize from "../config/normalize";

// Define the type for the props
type Props = {
    containerStyle?: any;
    onSubmitPress: () => void;
    title?: any;
    isForHorizontalButtons?: boolean;
    buttonStyle?: any;
    buttonTextStyle?: any;
    image?: number;
    imageStyle?: any;
    disabled?: boolean;
    titleWrapViewStyle?: any;
}

// custom button component
const SubmitButton = (props: Props) => {
    return (
        <View style={[props.isForHorizontalButtons && styles.touchableFlex, props.containerStyle]}>
            <TouchableOpacity
                activeOpacity={0.9}
                style={[
                    styles.touchableOpacity,
                    props.buttonStyle,
                ]}
                onPress={() => {
                    if (props.disabled) {
                        if (!props.disabled) {
                            props.onSubmitPress()
                        }
                    } else {
                        props.onSubmitPress()
                    }
                }}>
                {props.image
                    && <Image
                        resizeMode={'contain'}
                        style={[styles.image, props.imageStyle]}
                        source={props.image} />
                }
                {!!props.title &&
                    <View style={props.titleWrapViewStyle}>
                        <Text style={[styles.touchableOpacityText, props.buttonTextStyle]}>{props.title}</Text>
                    </View>
                }
            </TouchableOpacity>
        </View>
    );
}

// Styles for the component
const styles = StyleSheet.create({
    image: {
        height: config.normalize(20),
        width: config.normalize(20),
    },
    touchableOpacityText: {
        color: 'white',
        fontFamily: AppFonts.FiraCodeBold,
        fontSize: normalize(17),
    },
    touchableFlex: {
        flex: 1,
    },
    touchableOpacity: {
        flexDirection: 'row',
        height: normalize(50),
        borderRadius: normalize(25),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: AppColors.COLOR_PRIMARY_LIGHT,
    }
});

export default SubmitButton;