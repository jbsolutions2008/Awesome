import React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
} from 'react-native';
import AppColors from '../config/colors';

import AppFonts from '../config/fonts';
import normalize from '../config/normalize';

// Define the type for the props
export type InputTextProps = {
    icon?: any; // or specify a more precise type if known
    placeholder?: string;
    onChangeText?: (text: string) => void;
    value?: string;
    autoCompleteType?: any;
    secureTextEntry?: boolean;
    autoCapitalize?: 'none';
    onPress?: () => void;
    defaultValue?: string;
    keyBoardType?: 'default';
    containerStyle?: object;
    textStyle?: object;
    messageValidate?: () => void;
    editable?: boolean;
    returnKeyType?: 'done';
    onSubmitEditing?: () => void;
    propText?: string;
    maxLength?: number;
    placeholderColor?: string;
}

// custom inout text component
const InputText = (props: InputTextProps) => {

    const [text, setText] = React.useState<string>('');

    // Effect to update local text state when propText changes
    React.useEffect(() => {
        setText(props.propText || '');
    }, [props.propText]);

    return (
        <View style={[styles.container, props.containerStyle]}>
            <TextInput
                maxLength={props.maxLength}
                secureTextEntry={props.secureTextEntry}
                style={[styles.input, props.textStyle]}
                defaultValue={props.defaultValue}
                placeholderTextColor={props.placeholderColor || AppColors.COLOR_TEXT_INPUT_PLACEHOLDER}
                placeholder={props.placeholder}
                editable={props.editable}
                value={props.propText || text}
                onChangeText={(value) => {
                    if (props.onChangeText) props.onChangeText(value);
                    setText(value);
                }}
                onBlur={props.messageValidate}
                underlineColorAndroid='transparent'
                keyboardType={props.keyBoardType || "ascii-capable"}
                autoCapitalize={props.autoCapitalize || 'none'}
                autoCorrect={true}
                multiline
                returnKeyType={props.returnKeyType}
                autoCompleteType={props.autoCompleteType}
                onSubmitEditing={props.onSubmitEditing}
            />
        </View>
    );
};

// Styles for the component
const styles = StyleSheet.create({
    container: {
        width: '80%',
        alignSelf: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: AppColors.APP_TEXT_INPUT_BORDER,
        height: 45,
        alignItems: 'center',
        marginTop: 25,
    },
    input: {
        height: '100%',
        width: '90%',
        fontWeight: '400',
        color: AppColors.COLOR_TEXT_INPUT_PLACEHOLDER,
        fontFamily: AppFonts.FiraCodelight,
        fontSize: normalize(18),
    },
    image: {
        height: 18,
        width: 18,
        resizeMode: 'contain',
    }
});

export default InputText;
