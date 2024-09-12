import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../../assets/Colors';
import { String } from '../../utility/CommonText';
import ButtonCustom from '../../customScreen/ButtonCustom';
import { Formik } from 'formik';
import { validateOTP } from '../../utility/Validation';

const OTPscreen = ({ navigation }) => {
  const initialValues = {
    otp: ['', '', '', ''],
  };

  const handleSubmitForm = (values) => {
    console.log('OTP Submitted:', values);
    navigation.navigate('ChangePassword');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containLog}>
        <Text style={styles.headText}>{String.ENTER_OTP}</Text>
        <Text style={styles.smallText}>OTP has been sent to your Mobile, Please verify.</Text>
        <Formik
          initialValues={initialValues}
          validationSchema={validateOTP}
          onSubmit={handleSubmitForm}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <View style={styles.textHolder}>
                {values.otp.map((value, index) => (
                  <TextInput
                    key={index}
                    style={styles.input}
                    value={value}
                    onChangeText={handleChange(`otp[${index}]`)}
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

export default OTPscreen;

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
    shadowOffset: { width: 0, height: 2 },
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
