import { StyleSheet } from 'react-native';
import AppColors from './colors';
import normalize from './normalize';

/**
 * set of common styles used in the application.
 */

const AppStyles = StyleSheet.create({
    commonMargin: {
        marginLeft: normalize(15),
        marginRight: normalize(15),
    },
    componentSeparator: {
        width: normalize(15)
    },
    pageMainContainer: {
        flex: 1,
        //backgroundColor: AppColors.COLOR_SCREEN_BACKGROUND
    }
})

export default AppStyles;