import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator, 
} from 'react-native';
import { Formik } from 'formik';
import { validationSchema } from '../../utility/validationSchema';
import { Colors } from '../../assets/Colors';
import {
  BirthCalender,
  EmailIcon,
  Exchange,
  LockIcon,
  LoginImage,
  Placeholder,
  UserIcon,
} from '../../assets/Images';
import ButtonCustom from '../../customScreen/ButtonCustom';
import DatePicker from 'react-native-date-picker';
import TextImagecustom from '../../customScreen/TextImagecustom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from '../../server/AuthService';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs()

const PersonalInfo = ({ navigation }) => {
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
  const [loading, setLoading] = useState(false);

  const handleSubmitForm = async (values) => {
    const authId = await AsyncStorage.getItem('authId'); 
    const userToken = await AsyncStorage.getItem('userToken'); 

    try {
      setLoading(true)
      const data = {
        authId: authId,
        name: `${values.firstName} ${values.lastName}`, 
        email: values.email,
        dob: values.dateOfBirth, 
        password: values.password,
        referralBy: values.referencePassword || "",  
      };  
      const response = await AuthService.signUp(data, userToken);   
      console.error('response------>', response);
      if (response.message === 'User Registered Successfully') {
        Alert.alert('User Registered Successfully')
        try {
          await AsyncStorage.setItem('authId', response.data.items._id);
        } catch (error) {
          
        }
        navigation.navigate('MainTabs'); 
      }
    } catch (error) {
      console.error('Sign-up error:', error.message);
      Alert.alert('Sign-up Error', 'An error occurred while signing up.');
    } finally {
      setLoading(false)
    }
  };

  const [open, setOpen] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
          <ActivityIndicator size="large" color="#ffffff" style={styles.loader} /> // Show loader when loading
        ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmitForm}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            setFieldValue,
            errors,
            touched,
          }) => (
            <>
              <Text style={styles.headText}>Personal Information</Text>
              <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
              >
                <Image source={LoginImage} style={styles.imageStyle} />

                <View style={styles.containLog}>
                  {/* Other fields... */}
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

                  {/* Address */}
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

                  {/* City & State */}
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

                  {/* Date of Birth with DatePicker Modal */}
                  <TouchableOpacity style={[styles.fullTextInput]}>
                    <TextImagecustom
                      IconAdd={BirthCalender}
                      shownIcon={true}
                      Title="Date of Birth"
                      keyboardType="numeric"
                      ValueText={values.dateOfBirth || 'Select Date of Birth'}
                      error={touched.dateOfBirth && errors.dateOfBirth}
                      onClick={() => setOpen(!open)}
                    />
                  </TouchableOpacity>

                  {/* Date Picker Modal */}
                  <DatePicker
                    modal
                    open={open}
                    date={
                      values.dateOfBirth
                        ? new Date(values.dateOfBirth)
                        : new Date()
                    }
                    mode="date"
                    maximumDate={new Date()}
                    minimumDate={new Date('1900-01-01')}
                    onConfirm={date => {
                      const formattedDate = date
                        .toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })
                        .split('/')
                        .join('-');

                      setFieldValue('dateOfBirth', formattedDate);
                      setOpen(false);
                    }}
                    onCancel={() => setOpen(false)}
                  />

                  {/* Email */}
                  <TextImagecustom
                    IconAdd={EmailIcon}
                    shownIcon={true}
                    Title="Email"
                    keyboardType="email-address"
                    TextinuptStyle={styles.fullTextInput}
                    ValueText={values.email}
                    ChangeText={handleChange('email')}
                    error={touched.email && errors.email}
                  />

                  {/* Password & Confirm Password */}
                  <TextImagecustom
                    IconAdd={LockIcon}
                    shownIcon={true}
                    Title="Password"
                    keyboardType="numeric"
                    maxLength={16}
                    TextinuptStyle={styles.fullTextInput}
                    ValueText={values.password}
                    ChangeText={handleChange('password')}
                    error={touched.password && errors.password}
                  />
                  <TextImagecustom
                    IconAdd={LockIcon}
                    shownIcon={true}
                    Title="Re-enter Password"
                    keyboardType="numeric"
                    maxLength={16}
                    TextinuptStyle={styles.fullTextInput}
                    ValueText={values.confirmPassword}
                    ChangeText={handleChange('confirmPassword')}
                    error={touched.confirmPassword && errors.confirmPassword}
                  />

                  {/* Reference Code */}
                  <TextImagecustom
                    IconAdd={Exchange}
                    shownIcon={true}
                    Title="Enter Reference Code"
                    keyboardType="numeric"
                    maxLength={6}
                    TextinuptStyle={styles.fullTextInput}
                    ValueText={values.referencePassword}
                    ChangeText={handleChange('referencePassword')} // Make sure this is linked
                    error={touched.referencePassword && errors.referencePassword} // Optional error handling
                  />
                </View>

                {/* Submit Button */}
                <ButtonCustom
                  title={'Submit'}
                  onClickButton={handleSubmit}
                  colors={[Colors.themegreen, Colors.ThemelightGreen]}
                  textColor="white"
                  Buttonstyle={styles.btnStyle}
                />
              </ScrollView>
            </>
          )}
        </Formik>
       )}
    </SafeAreaView>
  );
};

export default PersonalInfo;

// Add your styles here

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
  imageStyle: {
    width: '40%',
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
    paddingHorizontal: '5%',
  },
  inputCointer: {
    width: 165,
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
    width: '90%',
    marginBottom: 100,
  },
  inputContainer: {
    width: '48%', // Adjust width for better responsiveness in 2-column layouts
  },
  fullTextInput: {
    width: '100%',
    marginBottom: 10,
  },
});
