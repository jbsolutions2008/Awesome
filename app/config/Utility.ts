import { getStatusBarHeight } from "react-native-status-bar-height";
import { Constants } from "./constants";

// Function to get the style for the status bar based on background color
const getStatusBarStyle = (backgroundColor: string) => {
    return {
        width: Constants.SCREEN_WIDTH,
        height: getStatusBarHeight(),
        backgroundColor: backgroundColor,
    }
}

// Exporting an object with the getStatusBarStyle function
export default {
    getStatusBarStyle,
}