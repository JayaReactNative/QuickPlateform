import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {Colors} from '../../assets/Colors';
import {LeftArrow} from '../../assets/Images';
import Server from '../../server/Server';

const AccountHistory = ({navigation}) => {
  const [resData, setResData] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    setLoading(true);
    try {
      const response = await Server.postAccountHistoryDetail();
      console.log("response--->", response.data.items);
      setResData(response.data?.items || []);
    } catch (error) {
      console.log('Error', error);
    } finally {
      setLoading(false); 
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.container}>
      <View style={styles.rowView}>
        <Text style={styles.fontHeading}>Account Holder Name</Text>
        <Text style={styles.fontText}>{item.accountHolderName}</Text>
      </View>
      <View style={styles.rowView}>
        <Text style={styles.fontHeading}>Bank Name</Text>
        <Text style={styles.fontText}>{item.bankName}</Text>
      </View>
      <View style={styles.rowView}>
        <Text style={styles.fontHeading}>Account Number</Text>
        <Text style={styles.fontText}>{item.accountNumber}</Text>
      </View>
      <View style={styles.rowView}>
        <Text style={styles.fontHeading}>IFSC Code</Text>
        <Text style={styles.fontText}>{item.ifscCode}</Text>
      </View>
      <View style={styles.rowView}>
        <Text style={styles.fontHeading}>Status</Text>
        <Text style={styles.fontText}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.appbarHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Image source={LeftArrow} style={styles.backButtonText} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account History</Text>
        <View style={styles.backButton} />
      </View>
      <FlatList
        data={resData}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={<Text style={styles.emptyText}>No Account History Found</Text>}
        contentContainerStyle={{paddingBottom: 20}}
      />
    </SafeAreaView>
  );
};

export default AccountHistory;

const styles = StyleSheet.create({
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
  container: {
    marginTop: 16,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '93%',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fontHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.Grey,
  },
  fontText: {
    fontSize: 13.5,
    fontWeight: '500',
    color: Colors.Grey,
    width: '45%',
    textAlign: 'left',
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: Colors.Grey,
  },
});
