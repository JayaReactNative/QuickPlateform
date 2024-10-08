import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  BackHandler,ActivityIndicator, 
} from 'react-native';
import {Colors} from '../../assets/Colors';
import {
  Add,
  BoardbandIcon,
  Challan,
  Delete,
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
  QrImage2,
  RechargeIcon,
  RightArrowGreen,
  Share,
  TotalInvestImg,
  TotalProfitImg,
  TransferIcon,
  Wallet,
  Withdrawal,
  WRemove,
} from '../../assets/Images';
import ImageSlider from '../../customScreen/ImageSlider';
import {colors} from 'react-native-swiper-flatlist/src/themes';
import LinearGradient from 'react-native-linear-gradient';
import Server from '../../server/Server';

const Home = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('Invest');
  const [totalInvestment, setTotalInvestment] = useState('');
  const [walletBalance, setWalletBalance] = useState('');
  const [ProfitBalance, setProfitBalance] = useState('');
  const [userName, setUserName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBackButtonClick = () => {
    if (navigation.isFocused()) {
      Alert.alert(
        'Exit App',
        'Do you want to exit the app?',
        [
          {text: 'Cancel', onPress: () => null, style: 'cancel'},
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ],
        {cancelable: false},
      );
      return true; // This prevents the default back action
    }
    return false;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  useEffect(() => {
    getDetail();
    getInvestment();
    getWalletDetail();
    getProfitDetail();
  }, []);

  // ------ user detail -----
  const getDetail = async () => {
    try {
      setLoading(true)
      const response = await Server.getUserDetail();
      const detailUser = response.data.items;
      setUserName(detailUser.name);
    } catch (error) {
      console.log('Error', error);
    } finally {
      setLoading(false)
    }
  };

  // ------  total investment ---
  const getInvestment = async () => {
    try {
      setLoading(true)
      const response = await Server.getTotalIvest();
      const invest = response.data?.items?.totalInvestment;
      setTotalInvestment(invest);
    } catch (error) {
      console.log('Error', 'An error occurred fetching data ');
    } finally {
      setLoading(false)
    }
  };

  // ------  total Profit ---
  const getProfitDetail = async () => {
    try {
      setLoading(true)
      const response = await Server.getProfitBalance();
      const Balance = response.data?.items?.walletBalance;
      console.log('response profit---->', Balance);
      setProfitBalance(Balance);
    } catch (error) {
      console.log('Error', 'An error occurred fetching data ');
    } finally {
      setLoading(false)
    }
  };

  // ------  total wallet ---
  const getWalletDetail = async () => {
    try {
      setLoading(true)
      const response = await Server.getWalletBalance();
      const Balance = response.data?.items?.walletBalance;
      setWalletBalance(Balance);
    } catch (error) {
      console.log('Error', 'An error occurred fetching data ');
    } finally {
      setLoading(false)
    }
  };

  return (
    <LinearGradient colors={['#0C6B72', '#34AEA1']} style={styles.container}>
      <SafeAreaView style={styles.container}>
      {loading ? (
          <ActivityIndicator size="large" color="#ffffff" style={styles.loader} /> // Show loader when loading
        ) : (
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.containLog}>
            <Text style={styles.headText}>{userName}</Text>
            <View style={{marginLeft: -3, marginTop: '5%'}}>
              <ImageSlider topView={35} ImageWidth={345} />
            </View>

            <View style={{marginVertical: 20, marginTop: '10%'}}>
              <TouchableOpacity
                style={styles.customCard}
                onPress={() => navigation.navigate('AddAmount')}>
                <Image source={Wallet} style={styles.iconStyle} />
                <Text style={[styles.iconName, {width: '50%'}]}>
                  Wallet Balance
                </Text>
                <Text style={styles.iconName}>
                  Rs {walletBalance ? walletBalance : 0}
                </Text>
                <Image source={Add} style={[styles.iconStyle, {height: 25}]} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.customCard, {marginTop: 20}]}
                onPress={() => navigation.navigate('ReferAndEarn')}>
                <Image source={TransferIcon} style={styles.iconStyle} />
                <Text style={[styles.iconName, {width: '62%'}]}>
                  Refer and Earn
                </Text>
                <Image
                  source={Share}
                  style={[styles.iconStyle, {height: 20}]}
                />
              </TouchableOpacity>
            </View>

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
              <TouchableOpacity
                style={styles.viewCard}
                onPress={() => navigation.navigate('DTHScreen')}>
                <Image source={NetworkIcon} style={styles.iconStyle} />
                <Text style={styles.iconName}>DTH</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.viewCard}
                onPress={() => navigation.navigate('Recharge')}>
                <Image source={RechargeIcon} style={styles.iconStyle} />
                <Text style={styles.iconName}>Recharge</Text>
              </TouchableOpacity>

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

            <View style={[styles.rowView, {marginTop: 0}]}>
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
              <TouchableOpacity
                style={[styles.viewCard]}
                onPress={() => {
                  setActiveTab('Invest'), setModalVisible(!modalVisible);
                }}>
                <Image source={Invest} style={[styles.iconStyle]} />
                <Text style={[styles.iconName]}>Invest</Text>
              </TouchableOpacity>

              {/* Withdrawal Tab */}
              <TouchableOpacity
                style={[styles.viewCard]}
                onPress={() => {
                  setActiveTab('Withdrawal'), navigation.navigate('Portfolio');
                }}>
                <Image source={Withdrawal} style={[styles.iconStyle]} />
                <Text style={[styles.iconName]}>Withdrawal</Text>
              </TouchableOpacity>

              {/* Reward Tab */}
              <TouchableOpacity
                style={[
                  styles.viewCard,
                  activeTab === 'Reward' && {
                    backgroundColor: Colors.themeColor,
                  },
                ]}
                onPress={() => {
                  setActiveTab('Reward'), navigation.navigate('Reward');
                }}>
                <Image
                  source={MoreIcon}
                  style={[
                    styles.iconStyle,
                    activeTab === 'Reward' && {tintColor: 'white'},
                  ]}
                />
                <Text
                  style={[
                    styles.iconName,
                    activeTab === 'Reward' && {color: 'white'},
                  ]}>
                  Reward
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.blackText}>Recent</Text>
            <View style={styles.rowView}>
              <View style={styles.recentCard}>
                <Image source={TotalInvestImg} style={styles.iconRecentStyle} />
                <Text style={styles.iconRecentName}>
                  Total Investment {'\n'}₹ {totalInvestment}
                </Text>
              </View>
              <View style={styles.recentCard}>
                <Image source={TotalProfitImg} style={styles.iconRecentStyle} />
                <Text style={styles.iconRecentName}>
                  Total Profit {'\n'} ₹{' '}
                  {ProfitBalance ? ProfitBalance.toFixed(2) : '0.00'}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.captialCard}
              onPress={() => navigation.navigate('CapitalWithdrawal')}>
              <Image source={WRemove} style={styles.iconRecentStyle} />
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: '67%',
                }}>
                <Text style={[styles.blackText, {color: Colors.Black}]}>
                  Capital Withdrawal
                </Text>
                <Image
                  source={RightArrowGreen}
                  style={{
                    width: 30,
                    height: 20,
                    resizeMode: 'contain',
                    marginTop: 15,
                  }}
                />
              </View>
            </TouchableOpacity>

            <Modal
              transparent={true}
              visible={modalVisible}
              animationType="none"
              onRequestClose={() => setModalVisible(false)}>
              <View style={styles.modalOverlay}>
                <View style={styles.modalGrey}>
                  <View style={styles.modalCart}>
                    <TouchableOpacity
                      style={{alignSelf: 'flex-end', marginTop: 7}}
                      onPress={() => setModalVisible(false)}>
                      <Image
                        source={Delete}
                        style={{width: 30, height: 23, resizeMode: 'contain'}}
                      />
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.blackText,
                        {fontWeight: '700', marginTop: 16, color: Colors.Black},
                      ]}>
                      Select Payment Mode
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('ScannerCode'),
                          setModalVisible(false);
                      }}
                      style={[
                        styles.captialCard,
                        {
                          backgroundColor: Colors.White,
                          padding: 10,
                          width: 320,
                          marginTop: 8,
                        },
                      ]}>
                      <Image
                        source={QrImage2}
                        style={{height: 50, width: 50}}
                      />
                      <View style={{marginLeft: 17}}>
                        <Text
                          style={[
                            styles.iconRecentName,
                            {color: colors.headText},
                          ]}>
                          QR Scan Payment
                        </Text>
                        <Text style={styles.iconRecentName}>
                          Quickly Platforms
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingBottom: 35,
  },
  headText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.White,
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
    color: Colors.White,
    marginTop: 15,
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
    marginVertical: 10,
  },
  iconName: {
    fontSize: 13.5,
    fontWeight: '500',
    color: Colors.Black,
  },
  viewSmallCard: {
    borderRadius: 14,
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
    shadowOpacity: 0.45,
    shadowRadius: 4.9,
    elevation: 5,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalCart: {
    width: '100%',
    backgroundColor: '#f2f2f2',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  modalGrey: {
    width: '100%',
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 10,
    paddingTop: 20,
    paddingVertical: 12,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  customCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: Colors.SkyBlue,
    padding: 5,
    width: '100%',
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
});
