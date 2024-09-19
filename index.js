import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-gesture-handler'; // Import this before other imports

import { GestureHandlerRootView } from 'react-native-gesture-handler';

const MainApp = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <App />
  </GestureHandlerRootView>
);

AppRegistry.registerComponent(appName, () => MainApp);
