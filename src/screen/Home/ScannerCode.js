import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Colors} from '../../assets/Colors';
import LinearGradient from 'react-native-linear-gradient';
import {Downloads, LeftArrow, NewScanner, QrImage1} from '../../assets/Images';

const ScannerCode = ({navigation}) => {
  return (
    <LinearGradient colors={['#0C6B72', '#34AEA1']} style={styles.container}>
      <SafeAreaView style={{flex:1}}>
      <View style={styles.appbarHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Image source={LeftArrow} style={styles.backButtonText} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scan QR Code</Text>
        <View style={styles.backButton} />
      </View>

<ScrollView style={{flexGrow:1}}> 
      <View style={styles.modalGrey}>
        <Image source={NewScanner} style={styles.scanImage} />
        <Image source={Downloads} style={styles.downImage} />
        <Text style={[styles.textStyle]}>UPI ID: <Text style={[styles.textStyle,{fontWeight:'700'}]}>quicklyplateforms1@okaxis</Text></Text>
        <Text style={[styles.textStyle]}>Mobile: <Text style={[styles.textStyle,{fontWeight:'700'}]}>978878878787</Text></Text>
        <Text style={[styles.textStyle]}>Account No: <Text style={[styles.textStyle,{fontWeight:'700'}]}>0787776544543434</Text></Text>
        <Text style={[styles.textStyle]}>IFSC Code: <Text style={[styles.textStyle,{fontWeight:'700'}]}>YESB000043434</Text></Text>
        <Text style={[styles.textStyle]}>Bank Name: <Text style={[styles.textStyle,{fontWeight:'700'}]}>YES BANK</Text></Text>
      </View>
      <Text style={[styles.textStyle,{fontWeight:'700',marginTop:50,color:'white'}]}>Minimum Investment amount is Rs 5000/-</Text>
</ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ScannerCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appbarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  backButtonText: {
    height: 20,
    width: 20,
    tintColor: Colors.White,
  },
  headerTitle: {
    color: Colors.White,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalGrey: {
    width: '90%',
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 10,
    paddingTop: 20,
    paddingVertical: 12,
    borderRadius: 15,
    marginTop:20
  },
  scanImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  downImage: {
    marginVertical:8,
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  textStyle:{
    fontSize:13,
    color:Colors.Black,
    marginVertical:5,
    textAlign:"center"
  }
});
