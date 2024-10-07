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
  Dimensions,Platform
} from 'react-native';
import {Colors} from '../../assets/Colors';
import LinearGradient from 'react-native-linear-gradient';
import {LeftArrow, RewardImg} from '../../assets/Images';

const { width, height } = Dimensions.get('window');

const Reward = ({navigation}) => {
  const rewardData = [
    {
      id: '1',
      reward: '10',
      reason: 'Reward',
    },
    {
      id: '2',
      reward: '100',
      reason: 'Refarrel No. 4356457879, Name:- Arun Kumar, Date:- 17-12-23',
    },
  ];

  return (
    <LinearGradient colors={['#0C6B72', '#34AEA1']} style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        {/* Header */}
        <View style={styles.appbarHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image source={LeftArrow} style={styles.backButtonText} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Reward List</Text>
          <View style={styles.backButton} />
        </View>

        <ScrollView style={{flexGrow: 1}}>
          <Image source={RewardImg} style={styles.scanImage} />
          {rewardData && rewardData.length > 0 ? (
            <FlatList
              data={rewardData}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <View style={styles.modalGrey}>
                  <View style={styles.row}>
                    <Text style={[styles.textBoldStyle]}>Reward: </Text>
                    <Text style={[styles.textStyle]}>₹{item.reward}</Text>
                  </View>
                  <View style={[styles.row, {marginVertical: 5}]}>
                    <Text style={[styles.textBoldStyle]}>Reason: </Text>
                    <Text style={[styles.textStyle]}>{item.reason}</Text>
                  </View>
                </View>
              )}
            />
          ) : (
            <Text style={{marginTop: 15, alignSelf: 'center', fontSize: 16}}>
              No Data Available
            </Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Reward;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    color: Colors.White,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  appbarHeader: { 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    paddingTop:Platform.OS === "ios"?0: 45,
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
    width: '93%',
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
    width:Platform.OS === "ios" ? 350:width * 1.5,
    height:Platform.OS === "ios" ? 160 :height * 0.2,
    resizeMode:'center',
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
