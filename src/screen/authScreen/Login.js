import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import {Colors} from '../../assets/Colors';
import {LoginImage} from '../../assets/Images';
import {String} from '../../utility/CommonText';
import ButtonCustom from '../../customScreen/ButtonCustom';
import { Formik } from 'formik';
import { validationMobile } from '../../utility/Validation';
import AuthService from '../../server/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Login = ({navigation}) => {

  const initialValues = {
    number: '',
  };

  // ------ api  calling
  const handleSubmitForm = async (values) => {
    try {
      const response = await AuthService.sendOTP(values.number);
      const dataRes = response.data;

      if (dataRes?.message === 'registered') {
        const userId = dataRes.items?._id;
        await AsyncStorage.setItem('authId', userId);
        navigation.navigate('PasswordScreen');
      } else if (dataRes?.message === 'Otp Sent Successfully') {
        const otp = dataRes.items?.otp;  
        const mobileNumber = values.number;  
        const userId = dataRes.items?.existDetails?._id;
        await AsyncStorage.setItem('authId', userId);
        navigation.navigate('OTPscreen', { mobileNumber, otp });
      }
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };
  
  

  return (
    <SafeAreaView style={styles.container}>
      <Image source={LoginImage} style={styles.imageStyle} />
      <View style={styles.containLog}>
        <Text style={styles.headText}>{String.WELCOME}</Text>
        <Text style={styles.smallText}>{String.PLEASE_LOGIN}</Text>

        <Formik
          initialValues={initialValues}
          validationSchema={validationMobile}
          onSubmit={handleSubmitForm}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, resetForm }) => {
            useFocusEffect(
              React.useCallback(() => {
                resetForm();
              }, [resetForm])
            );

            return (
            <>
              <View style={styles.textHolder}>
                <TextInput
                  placeholder="Enter Mobile Number"
                  placeholderTextColor={Colors.HolderColor}
                  keyboardType="number-pad"
                  value={values.number}
                  onChangeText={handleChange('number')}
                  onBlur={handleBlur('number')}
                  maxLength={10}
                  style={styles.textStyle}
                />
              </View>
                {touched.number && errors.number && (
                  <Text style={styles.errorText}>{errors.number}</Text>
                )}

              <ButtonCustom
                title={String.SIGN_IN}
                onClickButton={handleSubmit}
                colors={[Colors.themegreen, Colors.ThemelightGreen]}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1.8}}
                textColor="white"
                width={200}
                Buttonstyle={styles.btnStyle}
              />
            </>
          )}}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.White
  },
  headText: {
    fontSize: 25,
    fontWeight: '700',
    color: Colors.themeColor,
    marginVertical: 10,
    marginTop: 25,
  },
  smallText: {
    fontSize: 15,
    fontWeight: '400',
    color: Colors.themeColor,
  },
  imageStyle: {
    width: 220,
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
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
    marginTop: 45,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginTop: 5,
  },
});
