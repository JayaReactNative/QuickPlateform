import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StatusBar,
  Animated,
} from 'react-native';
import { Colors } from '../../assets/Colors';
import { LeftArrow } from '../../assets/Images';
import Server from '../../server/Server';



const CapitalWithdrawal = ({ navigation }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [investmentData, setInvestmentData] = useState([]);
  const blinkAnim = useRef(new Animated.Value(1)).current; 

  useEffect(() => {
    getInvestmentDetail();
  }, []);

  useEffect(() => {
    if (selectedItem) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(blinkAnim, {
            toValue: 0.3,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(blinkAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [selectedItem]);

  const handleItemPress = (item) => {
    setSelectedItem(item); // Update the selected item state
  };

  const handleSubmit = () => {
    if (selectedItem) {
      console.log('Selected Item Details:', selectedItem); 
    } else {
      console.log('No item selected');
    }
  };

  const getInvestmentDetail = async () => {
    try {
      const response = await Server.getInvestmentList();
      const sortedData = response.data?.items.sort((a, b) => {
        const dateA = new Date(
          a.dateOfWithdrawal || a.dateOfWithdrawal,
        ).getTime();
        const dateB = new Date(
          b.dateOfWithdrawal || b.dateOfWithdrawal,
        ).getTime();
        return dateB - dateA;
      });
      setInvestmentData(sortedData);
    } catch (error) {
      console.log('Error', 'An error occurred fetching data ');
    }
  };


  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemPress(item)}>
      <Animated.View
        style={[
          styles.card,
          selectedItem?.id === item.id && {
            backgroundColor: Colors.SkyBlue
          },
        ]}
      >
        <View style={styles.row}>
          <Text style={[styles.cardLabel]}>Date</Text>
          <Text style={[styles.cardValue,{width:'40%'}]}> {new Date(parseInt(item.dateOfInvest))
            .getDate()
            .toString()
            .padStart(2, '0') +
            '-' +
            (new Date(parseInt(item.dateOfInvest)).getMonth() + 1)
              .toString()
              .padStart(2, '0') +
            '-' +
            new Date(parseInt(item.dateOfInvest)).getFullYear()}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.cardLabel]}>Amount</Text>
          <Text style={[styles.cardValue,{width:'40%'}]}>₹{item.amount}</Text>
        </View>
        {item.interest && (
          <View style={styles.row}>
            <Text style={[styles.cardLabel]}>Interest</Text>
            <Text style={[styles.cardValue,{width:'40%'}]}>{item.interest}</Text>
          </View>
        )}
        {item.lockingPeriod && (
          <View style={styles.row}>
            <Text style={[styles.cardLabel]}>Locking Period</Text>
            <Text style={[styles.cardValue,{width:'40%'}]}>{item.lockingPeriod}</Text>
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.themeColor} />
      {/* Header */}
      <View style={styles.appbarHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image source={LeftArrow} style={styles.backButtonText} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Capital Withdrawal Request</Text>
      </View>

      {
  (investmentData && investmentData.length > 0) 
  ? (
    <FlatList
      data={investmentData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  ) : (
    <Text style={{marginTop:15,alignSelf:'center',fontSize:16}}>No Data Available</Text>
  )
}



      {/* Submit Button */}
      <TouchableOpacity style={styles.btnStyle} onPress={handleSubmit}>
        <Text style={styles.submitText}>SUBMIT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CapitalWithdrawal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  appbarHeader: {
    width: '100%',
    backgroundColor: Colors.themeColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'flex-start',
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
  card: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 5,
    marginBottom: 12,
    borderColor: Colors.cardBorder,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 3,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 15,
    color: Colors.textColor,
    fontWeight: '600',
  },
  cardValue: {
    fontSize: 15,
    fontWeight: '400',
    color: Colors.textColor,
  },
  listContainer: {
    paddingTop: 23,
    paddingBottom: 110,
    paddingHorizontal: 13,
  },
  btnStyle: {
    width: '100%',
    backgroundColor: Colors.themeColor,
    alignItems: 'center',
    paddingVertical: 15,
    position: 'absolute',
    bottom: 0,
    zIndex: 99,
  },
  submitText: {
    color: Colors.White,
    fontSize: 16,
    fontWeight: '600',
  },
});
