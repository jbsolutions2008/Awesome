import { Dimensions } from 'react-native';

// Base URL for API requests. This is where API endpoints will be appended.
const base_url = 'https://jsonplaceholder.typicode.com/'

// Exporting a Constants object with various configuration and utility constants.
export const Constants = {

    BASE_URL: base_url, // Base URL for API requests.
    GOOGLE_SIGNIN_ANDROID: '23495778345-n0qmc7ef74g72c6va541k9c6r6gf81pg.apps.googleusercontent.com', // Google Sign-In client ID for Android. Used for OAuth authentication with Google.
    SCREEN_WIDTH: Dimensions.get('window').width, // Screen width of the device. Useful for responsive design and layout adjustments.
    INITIAL_VERIFICATION_CODE_RESEND_SECONDS: 20, // Time (in seconds) before a verification code can be resent.

    MASK_INPUTS: {
        PHONE_NUMBER: ['+', '91', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/], // PHONE NUMBER REGEX
    },

    // Pagination settings. Defines the number of items to be fetched per page in paginated requests.
    pagination: {
        perPageLimit: 10,
    },

    // Keys used for storing and retrieving data from asynchronous storage (e.g., AsyncStorage in React Native).
    AsyncStorageKeys: {
        isLogin: 'isLogin',
        userData: 'userData',
        phoneNumber: 'phoneNumber',
        phonesNumber: 'phonesNumber',
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email',
        phoneLogin: 'phoneLogin',
        googleLogin: 'googleLogin',
        stackTheme: 'stackTheme',
    },

}