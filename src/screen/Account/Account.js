import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../../assets/Colors';
import LinearGradient from 'react-native-linear-gradient';
import {BirthCalender, NoImage} from '../../assets/Images';
import ImagePicker from 'react-native-image-crop-picker';
import Cameramodal from '../../customScreen/Cameramodal';
import {androidCameraPermission} from '../../utility/Permission';
import DatePicker from 'react-native-date-picker';


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
  const [state, setState] = useState('');
  const [residentAddress, setResidentAddress] = useState('');
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [cameraModal, setCameraModal] = useState(false);
  const [relation, setSelecteRealtion] = useState('Select Relation');
  const [loading, setLoading] = useState(false);
  const [adharPath, setAdharPath] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [panPath, setPanPath] = useState(null);
  const [adharTwoPath, setAdharTwoPath] = useState(null);

  const operatorList = [
    {key: 'Father'},
    {key: 'Mother'},
    {key: 'Son'},
    {key: 'Daugther'},
    {key: 'Husband'},
    {key: 'Wife'},
  ];

  const handleOperatorSelect = item => {
    setSelecteRealtion(item.key);
    setIsBottomSheetOpen(false);
  };

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

  // -------- CALENDER PICKER-------
  const onDateChange = (date) => {
    setDob(date.toISOString().split('T')[0])
    setOpen(false);
  };

 

  return (
    <LinearGradient
      colors={[Colors.themeColor, '#34AEA1']}
      style={styles.container}>
      <SafeAreaView>
        <Cameramodal
          visible={cameraModal}
          showCamera={selectCamera}
          showGallery={selectGallery}
          onClose={() => setCameraModal(false)}
        />
        <View style={styles.appbarHeader}>
          <Text style={styles.headingtTEXT}>Account</Text>
        </View>

        <ScrollView
          style={{flexGrow: 1, marginBottom: 140}}
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
                  onChange={e => setBname(e)}
                />
                <TextInput
                  placeholder="Account Number"
                  placeholderTextColor={Colors.HolderColor}
                  style={styles.borderStyle}
                  value={account}
                  onChange={e => setAccount(e)}
                />
              </View>

              <View style={styles.rowStyle}>
                <TextInput
                  placeholder="Enter IFSC Code"
                  placeholderTextColor={Colors.HolderColor}
                  style={styles.borderStyle}
                  value={ifscCode}
                  onChange={e => setIFSC(e)}
                />
                <TextInput
                  placeholder="Holder Name"
                  placeholderTextColor={Colors.HolderColor}
                  style={styles.borderStyle}
                  value={holderName}
                  onChange={e => setHolderName(e)}
                />
              </View>

              <View style={styles.rowStyle}>
                <LinearGradient
                  colors={['#0C6B72', '#34AEA1']}
                  style={styles.closeButtonOper}>
                  <TouchableOpacity>
                    <Text style={styles.closeButtonText}>Save</Text>
                  </TouchableOpacity>
                </LinearGradient>

                <LinearGradient
                  colors={['#0C6B72', '#34AEA1']}
                  style={styles.closeButtonOper}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('AccountHistory')}>
                    <Text style={styles.closeButtonText}>View Details</Text>
                  </TouchableOpacity>
                </LinearGradient>
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
                  onChangeText={setNominName}
                />
                <TouchableOpacity
                  style={[styles.borderStyle, styles.rowStyle]}
                  onPress={() => setOpen(true)}>
                  <Text style={styles.dateText}>{Dob}</Text>
                  <Image
                    source={BirthCalender}
                    style={{ height: 25, width: 25, resizeMode: 'contain' }}
                  />
                </TouchableOpacity>

                <DatePicker
                  modal
                  open={open}
                  date={Dob === 'Date of Birth' ? new Date() : new Date(Dob)}
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
                  onChange={e => setAdharNo(e)}
                />
                <TextInput
                  placeholder="Enter Pan No."
                  placeholderTextColor={Colors.HolderColor}
                  style={styles.borderStyle}
                  value={panNo}
                  onChange={e => setPanNo(e)}
                />
              </View>

              <View style={styles.rowStyle}>
                <TouchableOpacity
                  style={{borderRadius: 15, alignItems: 'center', padding: 3}}
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
                <TouchableOpacity
                  onPress={() => setIsBottomSheetOpen(!isBottomSheetOpen)}
                  style={styles.closeButtonOper}>
                  <Text
                    style={[styles.dropdownText, {color: Colors.HolderColor}]}>
                    {relation}
                  </Text>
                </TouchableOpacity>

                <LinearGradient
                  colors={['#0C6B72', '#34AEA1']}
                  style={styles.closeButtonOper}>
                  <Text style={styles.closeButtonText}>Add Nominee</Text>
                </LinearGradient>
              </View>
            </View>

            {isBottomSheetOpen && (
              <View style={styles.bottomSheetContent}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {operatorList.map(item => (
                    <TouchableOpacity
                      key={item.key}
                      style={styles.operatorItem}
                      onPress={() => handleOperatorSelect(item)}>
                      <Text style={styles.dropdownText}>{item.key}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}

            <Text style={styles.headingtTEXT}>EKYC</Text>

            <View style={styles.cardFill}>
              <Text style={styles.titleHead}>Fill all the fields</Text>
              <View style={styles.rowStyle}>
                <TextInput
                  placeholder="Enter Aadhar no."
                  placeholderTextColor={Colors.HolderColor}
                  style={styles.borderStyle}
                  value={adharNo}
                  onChange={e => setAdharNo(e)}
                />
                <TextInput
                  placeholder="Enter Pan no."
                  placeholderTextColor={Colors.HolderColor}
                  style={styles.borderStyle}
                  value={panNo}
                  onChange={e => setPanNo(e)}
                />
              </View>

              <View style={styles.rowStyle}>
                <TextInput
                  placeholder="Enter State Name"
                  placeholderTextColor={Colors.HolderColor}
                  style={styles.borderStyle}
                  value={state}
                  onChange={e => setState(e)}
                />
                <TextInput
                  placeholder="Residential Address"
                  placeholderTextColor={Colors.HolderColor}
                  style={styles.borderStyle}
                  value={residentAddress}
                  onChange={e => setResidentAddress(e)}
                />
              </View>

              <View style={styles.rowStyle}>
                <TouchableOpacity
                  style={{borderRadius: 15, alignItems: 'center', padding: 3}}
                  onPress={() => {
                    setCameraModal(true);
                    selectCamera('adharTwo');
                    selectGallery('adharTwo');
                  }}>
                  <Image
                    source={adharTwoPath ? {uri: adharTwoPath} : NoImage}
                    style={styles.imgStyle}></Image>
                </TouchableOpacity>
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
              </View>

              <View style={styles.rowStyle}>
                <TextInput
                  placeholder="What you do"
                  placeholderTextColor={Colors.HolderColor}
                  style={[
                    styles.borderStyle,
                    {paddingVertical: 10, marginTop: 13, width: '49%'},
                  ]}
                  value={residentAddress}
                  onChange={e => setResidentAddress(e)}
                />

                <LinearGradient
                  colors={['#0C6B72', '#34AEA1']}
                  style={[styles.closeButtonOper, {width: '47%'}]}>
                  <Text style={styles.closeButtonText}>Submit KYC</Text>
                </LinearGradient>
              </View>
            </View>
          </View>
        </ScrollView>
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
  },
  headingtTEXT: {
    color: Colors.White,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
  },
  mainContain: {alignSelf: 'flex-start', paddingHorizontal: 15},
  cardFill: {
    width: 350,
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
    width: '45%',
    backgroundColor: Colors.White,
  },
  closeButtonText: {
    color: Colors.White,
    fontSize: 16,
    fontWeight: '600',
  },
  imgStyle: {width: 157, height: 140, resizeMode: 'cover', borderRadius: 15},
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
    paddingVertical: 6,
    alignItems: 'center',
    borderBottomColor: Colors.LightGrey,
    borderBottomWidth: 2,
  },
});
