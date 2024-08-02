import React from "react";
import { StyleSheet, Text } from "react-native";
import AppFonts from "../config/fonts";
import normalize from "../config/normalize";

// defining data type of props
type Props = {
    title: string;
    Style?: any;
}

// custom text component
const CustomText = (props: Props) => {
    return (
        <Text style={[styles.text, props.Style]}>{props.title}</Text>
    );
}

// Styles for the component
const styles = StyleSheet.create({
    text: {
        fontFamily: AppFonts.FiraCodeBold,
        fontSize: normalize(14),
    }
});

export default CustomText;