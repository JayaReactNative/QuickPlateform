import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,

  SafeAreaView,
} from 'react-native';
import {Colors} from '../../assets/Colors';
import LinearGradient from 'react-native-linear-gradient';
import {
  LeftArrow,
  RewardImg,
} from '../../assets/Images';

export default function ReferAndEarn({navigation}) {
  
    return (
        <LinearGradient colors={['#0C6B72', '#34AEA1']} style={styles.container}>
            <SafeAreaView style={{flex:1}}>    
            <View style={styles.appbarHeader}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}>
                <Image source={LeftArrow} style={styles.backButtonText} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Earn by Refer</Text>
            <View style={styles.backButton} />
            </View>

            <Image source={RewardImg} style={styles.scanImage} />
            </SafeAreaView>
        </LinearGradient>
    );
}



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
      padding: 10,
      paddingVertical: 12,
      borderRadius: 7,
      marginTop: 10,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    scanImage: {
      width: 350,
      height: 160,
      alignSelf: 'center',
      marginTop: 10,
    },
    downImage: {
      marginVertical: 8,
      width: 30,
      height: 30,
      resizeMode: 'contain',
    },
    textStyle: {
      fontSize: 13,
      color: Colors.Grey,
      fontWeight: '400',
      width: 260,
    },
    textBoldStyle: {
      fontSize: 13,
      fontWeight: '600',
      color: Colors.Grey,
    },
    listContainer: {
      paddingBottom: 110,
      marginTop: 20,
    },
  });
  