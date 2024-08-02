import React from "react";
import { KeyboardTypeOptions, StyleSheet, View, TextInput, TextInputProps } from "react-native";
import AppColors from "../config/colors";
import normalize from "../config/normalize";
import CustomText from "./CustomText";
import MaskInput, { formatWithMask, Mask } from 'react-native-mask-input';
import AppFonts from "../config/fonts";

// Define the type for the props
type Props = {
    containerStyle?: any;
    onChangeText: (value: string) => void,
    placeholder: string;
    title: string;
    keyBoardType?: KeyboardTypeOptions;
    mask?: Mask;
    value?: string;
    refs?: (value: TextInput | null) => void;
    onSubmitEditing?: () => void;
    returnKeyType?: TextInputProps['returnKeyType'];
    isSecureTextEntry?: boolean;
    showEye?: boolean;
    titleLabelStyle?: any;
    showTooltip?: boolean;
}

// custom mask input text component
const MaskTextInput = (props: Props) => {

    const [text, setText] = React.useState('');
    const [secureTextEntry, setSecureTextEntry] = React.useState(props.isSecureTextEntry ? props.isSecureTextEntry : false);

    // Format the input text with the provided mask
    const { masked } = formatWithMask({
        text: props.value,
        mask: props.mask,
        obfuscationCharacter: '-',
    });

    // Default ref callback function
    const { refs = () => { } } = props;

    // Effect to update local text state when the value prop changes
    React.useEffect(() => {
        setText(masked);
    }, [props.value])

    return (
        <View style={props.containerStyle}>
            {props.title !== '' && <CustomText title={props.title} Style={props.titleLabelStyle} />}
            <View style={styles.mainContainer}>
                <MaskInput
                    secureTextEntry={secureTextEntry}
                    ref={ref => refs(ref)}
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType={props.keyBoardType ? props.keyBoardType : "ascii-capable"}
                    value={text}
                    style={styles.textInput}
                    onChangeText={(masked: string, unmasked: string) => {
                        props.onChangeText(masked)
                        setText(masked)
                    }}
                    placeholder={props.placeholder}
                    mask={props.mask}
                    placeholderTextColor={AppColors.COLOR_TEXT_INPUT_PLACEHOLDER}
                    returnKeyType={props.returnKeyType}
                    onSubmitEditing={props.onSubmitEditing}
                />
            </View>
        </View>
    );
}

// Styles for the component
const styles = StyleSheet.create({
    textInput: {
        flex: 1,
        marginRight: normalize(15),
        marginLeft: normalize(15),
        color: AppColors.COLOR_LABEL_DARK,
        fontFamily: AppFonts.FiraCodeRegular,
        fontSize: normalize(14),
    },
    mainContainer: {
        backgroundColor: AppColors.COLOR_TEXT_INPUT_BACKGROUND,
        height: normalize(60),
        borderRadius: normalize(16),
        borderWidth: normalize(2),
        borderColor: AppColors.APP_TEXT_INPUT_BORDER,
        marginTop: normalize(3),
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default MaskTextInput;