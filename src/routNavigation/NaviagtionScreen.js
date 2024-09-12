import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import Splash from '../screen/authScreen/Splash';
import WelcomeScreen from '../screen/authScreen/WelcomeScreen';
import Login from '../screen/authScreen/Login';
import PasswordScreen from '../screen/authScreen/PasswordScreen';
import OTPscreen from '../screen/authScreen/OTPscreen';
import ChangePassword from '../screen/authScreen/ChangePassword';
import PersonalInfo from '../screen/authScreen/PersonalInfo';
import Home from '../screen/Home/Home';



export const useCustomDimensions = () => {
  const { width, height } = useWindowDimensions();

  return {
    customWidth: Math.round(width * widthRatio),
    customHeight: Math.round(height * heightRatio),
  };
};


const Stack = createNativeStackNavigator()

const NavigationScreen = () => {
 return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Splash' component={Splash} options={{headerShown:false}}/>
        <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
        <Stack.Screen name='PasswordScreen' component={PasswordScreen} options={{headerShown:false}}/>
        <Stack.Screen name='OTPscreen' component={OTPscreen} options={{headerShown:false}}/>
        <Stack.Screen name='ChangePassword' component={ChangePassword} options={{headerShown:false}}/>
        <Stack.Screen name='PersonalInfo' component={PersonalInfo} options={{headerShown:false}}/>
        <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavigationScreen;


