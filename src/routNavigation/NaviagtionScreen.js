import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import {Image, Text} from 'react-native';
import Splash from '../screen/authScreen/Splash';
import WelcomeScreen from '../screen/authScreen/WelcomeScreen';
import Login from '../screen/authScreen/Login';
import PasswordScreen from '../screen/authScreen/PasswordScreen';
import OTPscreen from '../screen/authScreen/OTPscreen';
import ChangePassword from '../screen/authScreen/ChangePassword';
import PersonalInfo from '../screen/authScreen/PersonalInfo';
import Home from '../screen/Home/Home'; // Your Home Screen
import Profile from '../screen/Profile/Profile'; // Your Profile Screen
import {MoreIcon, ProfileIcon,PortfolioIcon, Accounticon} from '../assets/Images';
import {Colors} from '../assets/Colors';
import Portfolio from '../screen/Portfolio/Portfolio';
import Account from '../screen/Account/Account';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator(); // Create the Tab Navigator

// Bottom Tab Navigator
const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#ccc',
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: '600',
        },
        tabBarStyle: {height: 60}, // Adjust height if needed
        tabBarBackground: () => (
          <LinearGradient
            colors={[Colors.themegreen, Colors.ThemelightGreen]}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={{flex: 1,borderTopLeftRadius:25,borderTopRightRadius:25}}
          />
        ),
      }}>
      {/* Home Tab */}
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false, // Hides the header for this screen
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontSize: 13,
                fontWeight: '600',
                color: !focused ? '#000' : '#ccc',
              }}>
              DashBoard
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <Image
              source={MoreIcon}
              style={{
                width: 24,
                height: 24,
                tintColor: !focused ? '#000' : '#ccc',
              }}
            />
          ),
        }}
      />

      {/* Portfolio Tab */}
      <Tab.Screen
        name="Portfolio"
        component={Portfolio}
        options={{
          headerShown: false, // Hides the header for this screen
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontSize: 13,
                fontWeight: '600',
                color: !focused ? '#000' : '#ccc',
              }}>
             Portfolio
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <Image
              source={PortfolioIcon}
              style={{
                width: 24,
                height: 24,
                tintColor: !focused ? '#000' : '#ccc',
              }}
            />
          ),
        }}
      />

      {/* Account Tab */}
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false, // Hides the header for this screen
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontSize: 13,
                fontWeight: '600',
                color: !focused ? '#000' : '#ccc',
              }}>
             Account
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <Image
              source={Accounticon}
              style={{
                width: 24,
                height: 24,
                tintColor: !focused ? '#000' : '#ccc',
              }}
            />
          ),
        }}
      />

      {/* Profile Tab */}
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false, // Hides the header for this screen
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontSize: 13,
                fontWeight: '600',
                color: !focused ? '#000' : '#ccc',
              }}>
              Profile
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <Image
              source={ProfileIcon}
              style={{
                width: 24,
                height: 24,
                tintColor: !focused ? '#000' : '#ccc',
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Stack Navigator
const NavigationScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainTabs">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PasswordScreen"
          component={PasswordScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OTPscreen"
          component={OTPscreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PersonalInfo"
          component={PersonalInfo}
          options={{headerShown: false}}
        />

        {/* Add Tab Navigation as a screen in Stack Navigator */}
        <Stack.Screen
          name="MainTabs"
          component={TabNavigation}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationScreen;
