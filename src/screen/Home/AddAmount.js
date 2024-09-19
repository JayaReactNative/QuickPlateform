import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {Colors} from '../../assets/Colors';
import {InvestGreen, LeftArrow} from '../../assets/Images';
import ButtonCustom from '../../customScreen/ButtonCustom';

const AddAmount = ({navigation}) => {
 const [amount ,setAmount]=useState('')

  return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.appbarHeader}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Image source={LeftArrow} style={styles.backButtonText} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Amount</Text>
          <View style={styles.backButton} />
        </View>
        <View style={{alignItems: 'center',marginTop:17}}>
          <Image source={InvestGreen} style={styles.dollerIcon} />
          <View style={{borderColor:Colors.themeColor,borderBottomWidth:2,
            marginBottom:4,marginTop:17
          }}>
          <TextInput
           placeholder='Enter Amount'
           placeholderTextColor={Colors.HolderColor}
           style={{width:330,marginBottom:9}}
           keyboardType='number-pad'
           value={amount}
           onChange={(text)=>setAmount(text)}
          />
          </View>
        </View>

        <ButtonCustom
                title={'Submit'}
                // onClickButton={}
                colors={[Colors.themegreen, Colors.ThemelightGreen]}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1.8}}
                textColor="white"
                width={200}
                Buttonstyle={styles.btnStyle}
              />

<Text style={styles.normalTitle}>minimum amount is rs 50/ -</Text>
      </SafeAreaView>
  );
};

export default AddAmount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  appbarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor:Colors.themeColor
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
  dollerIcon: {
    height: 80,
    width: 80,
    resizeMode: 'contain',
  },
  btnStyle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignSelf: 'center',
    marginTop: 45,
  },
  normalTitle: {
    color: Colors.themeColor,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    marginTop:7
  },
});
