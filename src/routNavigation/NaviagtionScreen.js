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
import Home from '../screen/Home/Home';
import {MoreIcon, ProfileIcon,PortfolioIcon, Accounticon} from '../assets/Images';
import {Colors} from '../assets/Colors';
import Portfolio from '../screen/Portfolio/Portfolio';
import Account from '../screen/Account/Account';
import Profile from '../screen/Profile/Profile';
import Faq from '../screen/Setting/Faq';
import HelpAndSupport from '../screen/Setting/HelpAndSupport';
import ScannerCode from '../screen/Home/ScannerCode';
import CapitalWithdrawal from '../screen/Home/CapitalWithdrawal';
import TermsAndCondition from '../screen/Setting/TermsAndCondition';
import Reward from '../screen/Home/Reward';
import TransactionDeatail from '../screen/Portfolio/TransactionDeatail';
import DTHScreen from '../screen/Home/DTHScreen';
import Recharge from '../screen/Home/Recharge';
import SelectRechargePlan from '../screen/Home/SelectRechargePlan';
import AccountHistory from '../screen/Account/AccountHistory';
import Ops from '../customScreen/Ops';
import ReferAndEarnn from '../screen/Home/ReferAndEarnn';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator(); 

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#ffff',
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: '600',
        },
        tabBarStyle: {
          height: 85,
          paddingBottom: 25,
          backgroundColor: 'transparent', 
          position: 'absolute', 
          borderTopWidth: 0, 
          elevation: 0, 
        },
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
                color: !focused ? '#000' : '#ffff',
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
                tintColor: !focused ? '#000' : '#ffff',                
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
          headerShown: false, 
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontSize: 13,
                fontWeight: '600',
                color: !focused ? '#000' : '#ffff',
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
                tintColor: !focused ? '#000' : '#ffff',
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
          headerShown: false, 
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontSize: 13,
                fontWeight: '600',
                color: !focused ? '#000' : '#ffff',
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
                tintColor: !focused ? '#000' : '#ffff',
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
                color: !focused ? '#000' : '#ffff',
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
                tintColor: !focused ? '#000' : '#ffff',
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
        <Stack.Screen name='Faq' component={Faq} options={{headerShown:false}}/>
        <Stack.Screen name='HelpAndSupport' component={HelpAndSupport} options={{headerShown:false}}/>
        <Stack.Screen name='ScannerCode' component={ScannerCode} options={{headerShown:false}}/>
        <Stack.Screen name='CapitalWithdrawal' component={CapitalWithdrawal} options={{headerShown:false}}/>
        <Stack.Screen name='TermsAndCondition' component={TermsAndCondition} options={{headerShown:false}}/>
        <Stack.Screen name='Reward' component={Reward} options={{headerShown:false}}/>
        <Stack.Screen name='TransactionDeatail' component={TransactionDeatail} options={{headerShown:false}}/>
        <Stack.Screen name='DTHScreen' component={DTHScreen} options={{headerShown:false}}/>
        <Stack.Screen name='Recharge' component={Recharge} options={{headerShown:false}}/>
        <Stack.Screen name='SelectRechargePlan' component={SelectRechargePlan} options={{headerShown:false}}/>
        <Stack.Screen name='AccountHistory' component={AccountHistory} options={{headerShown:false}}/>
        <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
        <Stack.Screen name='Ops' component={Ops} options={{headerShown:false}}/>
        <Stack.Screen name='ReferAndEarn' component={ReferAndEarnn} options={{headerShown:false}}/>

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
