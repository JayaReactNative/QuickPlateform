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

const PasswordScreen = ({ navigation }) => {

  const initialValues = {
    password: '',
  };

  const handleSubmitForm = (values) => {
    // Alert.alert('Password Submitted', JSON.stringify(values, null, 2));
    navigation.navigate('PersonalInfo');
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
                  secureTextEntry={true}
                  style={styles.textStyle}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                />
              </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

              <TouchableOpacity onPress={() => navigation.navigate('OTPscreen')}>
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
    alignSelf: 'center',
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
