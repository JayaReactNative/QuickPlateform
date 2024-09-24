import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
  ActivityIndicator, 
} from 'react-native';
import {Colors} from '../../assets/Colors';
import {String} from '../../utility/CommonText';
import ButtonCustom from '../../customScreen/ButtonCustom';
import {Formik} from 'formik';
import {validateOTP} from '../../utility/Validation';
import AuthService from '../../server/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OTPscreen = ({navigation, route}) => {
  const {mobileNumber, otp} = route.params;
  const [loading, setLoading] = useState(false);

  console.log('Mobile Number:', mobileNumber);

  const initialValues = {
    otp: ['', '', '', ''],
  };

  // -----Validation --
  const otpInputRefs = Array(4)
    .fill()
    .map(() => useRef(null));
  const handleInputChange = (text, index, handleChange) => {
    handleChange(`otp[${index}]`)(text);
    if (text.length === 1 && index < otpInputRefs.length - 1) {
      otpInputRefs[index + 1].current.focus();
    }
    if (text.length === 0 && index > 0) {
      otpInputRefs[index - 1].current.focus();
    }
  };

  // ----- Api calling
  const handleSubmitForm = async value => {
    const otpString = value.otp.join('');
    const otpNumber = Number(otpString);
    try {      
      setLoading(true)
      if (otp === otpNumber) {
        const response = await AuthService.VerfyOTP({
          mobile: mobileNumber,
          otp: otpNumber,
        });
        const dataRes = response?.data;
        const token = dataRes?.items?.token;
        await AsyncStorage.setItem('userToken', token);
        if (dataRes?.message === 'OTP verified successfully') {
          navigation.navigate('PersonalInfo');
        } else if (
          dataRes?.message === 'Invalid OTP ! Please enter correct OTP'
        ) {
          Alert.alert('Invalid OTP', 'Please enter the correct OTP');
        }
      } else {
        Alert.alert('Invalid OTP', 'Entered OTP does not match.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while verifying the OTP');
    } finally {
      setLoading(false)
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
          <ActivityIndicator size="large" color="#ffffff" style={styles.loader} /> // Show loader when loading
        ) : (
          <View style={styles.containLog}>
            <Text style={styles.headText}>{String.ENTER_OTP}</Text>
            <Text style={styles.smallText}>
              OTP has been sent to your Mobile, Please verify.
            </Text>
            <Formik
              initialValues={initialValues}
              validationSchema={validateOTP}
              onSubmit={handleSubmitForm}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <>
                  <View style={styles.textHolder}>
                    {values.otp.map((value, index) => (
                      <TextInput
                        key={index}
                        ref={otpInputRefs[index]}
                        style={styles.input}
                        value={value}
                        onChangeText={text =>
                          handleInputChange(text, index, handleChange)
                        }
                        onBlur={handleBlur(`otp[${index}]`)}
                        keyboardType="numeric"
                        maxLength={1}
                        autoCapitalize="none"
                        autoCorrect={false}
                        textAlign="center"
                      />
                    ))}
                  </View>
                  {touched.otp && errors.otp && (
                    <Text style={styles.errorText}>{errors.otp}</Text>
                  )}
                  <ButtonCustom
                    title="Submit OTP"
                    onClickButton={handleSubmit}
                    colors={[Colors.themegreen, Colors.ThemelightGreen]}
                    start={{x: 0, y: 0}}
                    end={{x: 0, y: 1.8}}
                    textColor="white"
                    width={350}
                    Buttonstyle={styles.btnStyle}
                  />
                </>
              )}
            </Formik>
          </View>
        )}
    </SafeAreaView>
  );
};

export default OTPscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.White,
  },
  loader: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  headText: {
    fontSize: 25,
    fontWeight: '700',
    color: Colors.themeColor,
    marginVertical: 10,
    alignSelf: 'center',
  },
  smallText: {
    marginTop: 7,
    fontSize: 13,
    fontWeight: '400',
    color: Colors.themeColor,
  },
  containLog: {
    paddingHorizontal: 18,
    alignItems: 'center',
  },
  textHolder: {
    flexDirection: 'row',
    marginTop: 70,
  },
  input: {
    width: 43,
    height: 45,
    fontSize: 17,
    fontWeight: '300',
    color: 'black',
    borderRadius: 10,
    textAlign: 'center',
    marginHorizontal: 3,
    backgroundColor: Colors.SkyBlue,
  },
  btnStyle: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignSelf: 'center',
    marginTop: '45%',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});
