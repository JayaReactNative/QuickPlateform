import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Text,
} from 'react-native';
import { Colors } from '../../assets/Colors';
import {
  banner, BoardbandIcon, CableTv, Challan, ElectricityIcon, GasIcon, Housing,
  InsuranceIcon, LandLine, LoanPay, Metro, Municipal, NetworkIcon, PostPaidIcon,
  RechargeIcon, TransferIcon
} from '../../assets/Images';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.containLog}>
          <Text style={styles.headText}>Hello John</Text>
          <Image source={banner} style={styles.imageStyle} />

          {/* ----------not get image */}
          <View style={styles.rowView}>
            <View style={styles.viewCard}>
              <Image source={TransferIcon} style={styles.iconStyle} />
              <Text style={styles.iconName}>Transfer</Text>
            </View>
            <View style={styles.viewCard}>
              <Image source={InsuranceIcon} style={styles.iconStyle} />
              <Text style={styles.iconName}>Insurance</Text>
            </View>
            <View style={styles.viewCard}>
              <Image source={GasIcon} style={styles.iconStyle} />
              <Text style={styles.iconName}>Gas</Text>
            </View>
          </View>

          <Text style={styles.blackText}>Recharge</Text>
          <View style={styles.rowView}>
            <View style={styles.viewCard}>
              <Image source={NetworkIcon} style={styles.iconStyle} />
              <Text style={styles.iconName}>DTH</Text>
            </View>
            <View style={styles.viewCard}>
              <Image source={RechargeIcon} style={styles.iconStyle} />
              <Text style={styles.iconName}>Recharge</Text>
            </View>
            <View style={styles.viewCard}>
              <Image source={PostPaidIcon} style={styles.iconStyle} />
              <Text style={styles.iconName}>Postpaid</Text>
            </View>
          </View>

          <Text style={styles.blackText}>Bill Payment</Text>
          <View style={styles.rowView}>
            <View style={styles.viewSmallCard}>
              <Image source={ElectricityIcon} style={styles.iconStyle} />
              <Text style={styles.iconSmallName}>Electricity</Text>
            </View>
            <View style={styles.viewSmallCard}>
              <Image source={LandLine} style={styles.iconStyle} />
              <Text style={styles.iconSmallName}>Landline</Text>
            </View>
            <View style={styles.viewSmallCard}>
              <Image source={BoardbandIcon} style={styles.iconStyle} />
              <Text style={styles.iconSmallName}>Broadband</Text>
            </View>
            <View style={styles.viewSmallCard}>
              <Image source={LoanPay} style={styles.iconStyle} />
              <Text style={styles.iconSmallName}>Loan Repay</Text>
            </View>
          </View>

          <View style={styles.rowView}>
            <Text style={styles.blackText}>Coming Soon</Text>
            <Text style={styles.blackText}>View More</Text>
          </View>
          <View style={styles.rowView}>
            <View style={styles.viewSmallCard}>
              <Image source={Housing} style={styles.iconStyle} />
              <Text style={styles.iconSmallName}>Housing</Text>
            </View>
            <View style={styles.viewSmallCard}>
              <Image source={Municipal} style={styles.iconStyle} />
              <Text style={styles.iconSmallName}>Municipal</Text>
            </View>
            <View style={styles.viewSmallCard}>
              <Image source={Metro} style={styles.iconStyle} />
              <Text style={styles.iconSmallName}>Metro</Text>
            </View>
            <View style={styles.viewSmallCard}>
              <Image source={Challan} style={styles.iconStyle} />
              <Text style={styles.iconSmallName}>Challan</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingHorizontal: 15,
  },
  headText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.themeColor,
    marginVertical: 10,
  },
  containLog: {
    paddingBottom: 20,
  },
  imageStyle: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
    borderRadius: 15,
    marginVertical: 10,
  },
  blackText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.Black,
    marginVertical: 10,
  },
  viewCard: {
    borderRadius: 20,
    backgroundColor: Colors.SkyBlue,
    padding: 10,
    width: '30%',
    alignItems: 'center',
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  viewSmallCard: {
    borderRadius: 20,
    backgroundColor: Colors.SkyBlue,
    padding: 8,
    width: '22%',
    alignItems: 'center',
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  iconStyle: {
    width: 40,
    height: 30,
    resizeMode: 'contain',
    marginVertical: 6,
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  iconName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.Black,
  },
  iconSmallName: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.Black,
  },
});
