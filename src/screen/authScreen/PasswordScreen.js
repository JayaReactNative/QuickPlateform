import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Colors } from '../../assets/Colors';
import { String } from '../../utility/CommonText';
import ButtonCustom from '../../customScreen/ButtonCustom';
import { Formik } from 'formik';
import { validatePassword } from '../../utility/Validation';
import AuthService from '../../server/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PasswordScreen = ({ navigation }) => {

  const initialValues = {
    password: '',
  };


// ------- password verification -------
  const handleSubmitForm = async(values) => {
    try {
      const userId =await AsyncStorage.getItem('authId')
        const response = await AuthService.VerfyPassword({
          authId: userId,
          password: values.password,
        });
        const dataRes = response?.data;
        const token = dataRes?.items?.token;
        if (dataRes?.message === 'Password verified Successfully') {
          Alert.alert('User Registered Successfully')
          try {
            await AsyncStorage.setItem('userToken', token);
            await AsyncStorage.setItem('authId', dataRes.items?._id);
          } catch (error) {
            console.error('Error saving token:', error.message);
          }
          navigation.navigate('MainTabs', {
            screen: 'Home', // This tells it to go to the Home tab
          });
        } 
        else{
          Alert.alert('Error', 'Invalid Password');
        }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while verifying the  password');
    }
  };


  const handleForgotForm = async () => {
    try {
      const mobileNumber= await AsyncStorage.getItem('mobile')
      const response = await AuthService.sendForgetOTP(mobileNumber);
      const dataRes = response.data;
      console.log('data respone ---->',dataRes)
      const otp = dataRes.items?.otp;
      const userId = dataRes.items?.existDetails?._id;
      await AsyncStorage.setItem('authId', userId);
      console.log('otp---', otp);

      navigation.navigate('OtForgotpassword', { otp });
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containLog}>
        <Text style={styles.headText}>{String.ENTER_PASSWORD}</Text>
        <Formik
          initialValues={initialValues}
          validationSchema={validatePassword}
          onSubmit={handleSubmitForm}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <View style={styles.textHolder}>
                <TextInput
                  placeholder="Enter password"
                  placeholderTextColor={Colors.HolderColor}
                  keyboardType="default"
                  style={styles.textStyle}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                />
              </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

              <TouchableOpacity onPress={() =>handleForgotForm()}>
                <Text style={styles.smallText}>{String.FORGOT_PASSWORD}</Text>
              </TouchableOpacity>

              <ButtonCustom
                title="Submit Password"
                onClickButton={handleSubmit}
                colors={[Colors.themegreen, Colors.ThemelightGreen]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1.8 }}
                textColor="white"
                width={350}
                Buttonstyle={styles.btnStyle}
              />
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default PasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.White,
  },
  headText: {
    fontSize: 25,
    fontWeight: '700',
    color: Colors.themeColor,
    marginVertical: 10,
  },
  smallText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.themeColor,
    alignSelf: 'flex-end',
  },
  containLog: {
    paddingHorizontal: 18,
  },
  textHolder: {
    marginTop: 25,
    borderBottomWidth: 1,
    borderBottomColor: Colors.themeColor,
    padding: 8,
  },
  textStyle: {
    fontSize: 15,
    fontWeight: '400',
    color: Colors.Grey,
  },
  btnStyle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignSelf: 'center',
    marginTop: '5%',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});
