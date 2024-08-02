import React from "react";
import { KeyboardTypeOptions, StyleSheet, View, TextInputProps } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import AppColors from "../config/colors";
import AppFonts from "../config/fonts";
import normalize from "../config/normalize";
import CustomText from "./CustomText";

// defining data type of props
type Props = {
    customStyles?: any;
    customInputTextStyles?: any;
    onChangeText?: (value: string) => void,
    isSecureTextEntry?: boolean;
    placeholder?: string;
    title?: string;
    keyBoardType?: KeyboardTypeOptions;
    numberOfLine?: number;
    multiLines?: boolean;
    showEye?: boolean;
    textInputContainerStyle?: any;
    titleLabelStyle?: any;
    propText?: string;
    editable?: any;
    messageValidate?: any;
    returnKeyType?: TextInputProps['returnKeyType'];
    refs?: (value: React.ComponentClass<any, any> | React.FunctionComponent<any> | null) => void;
    onSubmitEditing?: () => void,
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

// custom inout text component
const CustomTextInput = (props: Props) => {

    const [text, setText] = React.useState('');
    const [secureTextEntry, setSecureTextEntry] = React.useState(props.isSecureTextEntry);

    // Destructuring refs from props with a default empty function
    const { refs = () => { } } = props;

    // Effect to update local text state when propText changes
    React.useEffect(() => {
        setText(props.propText)
    }, [props.propText])

    return (
        <View style={[props.customStyles]}>
            {props.title !== '' && <CustomText title={props.title} Style={props.titleLabelStyle} />}
            <View style={[styles.mainContainer, props.textInputContainerStyle]}>
                <TextInput
                    autoCapitalize={props.autoCapitalize ? props.autoCapitalize : 'none'}
                    ref={ref => refs(ref)}
                    keyboardType={props.keyBoardType ? props.keyBoardType : "ascii-capable"}
                    autoCorrect={true}
                    value={props.propText ? props.propText : text}
                    style={[styles.textInput, props.customInputTextStyles]}
                    onChangeText={(value: string) => {
                        props.onChangeText(value)
                        setText(value)
                    }}
                    onBlur={props.messageValidate}
                    secureTextEntry={secureTextEntry}
                    placeholder={props.placeholder}
                    editable={props.editable}
                    placeholderTextColor={AppColors.COLOR_TEXT_INPUT_PLACEHOLDER}
                    numberOfLines={props.numberOfLine}
                    multiline={props.multiLines}
                    underlineColorAndroid='transparent'
                    returnKeyType={props.returnKeyType}
                    onSubmitEditing={() => {
                        if (props.onSubmitEditing)
                            props.onSubmitEditing()
                    }}
                />
            </View>
        </View>
    );
}

// Styles for the component
const styles = StyleSheet.create({
    passwordHideShowTouchable: {
        height: normalize(45),
        width: normalize(45),
        justifyContent: 'center',
        alignItems: 'center'
    },
    passwordHideShowImage: {
        height: normalize(20),
        width: normalize(20)
    },
    textInput: {
        flex: 1,
        height: normalize(56),
        marginRight: normalize(15),
        marginLeft: normalize(15),
        color: AppColors.COLOR_LABEL_DARK,
        fontFamily: AppFonts.FiraCodeRegular,
        fontSize: normalize(14),
    },
    mainContainer: {
        height: normalize(56),
        backgroundColor: AppColors.COLOR_TEXT_INPUT_BACKGROUND,
        borderRadius: normalize(16),
        borderWidth: normalize(2),
        marginTop: normalize(3),
        borderColor: AppColors.APP_TEXT_INPUT_BORDER,
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default CustomTextInput;