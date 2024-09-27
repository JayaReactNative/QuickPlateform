import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  Text,
  Alert,
} from 'react-native';
import {Colors} from '../../assets/Colors';
import {ResetPass} from '../../assets/Images';
import ButtonCustom from '../../customScreen/ButtonCustom';
import { String } from '../../utility/CommonText';
import Server from '../../server/Server';
import AuthService from '../../server/AuthService';

const ChangePassword = ({navigation,route}) => {
  const {id} = route.params;
  console.log("id--->",id);
  
const[password,setPassword]=useState('')
const[confirmPass,setConfirmPass]=useState('')
const[loader,setLoader]=useState(false)

const postDatails = async()=>{
  try {
    setLoader(true)
    const dataValue ={
      authId:id,
      newPassword:password,
      confirmPassword:confirmPass
    }  
    const responeData = await AuthService.postChangePassword(dataValue)
    Alert.alert(responeData.data?.message)
    navigation.navigate('Login')
  } catch (error) {
    console.log(error)
  }
}

  return (
    <SafeAreaView style={styles.container}>
     <Text style={styles.headText}>{String.CHANGE_PASSWORD}</Text>
      <Image source={ResetPass} style={styles.imageStyle} />
      <View style={styles.containLog}>    
        <View style={styles.textHolder}>
          <TextInput
            placeholder="Enter Password"
            placeholderTextColor={Colors.HolderColor}
            keyboardType="number-pad"
            value={password}
            onChangeText={(txt)=>setPassword(txt)}
            maxLength={10}
            style={styles.textStyle}
          />
        </View>
        <View style={styles.textHolder}>
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor={Colors.HolderColor}
            keyboardType="number-pad"
            value={confirmPass}
            onChangeText={(txt)=>setConfirmPass(txt)}
            maxLength={10}
            style={styles.textStyle}
          />
        </View>
      </View>
      <ButtonCustom
        title='Update Password'
        onClickButton={() =>postDatails()}
        colors={[Colors.themegreen, Colors.ThemelightGreen]}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1.8}}
        textColor="white"
        width={350}
        Buttonstyle={styles.btnStyle}
      />
    </SafeAreaView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:Colors.White
  },
  imageStyle: {
   width:220,
   height:250,
   resizeMode:'contain',
    alignSelf: 'center',
  },
  headText: {
    fontSize: 25,
    fontWeight: '700',
    color: Colors.themeColor,
     alignSelf:'center',
     position:'absolute',
     top:34
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
  textStyle:{
    fontSize: 15,
    fontWeight: '400',
    color: Colors.Grey,
  },
  btnStyle: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignSelf: 'center',
    marginTop: 30,
  },
});


