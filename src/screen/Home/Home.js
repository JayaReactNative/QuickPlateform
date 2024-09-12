import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Text,
} from 'react-native';
import {Colors} from '../../assets/Colors';
import {
  banner,
  BoardbandIcon,
  CableTv,
  Challan,
  ElectricityIcon,
  GasIcon,
  Housing,
  InsuranceIcon,
  Invest,
  LandLine,
  LoanPay,
  Metro,
  MoreIcon,
  Municipal,
  NetworkIcon,
  PostPaidIcon,
  RechargeIcon,
  RightArrowGreen,
  TotalInvestImg,
  TotalProfitImg,
  TransferIcon,
  Withdrawal,
  WRemove,
} from '../../assets/Images';
import ImageSlider from '../../customScreen/ImageSlider';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.containLog}>
          <Text style={styles.headText}>Hello John</Text>
         <ImageSlider/>

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
            <Text style={styles.blackText}>Comming Soon</Text>
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

          <Text style={styles.blackText}>Favorites</Text>
          <View style={styles.rowView}>
            <View style={styles.viewCard}>
              <Image source={Invest} style={styles.iconStyle} />
              <Text style={styles.iconName}>Invest</Text>
            </View>
            <View style={styles.viewCard}>
              <Image source={Withdrawal} style={styles.iconStyle} />
              <Text style={styles.iconName}>Withdrawal</Text>
            </View>
            <View style={styles.viewCard}>
              <Image source={MoreIcon} style={styles.iconStyle} />
              <Text style={styles.iconName}>Reward</Text>
            </View>
          </View>

          <Text style={styles.blackText}>Recent</Text>
          <View style={styles.rowView}>
            <View style={styles.recentCard}>
              <Image source={TotalInvestImg} style={styles.iconRecentStyle} />
              <Text style={styles.iconRecentName}>
                Total Investment {'\n'}₹ 0
              </Text>
            </View>
            <View style={styles.recentCard}>
              <Image source={TotalProfitImg} style={styles.iconRecentStyle} />
              <Text style={styles.iconRecentName}>
                Total Profit {'\n'} ₹ 0.00
              </Text>
            </View>
          </View>

          <View style={styles.captialCard}>
            <Image source={WRemove} style={styles.iconRecentStyle} />
            <View style={{justifyContent:'space-between',alignItems:"center",flexDirection:'row',width:'70%'}}>
            <Text style={styles.blackText}>Capital Withdrawal</Text>
            <Image
              source={RightArrowGreen}
              style={{width: 30, height: 20, resizeMode: 'contain',marginTop: 15,}}
            />
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
    borderRadius: 15,
    backgroundColor: Colors.SkyBlue,
    padding: 5,
    width: 105,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  iconStyle: {
    width: 50,
    height: 30,
    resizeMode: 'contain',
    marginVertical: 6,
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  iconName: {
    fontSize: 13.5,
    fontWeight: '500',
    color: Colors.Black,
  },
  viewSmallCard: {
    borderRadius: 15,
    backgroundColor: Colors.SkyBlue,
    padding: 5,
    width: 80,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconSmallName: {
    fontSize: 11,
    fontWeight: '400',
    color: Colors.Black,
  },
  iconRecentName: {
    fontSize: 15,
    fontWeight: '400',
    color: Colors.Grey,
    textAlign: 'center',
  },
  recentCard: {
    borderRadius: 6,
    backgroundColor: Colors.White,
    padding: 5,
    width: 160,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconRecentStyle: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginVertical: 6,
  },
  captialCard: {
    flexDirection: 'row',
    marginVertical: 27,
    borderRadius: 8,
    backgroundColor: Colors.SkyBlue,
    padding: 5,
    width: 350,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
