import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {Colors} from '../../assets/Colors';
import LinearGradient from 'react-native-linear-gradient';
import {
  Downloads,
  LeftArrow,
  NewScanner,
  QrImage1,
  RewardImg,
} from '../../assets/Images';

const TransactionDeatail = ({navigation}) => {
  const rewardData = [
    {
      id: '1',
      reward: '10',
      reason: 'Reward',
    },
    {
      id: '2',
      reward: '100',
      reason: 'For Date: 11/09/2024, interest 0.01, Name:- Arun Kumar, added to your wallet',
    },
  ];

  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
      <View style={styles.appbarHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Image source={LeftArrow} style={styles.backButtonText} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transcation Details</Text>
        <View style={styles.backButton} />
      </View>

      <View style={{marginVertical:10,paddingLeft:20}}>
      <Text style={[styles.textBoldStyle,{fontSize:16}]}>Portfolio- History </Text>
      <Text style={[styles.textBoldStyle,{fontSize:16,marginTop:10}]}>Total Earning- ₹ 5.18 </Text>
      </View>

      <ScrollView style={{flexGrow: 1}}>
        <FlatList
          data={rewardData}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={styles.modalGrey}>
              <View style={styles.row}>
                <Text style={[styles.textBoldStyle]}>Interest: </Text>
                <Text style={[styles.textStyle]}>₹{item.reward}</Text>
              </View>
              <View style={[styles.row, {marginVertical: 5}]}>
                <Text style={[styles.textBoldStyle]}>Message: </Text>
                <Text style={[styles.textStyle]}>{item.reason}</Text>
              </View>
            </View>
          )}
        />
      </ScrollView>
    </View>
    </SafeAreaView>
  );
};

export default TransactionDeatail;

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
    backgroundColor: Colors.themeColor,
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
    width: 250,
  },
  textBoldStyle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.Grey,
  },
  listContainer: {
    paddingBottom: 110,
  },
});
