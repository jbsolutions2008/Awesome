import i18n from 'i18next';
import {
    initReactI18next
} from 'react-i18next';

//translation resources for different languages.
const resources = {
    en: {
        translation: {
            SignIn: 'Sign in',
            PhoneNumber: 'Phone Number',
            Email: 'Email',
            Name: 'Name',
            Password: 'Password',
            LogIn: 'Log in',
            ContinueWithGoogle: 'Continue with Google',
            Verification: 'Verification',
            AuthenticateYourNumber: 'Authenticate your number',
            Continue: 'Continue',
            ResendCode: 'Resend code',
            CheckingYourCode: 'Checking your code',
            MyProfile: 'My Profile',
            TodoList: 'Todo List',
            updateTitle: 'Update Title',
            Title: 'Title',
            EditProfile: 'Edit Profile',
            Logout: 'Logout',
            LogoutConfirmationMessage: 'Are you sure, you want to logout?',
            UpdateProfile: 'Update Profile',
            DarkMode: 'DarkMode',
            LightMode: 'LightMode',

            //validation
            PleaseEnterFirstName: 'Please enter first name.',
            PleaseEnterLastName: 'Please enter last name.',
            PleaseEnterEmailAddress: 'Please enter email address.',
            PleaseEnterValidEmailAddress: 'Please enter valid email address.',
            PleaseEnterPhoneNumber: 'Please enter phone number.',
            PleaseEnterCorrectPhoneNumber: 'Phone number must be 10 digits.',
        }
    },
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: 'en',
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;