/**
 * @format
 */

import 'react-native-gesture-handler';
import { Text, TextInput, AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import './app/config/i18n';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = Text.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

AppRegistry.registerComponent(appName, () => App);
