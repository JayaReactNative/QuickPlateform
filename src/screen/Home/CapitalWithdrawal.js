import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Image, TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Colors } from '../../assets/Colors';
import { LeftArrow } from '../../assets/Images';

const CapitalWithdrawal = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.appbarHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={LeftArrow} style={styles.backButtonText} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Capital Withdrawal Request</Text>
        </View>


        </SafeAreaView>
  );
}

export default CapitalWithdrawal;


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F9F9F9', 
      },
    appbarHeader: {
        width:'100%',
        backgroundColor: Colors.themeColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 15,
        alignSelf:'center'
      },
      backButton: {
        justifyContent: 'center',
        alignItems:'flex-start',
      },
      backButtonText: {
        height: 20,
        width: 20,
        tintColor: Colors.White,
      },
      headerTitle: {
        color: Colors.White,
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        width: 300,
      },
})
