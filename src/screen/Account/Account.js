import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
} from 'react-native';
import {Colors} from '../../assets/Colors';
import LinearGradient from 'react-native-linear-gradient';
import {BirthCalender, NoImage} from '../../assets/Images';
import ImagePicker from 'react-native-image-crop-picker';
import Cameramodal from '../../customScreen/Cameramodal';
import {androidCameraPermission} from '../../utility/Permission';
import DatePicker from 'react-native-date-picker';
import Server from '../../server/Server';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage';
import RelationPickerDialog from './RelationPickerDialog';

const {width, height} = Dimensions.get('window');

const Account = ({navigation}) => {
  const [bName, setBname] = useState('');
  const [account, setAccount] = useState('');
  const [ifscCode, setIFSC] = useState('');
  const [holderName, setHolderName] = useState('');
  const [nominName, setNominName] = useState('');
  const [Dob, setDob] = useState('Select Date of Birth');
  const [open, setOpen] = useState(false);
  const [adharNo, setAdharNo] = useState('');
  const [panNo, setPanNo] = useState('');
  const [adharKycNo, setAdharKycNo] = useState('');
  const [panKycNo, setPanKycNo] = useState('');
  const [state, setState] = useState('');
  const [residentAddress, setResidentAddress] = useState('');
  const [profession, setProfession] = useState('');
  const [cameraModal, setCameraModal] = useState(false);
  const [relation, setSelecteRealtion] = useState('');
  const [loading, setLoading] = useState(false);
  const [adharPath, setAdharPath] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [panPath, setPanPath] = useState(null);
  const [adharTwoPath, setAdharTwoPath] = useState(null);
  const [updateBtn, setUpdateBtn] = useState(false);
  const [showNomineeBtn, setShowNomineBtn] = useState(false);
  const [showSubmitBtn, setShowSubmitBtn] = useState(false);

  const operatorList = [
    {key: 'Father', value: 'Father'},
    {key: 'Mother', value: 'Mother'},
    {key: 'Son', value: 'Son'},
    {key: 'Daughter', value: 'Daughter'},
    {key: 'Husband', value: 'Husband'},
    {key: 'Wife', value: 'Wife'},
  ];

  // ---------Camera picker -----
  const selectCamera = async field => {
    setLoading(true);
    const permission = await androidCameraPermission();
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      updateImagePath(field, image.path);
      setCameraModal(false);
      setLoading(false);
    });
  };

  const selectGallery = async field => {
    setLoading(true);
    const permission = await androidCameraPermission();
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log('image path from gallery:', image.path);
      updateImagePath(field, image.path);
      setCameraModal(false);
      setLoading(false);
    });
  };

  const updateImagePath = (field, path) => {
    switch (field) {
      case 'adhar':
        setAdharPath(path);
        break;
      case 'adharTwo':
        setAdharTwoPath(path);
        break;
      case 'pan':
        setPanPath(path);
        break;
      case 'image':
        setImagePath(path);
        break;
      default:
        break;
    }
  };

  // -------- CALENDAR PICKER-------
  const onDateChange = date => {
    setOpen(false);
    setDob(date.toISOString().split('T')[0]);
  };

  useEffect(() => {
    getAccountDetail();
    getNomineDetail();
    getKycDetail();
  }, []);

  // ------ user detail -----
  const bankDetail = async () => {
    try {
      setLoading(true);
      const Id = await AsyncStorage.getItem('authId');
      const data = {
        userId: Id,
        accountHolderName: holderName,
        bankName: bName,
        accountNumber: account,
        ifscCode: ifscCode,
      };
      const response = await Server.postAccountDetail(data);
      const detailUser = response.data;
      console.log('account data----->', detailUser);
    } catch (error) {
      console.log('Error', error);
    } finally {
      setLoading(false);
    }
  };

  const getAccountDetail = async () => {
    try {
      setLoading(true);
      const response = await Server.getAccountDetail();
      const data = response.data?.items;
      setBname(data.bankName);
      setAccount(data.accountNumber);
      setIFSC(data.ifscCode);
      setHolderName(data.accountHolderName);
      if (response.data.message === 'Account Details') {
        setUpdateBtn(true);
      }
    } catch (error) {
      console.log('Error', error);
    } finally {
      setLoading(false);
    }
  };

  // ------ Edit user detail -----
  const updateAccountDetail = async () => {
    try {
      setLoading(true);
      const Id = await AsyncStorage.getItem('authId');
      const data = {
        userId: Id,
        accountHolderName: holderName,
        bankName: bName,
        accountNumber: account,
        ifscCode: ifscCode,
      };
      const response = await Server.postUpdateAccountDetail(data);
      const detailUser = response.data;
      getAccountDetail();
      Alert.alert(detailUser.message);
    } catch (error) {
      console.log('Error', error);
    } finally {
      setLoading(false);
    }
  };

  // ------ Upload images to Firebase Storage -----
  const uploadImage = async (path, fieldName) => {
    const reference = storage().ref(fieldName + '/' + Date.now() + '.jpg');
    const task = reference.putFile(path);

    try {
      await task;
      const url = await reference.getDownloadURL();
      console.log(`Image uploaded to Firebase at: ${url}`);
      return url;
    } catch (e) {
      console.error('Upload failed: ', e);
    }
  };

  // ------ Submit Nominee Details -----
  const submitNomineeDetails = async () => {
    try {
      setLoading(true);
      const Id = await AsyncStorage.getItem('authId');
      const adharFrontImgUrl = await uploadImage(adharPath, 'aadhaarFront');
      const panImgUrl = await uploadImage(panPath, 'panFornt');

      const data = {
        userId: Id,
        nomineeName: nominName,
        nomineeRelation: relation,
        aadhaarNumber: adharNo,
        aadhaarFrontImg: adharFrontImgUrl,
        aadhaarBackImg: panImgUrl,
        panNumber: panNo,
        dob: Dob,
      };
      const response = await Server.postNomineDetail(data);
      Alert.alert(response.data.message);
      setShowNomineBtn(true);
    } catch (error) {
      console.error('Error submitting nominee details:', error);
    } finally {
      setLoading(false);
    }
  };

  const getNomineDetail = async () => {
    try {
      setLoading(true);
      const response = await Server.getNomineeList();
      const data = response.data?.items;

      if (data) {
        setNominName(data?.nomineeName);
        setDob(data?.dob);
        setAdharNo(data?.aadhaarNumber);
        setPanNo(data?.panNumber);
        setAdharPath(data?.aadhaarFrontImg);
        setPanPath(data?.aadhaarBackImg);

        const relation = operatorList.find(
          item => item.key === data?.nomineeRelation,
        );
        setSelecteRealtion(relation.value);

        if (response.data.message === 'Account Details') {
          setUpdateBtn(true);
        }
      }
    } catch (error) {
      console.log('Error', error);
    } finally {
      setLoading(false);
    }
  };

  // -------- Kyc detail ----
  const submitKycDetails = async () => {
    try {
      setLoading(true);
      const Id = await AsyncStorage.getItem('authId');
      const adharFrontImgUrl = await uploadImage(adharTwoPath, 'aadhaarFront');
      const panImgUrl = await uploadImage(imagePath, 'panFornt');

      const data = {
        userId: Id,
        address: residentAddress,
        aadhaarNumber: adharKycNo,
        aadhaarFrontImg: adharFrontImgUrl,
        aadhaarBackImg: panImgUrl,
        panNumber: panKycNo,
        whatYouDo: profession,
        state: state,
        city: 'city',
      };
      const response = await Server.postKycDetail(data);
      Alert.alert(response.data.message);
      setShowSubmitBtn(true);
    } catch (error) {
      console.error('Error submitting nominee details:', error);
    } finally {
      setLoading(false);
    }
  };

  const getKycDetail = async () => {
    try {
      setLoading(true);
      const response = await Server.getKycList();
      const data = response.data?.items;

      if (data) {
        setAdharKycNo(data?.aadhaarNumber);
        setPanKycNo(data?.panNumber);
        setAdharTwoPath(data?.aadhaarFrontImg);
        setImagePath(data?.aadhaarBackImg);
        setState(data?.state);
        setResidentAddress(data?.address);
        setProfession(data?.whatYouDo);
        const relation = operatorList.find(
          item => item.key === data?.nomineeRelation,
        );
        setSelecteRealtion(relation.value);

        if (response.data.message === 'Account Details') {
          setUpdateBtn(false);
        }
      }
    } catch (error) {
      console.log('Error --123', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[Colors.themeColor, '#34AEA1']}
      style={styles.container}>
      <SafeAreaView>
        <KeyboardAvoidingView
          // style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 100}>
          <Cameramodal
            visible={cameraModal}
            showCamera={selectCamera}
            showGallery={selectGallery}
            onClose={() => setCameraModal(false)}
          />
          {/* Header */}
          <View style={styles.appbarHeader}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              {/* <Image source={LeftArrow} style={styles.backButtonText} /> */}
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Account</Text>
            <View style={styles.backButton} />
          </View>

          <ScrollView
            style={{
              flexGrow: 1,
              marginBottom: Platform.OS == 'ios' ? 140 : height * 0.1,
            }}
            showsVerticalScrollIndicator={false}>
            <View style={styles.mainContain}>
              <Text style={styles.headingtTEXT}>Manage Bank</Text>

              <View style={styles.cardFill}>
                <Text style={styles.titleHead}>Fill all the fields</Text>
                <View style={styles.rowStyle}>
                  <TextInput
                    placeholder="Bank Name"
                    placeholderTextColor={Colors.HolderColor}
                    style={styles.borderStyle}
                    value={bName}
                    onChangeText={text => setBname(text)}
                  />

                  <TextInput
                    placeholder="Account Number"
                    placeholderTextColor={Colors.HolderColor}
                    style={styles.borderStyle}
                    value={account}
                    maxLength={16}
                    onChangeText={text => setAccount(text)}
                  />
                </View>

                <View style={styles.rowStyle}>
                  <TextInput
                    placeholder="Enter IFSC Code"
                    placeholderTextColor={Colors.HolderColor}
                    style={styles.borderStyle}
                    maxLength={11}
                    value={ifscCode}
                    onChangeText={text => setIFSC(text)}
                  />
                  <TextInput
                    placeholder="Holder Name"
                    placeholderTextColor={Colors.HolderColor}
                    style={styles.borderStyle}
                    value={holderName}
                    onChangeText={text => setHolderName(text)}
                  />
                </View>

                <View style={styles.rowStyle}>
                  <TouchableOpacity
                    onPress={() => {
                      updateBtn ? updateAccountDetail() : bankDetail();
                    }}
                    style={{width: '48%'}}>
                    <LinearGradient
                      colors={['#0C6B72', '#34AEA1']}
                      style={[styles.closeButtonOper]}>
                      <Text style={styles.closeButtonText}>
                        {updateBtn ? 'Edit' : 'Save'}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{width: '48%'}}
                    onPress={() => navigation.navigate('AccountHistory')}>
                    <LinearGradient
                      colors={['#0C6B72', '#34AEA1']}
                      style={[styles.closeButtonOper]}>
                      <Text style={styles.closeButtonText}>
                        Account Details
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.headingtTEXT}>Add Nomine</Text>

              <View style={styles.cardFill}>
                <Text style={styles.titleHead}>Fill all the fields</Text>
                <View style={styles.rowStyle}>
                  <TextInput
                    placeholder="Enter Nominee Name"
                    placeholderTextColor={Colors.HolderColor}
                    style={styles.borderStyle}
                    value={nominName}
                    onChangeText={text => setNominName(text)}
                  />
                  <TouchableOpacity
                    style={[
                      styles.borderStyle,
                      styles.rowStyle,
                      {marginTop: 0},
                    ]}
                    onPress={() => setOpen(true)}>
                    <Text
                      numberOfLines={1}
                      style={[styles.dateText, {width: '80%'}]}>
                      {Dob}
                    </Text>
                    <Image
                      source={BirthCalender}
                      style={{height: 18.5, width: 18.5, resizeMode: 'contain'}}
                    />
                  </TouchableOpacity>

                  <DatePicker
                    modal
                    open={open}
                    date={
                      Dob === 'Select Date of Birth'
                        ? new Date()
                        : new Date(Dob)
                    }
                    mode="date"
                    maximumDate={new Date()}
                    minimumDate={new Date('1900-01-01')}
                    onConfirm={onDateChange}
                    onCancel={() => setOpen(false)}
                  />
                </View>

                <View style={styles.rowStyle}>
                  <TextInput
                    placeholder="Enter Aadhar no."
                    placeholderTextColor={Colors.HolderColor}
                    style={styles.borderStyle}
                    value={adharNo}
                    onChangeText={text => setAdharNo(text)}
                  />
                  <TextInput
                    placeholder="Enter Pan No."
                    placeholderTextColor={Colors.HolderColor}
                    style={styles.borderStyle}
                    value={panNo}
                    onChangeText={text => setPanNo(text)}
                  />
                </View>

                <View style={[styles.rowStyle, {width: '96%'}]}>
                  <TouchableOpacity
                    style={{borderRadius: 15, alignItems: 'center'}}
                    onPress={() => {
                      setCameraModal(true);
                      selectCamera('adhar');
                      selectGallery('adhar');
                    }}>
                    <Image
                      source={adharPath ? {uri: adharPath} : NoImage}
                      style={styles.imgStyle}></Image>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setCameraModal(true);
                      selectCamera('pan');
                      selectGallery('pan');
                    }}>
                    <Image
                      source={panPath ? {uri: panPath} : NoImage}
                      style={styles.imgStyle}></Image>
                  </TouchableOpacity>
                </View>
                <View style={styles.rowStyle}>
                  <RelationPickerDialog
                    data={operatorList}
                    selected={relation}
                    setSelected={setSelecteRealtion}
                  />
                  {showNomineeBtn && (
                    <TouchableOpacity onPress={() => submitNomineeDetails()}>
                      <LinearGradient
                        colors={['#0C6B72', '#34AEA1']}
                        style={[
                          styles.closeButtonOper,
                          {width: 150, marginTop: 2},
                        ]}>
                        <Text style={styles.closeButtonText}>Add Nomine</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <Text style={styles.headingtTEXT}>EKYC</Text>

              <View
                style={[
                  styles.cardFill,
                  {
                    marginBottom:
                      Platform.OS == 'ios' ? height * 0.5 : height * 0.25,
                  },
                ]}>
                <Text style={styles.titleHead}>Fill all the fields</Text>
                <View style={styles.rowStyle}>
                  {showSubmitBtn ? (
                    <TextInput
                      placeholder="Enter Aadhar no."
                      placeholderTextColor={Colors.HolderColor}
                      style={styles.borderStyle}
                      value={adharKycNo}
                      onChangeText={txt => setAdharKycNo(txt)}
                    />
                  ) : (
                    <Text style={styles.borderStyle}>{adharKycNo}</Text>
                  )}
                  {showSubmitBtn ? (
                    <TextInput
                      placeholder="Enter Pan no."
                      placeholderTextColor={Colors.HolderColor}
                      style={styles.borderStyle}
                      value={panKycNo}
                      onChangeText={txt => setPanKycNo(txt)}
                    />
                  ) : (
                    <Text style={styles.borderStyle}>{panKycNo}</Text>
                  )}
                </View>

                <View style={styles.rowStyle}>
                {showSubmitBtn ? (<TextInput
                    placeholder="Enter State Name"
                    placeholderTextColor={Colors.HolderColor}
                    style={styles.borderStyle}
                    value={state}
                    onChangeText={txt => setState(txt)}
                  />)
                  :( <Text style={styles.borderStyle}>{panKycNo}</Text>)}
                  <TextInput
                    placeholder="Residential Address"
                    placeholderTextColor={Colors.HolderColor}
                    style={styles.borderStyle}
                    value={residentAddress}
                    onChangeText={txt => setResidentAddress(txt)}
                  />
                </View>

                <View style={[styles.rowStyle, {width: '95%'}]}>
                  {showSubmitBtn ? (
                    <TouchableOpacity
                      style={{borderRadius: 15, alignItems: 'center'}}
                      onPress={() => {
                        setCameraModal(true);
                        selectCamera('adharTwo');
                        selectGallery('adharTwo');
                      }}>
                      <Image
                        source={adharTwoPath ? {uri: adharTwoPath} : NoImage}
                        style={styles.imgStyle}></Image>
                    </TouchableOpacity>
                  ) : (
                    <View
                      style={{borderRadius: 15, alignItems: 'center'}}
                      onPress={() => {
                        setCameraModal(true);
                        selectCamera('adharTwo');
                        selectGallery('adharTwo');
                      }}>
                      <Image
                        source={adharTwoPath ? {uri: adharTwoPath} : NoImage}
                        style={styles.imgStyle}></Image>
                    </View>
                  )}

                  {showSubmitBtn ? (
                    <TouchableOpacity
                      onPress={() => {
                        setCameraModal(true);
                        selectCamera('image');
                        selectGallery('image');
                      }}>
                      <Image
                        source={imagePath ? {uri: imagePath} : NoImage}
                        style={styles.imgStyle}></Image>
                    </TouchableOpacity>
                  ) : (
                    <View>
                      <Image
                        source={imagePath ? {uri: imagePath} : NoImage}
                        style={styles.imgStyle}></Image>
                    </View>
                  )}
                </View>

                <View style={styles.rowStyle}>
                  {showSubmitBtn ? (
                    <TextInput
                      placeholder="What you do"
                      placeholderTextColor={Colors.HolderColor}
                      style={[
                        styles.borderStyle,
                        {paddingVertical: 10, marginTop: 13, width: '49%'},
                      ]}
                      value={profession}
                      onChangeText={txt => setProfession(txt)}
                    />
                  ) : (
                    <Text
                      style={[
                        styles.borderStyle,
                        {paddingVertical: 10, marginTop: 13, width: '49%'},
                      ]}>
                      {profession}
                    </Text>
                  )}

                  {showSubmitBtn && (
                    <TouchableOpacity onPress={() => submitKycDetails()}>
                      <LinearGradient
                        colors={['#0C6B72', '#34AEA1']}
                        style={[
                          styles.closeButtonOper,
                          {width: 150, marginTop: 14},
                        ]}>
                        <Text style={styles.closeButtonText}>Submit KYC</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appbarHeader: {
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 0 : 45,
    // backgroundColor:Colors.themeColor
  },
  headerTitle: {
    color: Colors.White,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  headingtTEXT: {
    color: Colors.White,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
  },
  mainContain: {alignSelf: 'flex-start', paddingHorizontal: 15},
  cardFill: {
    width: Platform.OS == 'ios' ? width * 0.9 : width * 0.93,
    backgroundColor: Colors.SkyBlue,
    borderRadius: 10,
    padding: 10,
    marginVertical: 20,
  },
  titleHead: {
    color: Colors.Black,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'left',
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    alignItems: 'center',
  },
  borderStyle: {
    borderColor: Colors.LightGrey,
    borderWidth: 1,
    borderRadius: 7,
    width: '48%',
    padding: 6,
    fontSize: 15,
    fontWeight: '500',
    color: Colors.Black,
    marginRight: 5,
    backgroundColor: 'white',
  },
  closeButtonOper: {
    marginTop: 15,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: Colors.White,
  },
  closeButtonText: {
    color: Colors.White,
    fontSize: 16,
    fontWeight: '600',
  },
  imgStyle: {width: 163, height: 140, resizeMode: 'cover', borderRadius: 15},
  bottomSheetContent: {
    width: 150,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    maxHeight: '17%',
    marginTop: -15,
    marginBottom: 7,
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.Black,
  },
  operatorItem: {
    paddingVertical: 8,
    alignItems: 'center',
    borderBottomColor: Colors.LightGrey,
    borderBottomWidth: 2,
    backgroundColor: Colors.SkyBlue,
  },
  dropdownListStyle: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: Colors.SkyBlue,
    padding: 5,
    maxHeight: 200,
  },
});
