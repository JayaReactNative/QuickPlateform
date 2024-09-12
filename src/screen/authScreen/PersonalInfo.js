import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Alert,
  Text,
} from 'react-native';
import {Formik} from 'formik';
import {validationSchema} from '../../utility/validationSchema';
import {Colors} from '../../assets/Colors';
import {
  BirthCalender,
  Email,
  Exchange,
  Lock,
  LoginImage,
  Placeholder,
  UserIcon,
} from '../../assets/Images';
import ButtonCustom from '../../customScreen/ButtonCustom';
import TextImagecustom from '../../customScreen/TextImagecustom';

const PersonalInfo = ({navigation}) => {
  const initialValues = {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    dateOfBirth: '',
    email: '',
    password: '',
    confirmPassword: '',
    referencePassword: '',
  };

  const handleSubmitForm = values => {
    // Alert.alert("Form Submitted", JSON.stringify(values, null, 2));
    navigation.navigate('Home'); // Navigate on success
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmitForm}>
          {({handleChange, handleSubmit, values, errors, touched}) => (
            <>
              <Text style={styles.headText}>Personal Informatoin</Text>
              <Image source={LoginImage} style={styles.imageStyle} />
              <View style={styles.containLog}>
                <View style={styles.textView}>
                  <TextImagecustom
                    IconAdd={UserIcon}
                    shownIcon={true}
                    Title="First Name"
                    keyboardType="default"
                    TextinuptStyle={styles.inputCointer}
                    ValueText={values.firstName}
                    ChangeText={handleChange('firstName')}
                    error={touched.firstName && errors.firstName}
                  />
                  <TextImagecustom
                    Title="Last Name"
                    keyboardType="default"
                    TextinuptStyle={styles.inputCointer}
                    ValueText={values.lastName}
                    ChangeText={handleChange('lastName')}
                    error={touched.lastName && errors.lastName}
                  />
                </View>

                <TextImagecustom
                  IconAdd={Placeholder}
                  shownIcon={true}
                  Title="Address"
                  keyboardType="default"
                  TextinuptStyle={styles.fullTextInput}
                  ValueText={values.address}
                  ChangeText={handleChange('address')}
                  error={touched.address && errors.address}
                />

                <View style={styles.textView}>
                  <TextImagecustom
                    IconAdd={Placeholder}
                    shownIcon={true}
                    Title="City"
                    keyboardType="default"
                    TextinuptStyle={styles.inputCointer}
                    ValueText={values.city}
                    ChangeText={handleChange('city')}
                    error={touched.city && errors.city}
                  />
                  <TextImagecustom
                    IconAdd={Placeholder}
                    shownIcon={true}
                    Title="State"
                    keyboardType="default"
                    TextinuptStyle={styles.inputCointer}
                    ValueText={values.state}
                    ChangeText={handleChange('state')}
                    error={touched.state && errors.state}
                  />
                </View>

                <TextImagecustom
                  IconAdd={BirthCalender}
                  shownIcon={true}
                  Title="Date of Birth"
                  keyboardType="numeric"
                  TextinuptStyle={styles.fullTextInput}
                  ValueText={values.dateOfBirth}
                  ChangeText={handleChange('dateOfBirth')}
                  error={touched.dateOfBirth && errors.dateOfBirth}
                />

                <TextImagecustom
                  IconAdd={Email}
                  shownIcon={true}
                  Title="Email"
                  TextinuptStyle={styles.fullTextInput}
                  ValueText={values.email}
                  keyboardType="email-address"
                  ChangeText={handleChange('email')}
                  error={touched.email && errors.email}
                />

                <TextImagecustom
                  IconAdd={Lock}
                  shownIcon={true}
                  Title="Password"
                  keyboardType="numeric"
                  maxLength={16}
                  TextinuptStyle={styles.fullTextInput}
                  ValueText={values.password}
                  ChangeText={handleChange('password')}
                  // secureTextEntry={true}
                  error={touched.password && errors.password}
                />

                <TextImagecustom
                  IconAdd={Lock}
                  shownIcon={true}
                  Title="Re Enter Password"
                  keyboardType="numeric"
                  maxLength={16}
                  TextinuptStyle={styles.fullTextInput}
                  ValueText={values.confirmPassword}
                  ChangeText={handleChange('confirmPassword')}
                  // secureTextEntry={true}
                  error={touched.confirmPassword && errors.confirmPassword}
                />

                <TextImagecustom
                  IconAdd={Exchange}
                  shownIcon={true}
                  Title="Enter Reference Code"
                  keyboardType="numeric"
                  maxLength={6}
                  TextinuptStyle={styles.fullTextInput}
                  ValueText={values.referencePassword}
                  ChangeText={handleChange('referencePassword')}
                  // secureTextEntry={true}
                  error={touched.referencePassword && errors.referencePassword}
                />
              </View>

              <ButtonCustom
                title={'Submit'}
                onClickButton={handleSubmit}
                colors={[Colors.themegreen, Colors.ThemelightGreen]}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1.8}}
                textColor="white"
                width={200}
                Buttonstyle={styles.btnStyle}
              />
            </>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalInfo;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: Colors.White,
  },
  imageStyle: {
    width: 150,
    height: 160,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 25,
  },
  headText: {
    fontSize: 23,
    fontWeight: '700',
    color: Colors.themeColor,
    alignSelf: 'center',
    marginVertical: 10,
  },
  containLog: {
    paddingHorizontal: 18,
  },
  textView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnStyle: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignSelf: 'center',
    marginTop: 25,
    width: 300,
    marginBottom: 100,
  },
  inputCointer: {
    width: 165,
  },
  fullTextInput: {
    width: '100%',
  },
});
