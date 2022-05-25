/**
 * @format
 */

import {AppRegistry} from 'react-native';
import AppWrapper from './TodoApp/AppWrapper';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppWrapper);
