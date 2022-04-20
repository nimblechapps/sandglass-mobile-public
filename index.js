/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import './src/ReactotronConfig';
import './src/locales';

LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

if (!__DEV__) {
    console = console || {};
    console.log = () => { };
}

AppRegistry.registerComponent(appName, () => App);
