import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Modal,
  TextInput,
  LayoutAnimation,
  UIManager,
  Platform,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {LeftArrow} from '../../assets/Images';
import {Colors} from '../../assets/Colors';
import ImageSlider from '../../customScreen/ImageSlider';
import TextInputCustom from '../../customScreen/TextInputCustom';
import BottomSheet from '@gorhom/bottom-sheet';

// Enable LayoutAnimation for Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DTHScreen = ({navigation}) => {
  const [selectedOperator, setSelectedOperator] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [onChangesClick, setChangesClick] = useState(false);
  const [amount, setAmount] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOperators, setFilteredOperators] = useState([]);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const bottomSheetRef = useRef(null);

  const operatorList = [
    {
      key: 'tata_sky',
      value: 'Tata Sky',
      image: require('../../assets/icons/user_dummy.png'),
    },
    {
      key: 'dish_tv',
      value: 'Dish TV',
      image: require('../../assets/icons/user_dummy.png'),
    },
    {
      key: 'airtel_tv',
      value: 'Airtel Digital TV',
      image: require('../../assets/icons/user_dummy.png'),
    },
    {
      key: 'sun_direct',
      value: 'Sun Direct',
      image: require('../../assets/icons/user_dummy.png'),
    },
  ];

  const windowHeight = Dimensions.get('window').height;

  // -----OPerator item---
  const handleOperatorSelect = item => {
    setSelectedOperator(item.key);
    setIsBottomSheetOpen(false);
    setModalVisible(true);
    const packageAmount = '350'; // Example package amount
    setAmount(packageAmount);
    LayoutAnimation.easeInEaseOut();
  };

  //   ------ 1st modal --
  const handleSearch = term => {
    setSearchTerm(term);
    if (term === '') {
      setFilteredOperators(operatorList);
    } else {
      const filtered = operatorList.filter(op =>
        op.value.toLowerCase().includes(term.toLowerCase()),
      );
      setFilteredOperators(filtered);
    }
  };

  const openBottomSheet = () => {
    setFilteredOperators(operatorList);
    setIsBottomSheetOpen(true);
  };

  const [plans] = useState([
    {
      id: '1',
      name: 'Top Trending True 5G Unlimited Plans',
      price: '₹3599',
      validity: '365 Days',
      data: '2.5 GB/Day',
      subscriptions: '+1 more',
      details:
        'Top Trending True 5G Unlimited Plans with 2.5 GB/Day data and 365 Days validity.',
    },
    {
      id: '2',
      name: 'Recharge',
      price: '₹999',
      validity: '98 Days',
      data: '2 GB/Day',
      subscriptions: '+1 more',
      details: 'Recharge with 2 GB/Day data and 98 Days validity.',
    },
    {
      id: '3',
      name: 'HERO 5G',
      price: '₹899',
      validity: '90 Days',
      data: '2 GB/Day +20 GB',
      subscriptions: '+1 more',
      details:
        'HERO 5G plan with 2 GB/Day data and 20 GB extra data for 90 Days.',
    },
    {
      id: '4',
      name: 'HERO 5G',
      price: '₹349',
      validity: '28 Days',
      data: '2 GB/Day',
      subscriptions: '+1 more',
      details: 'HERO 5G plan with 2 GB/Day data for 28 Days.',
    },
    {
      id: '5',
      name: 'NETFLIX INCLUDED',
      price: '₹1299',
      validity: '84 Days',
      data: '2 GB/Day',
      subscriptions: '+2 more',
      details: 'NETFLIX INCLUDED plan with 2 GB/Day data and 84 Days validity.',
    },
    {
      id: '6',
      name: 'SONYLIV + ZEE5 INCLUDED',
      price: '₹1049',
      validity: '84 Days',
      data: '2 GB/Day',
      subscriptions: '+3 more',
      details:
        'SONYLIV + ZEE5 INCLUDED plan with 2 GB/Day data and 84 Days validity.',
    },
    {
      id: '7',
      name: '84 DAYS PRIME VIDEO',
      price: '₹1029',
      validity: '84 Days',
      data: '2 GB/Day',
      subscriptions: '+2 more',
      details:
        '84 DAYS PRIME VIDEO plan with 2 GB/Day data and 84 Days validity.',
    },
    {
      id: '8',
      name: '₹50 CASHBACK + SWIGGY ONE LITE',
      price: '₹1028',
      validity: '84 Days',
      data: '2 GB/Day',
      subscriptions: '+2 more',
      details:
        '₹50 CASHBACK + SWIGGY ONE LITE plan with 2 GB/Day data and 84 Days validity.',
    },
    {
      id: '9',
      name: '12 OTT APPS',
      price: '₹448',
      validity: '28 Days',
      data: '2 GB/Day',
      subscriptions: '+11 more',
      details: '12 OTT APPS plan with 2 GB/Day data and 28 Days validity.',
    },
    {
      id: '10',
      name: '3 MONTHS DISNEY+HOTSTAR',
      price: '₹949',
      validity: '84 Days',
      data: '2 GB/Day',
      subscriptions: '+2 more',
      details:
        '3 MONTHS DISNEY+HOTSTAR plan with 2 GB/Day data and 84 Days validity.',
    },
    {
      id: '11',
      name: 'Recharge',
      price: '₹198',
      validity: '14 Days',
      data: '2 GB/Day',
      subscriptions: '+1 more',
      details: 'Recharge with 2 GB/Day data and 14 Days validity.',
    },
  ]);

  const filteredPlans = plans.filter(plan => {
    const lowercasedSearch = search.toLowerCase();
    return (
      plan.name.toLowerCase().includes(lowercasedSearch) ||
      plan.price.toLowerCase().includes(lowercasedSearch) ||
      plan.validity.toLowerCase().includes(lowercasedSearch) ||
      plan.data.toLowerCase().includes(lowercasedSearch) ||
      plan.subscriptions.toLowerCase().includes(lowercasedSearch) ||
      plan.details.toLowerCase().includes(lowercasedSearch)
    );
  });

  const handleViewDetails = plan => {
    setSelectedPlan(plan);
    bottomSheetRef.current?.expand();
  };

  const renderPlanItem = ({item}) => (
    <View style={styles.planCard}>
      <View style={styles.planHeader}>
        <Text style={styles.planPrice}>{item.price}</Text>
        <View style={styles.planDetails}>
          <Text style={styles.planDetail}>{item.data}</Text>
          <Text style={styles.planDetail}>{item.validity}</Text>
        </View>
      </View>
      <View style={styles.planBody}>
        <Text style={styles.planName}>{item.name}</Text>
        <Text style={styles.planOffer}>{item.details}</Text>
        <Text style={styles.planSubscriptions}>
          SUBSCRIPTIONS: {item.subscriptions}
        </Text>
        <TouchableOpacity onPress={() => handleViewDetails(item)}>
          <Text style={styles.handleViewDetails}>View Details</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.rechargeButton}>
        <Text style={styles.buttonText}>Recharge</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient colors={['#0C6B72', '#34AEA1']} style={styles.container}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.appbarHeader}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Image source={LeftArrow} style={styles.backButtonText} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>DTH Recharge</Text>
          <View style={styles.backButton} />
        </View>

        {/* Scrollable Content */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          style={{flexGrow: 1}}>
          <View style={styles.contentContainer}>
            <View
              style={[
                styles.imageSliderContainer,
                {height: windowHeight * 0.35},
              ]}>
              <ImageSlider topView={25} ImageWidth={'93%'} />
            </View>

            <Text style={styles.label}>DTH Number</Text>
            <TextInputCustom Title={'Enter DTH Number'} />

            {/* Operator Selection */}
            <Text style={styles.label}>Select DTH Operator</Text>
            <TouchableOpacity
              style={styles.dropdownContainer}
              onPress={openBottomSheet}>
              <Text style={styles.dropdownText}>
                {selectedOperator
                  ? operatorList.find(op => op.key === selectedOperator)?.value
                  : 'Select DTH Operator'}
              </Text>
            </TouchableOpacity>

            <Text style={styles.label}>Amount</Text>
            <View style={styles.amountCart}>
              <Text style={styles.dropdownText}>{amount || 'Amount'}</Text>
              <TouchableOpacity
                onPress={() => setChangesClick(!onChangesClick)}>
                <LinearGradient
                  colors={['#0C6B72', '#34AEA1']}
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 8,
                    borderRadius: 15,
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '600',
                      color: Colors.White,
                    }}>
                    Change
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Recharge PLAN ------ */}

            {onChangesClick && (
              <View>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Searc and selet plans..."
                  value={search}
                  onChangeText={setSearch}
                  placeholderTextColor={Colors.Grey}
                />
                <FlatList
                  data={filteredPlans}
                  renderItem={renderPlanItem}
                  keyExtractor={item => item.id}
                  contentContainerStyle={styles.list}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            )}
          </View>
        </ScrollView>

        {/* Bottom Sheet Modal for Operator Selection */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isBottomSheetOpen}
          onRequestClose={() => setIsBottomSheetOpen(false)}>
          <View style={styles.bottomSheetOneContainer}>
            <View style={styles.bottomSheetContent}>
              {/* Search Bar */}
              <TextInput
                style={styles.searchBar}
                placeholder="Search by name..."
                value={searchTerm}
                onChangeText={handleSearch}
              />

              {/* Operator List */}
              <ScrollView showsVerticalScrollIndicator={false}>
                {filteredOperators.map(item => (
                  <TouchableOpacity
                    key={item.key}
                    style={styles.operatorItem}
                    onPress={() => handleOperatorSelect(item)}>
                    <Image source={item.image} style={styles.dropdownImage} />
                    <Text style={styles.dropdownText}>{item.value}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Close Button */}
              <TouchableOpacity onPress={() => setIsBottomSheetOpen(false)}>
                <LinearGradient
                  colors={['#0C6B72', '#34AEA1']}
                  style={styles.closeButtonOper}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal for DTH Information */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.borderModal}>
                <Text style={[styles.modalTitle, {marginBottom: 10}]}>
                  DTH INFORMATION
                </Text>

                <View style={styles.currentModal}>
                  <Text style={[styles.modalTitle, {color: Colors.White}]}>
                    Current Pack: 335
                  </Text>
                </View>
                <View style={{alignSelf: 'flex-start'}}>
                  <Text style={[styles.modalTitle, {marginVertical: 10}]}>
                    Plan Details:
                  </Text>
                  <Text style={[styles.detailText, {color: Colors.Grey}]}>
                    Balance:
                    <Text
                      style={[styles.detailText, {color: Colors.themeColor}]}>
                      {' '}
                      Not found
                    </Text>
                  </Text>
                  <Text style={[styles.detailText, {color: Colors.Grey}]}>
                    Name:
                    <Text
                      style={[styles.detailText, {color: Colors.themeColor}]}>
                      {' '}
                      User Name
                    </Text>
                  </Text>
                  <Text style={[styles.detailText, {color: Colors.Grey}]}>
                    Next Due:
                    <Text
                      style={[styles.detailText, {color: Colors.themeColor}]}>
                      {' '}
                    </Text>
                  </Text>
                  <Text style={[styles.detailText, {color: Colors.Grey}]}>
                    Status:
                    <Text
                      style={[styles.detailText, {color: Colors.themeColor}]}>
                      {' '}
                      Active
                    </Text>
                  </Text>
                  <Text style={[styles.detailText, {color: Colors.Grey}]}>
                    Package:
                    <Text
                      style={[styles.detailText, {color: Colors.themeColor}]}>
                      {' '}
                      Monthly
                    </Text>
                  </Text>
                </View>

                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <LinearGradient
                    colors={['#0C6B72', '#34AEA1']}
                    style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>Ok</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Bottom Sheet */}
        <BottomSheet
          ref={bottomSheetRef}
          index={-1} // Initially closed
          snapPoints={['40%']} // Height of the bottom sheet
          enablePanDownToClose={true}>
          <View style={styles.bottomSheetContainer}>
            {selectedPlan && (
              <View>
                <Text style={styles.bottomSheetTitle}>{selectedPlan.name}</Text>
                <Text style={styles.bottomSheetDetail}>
                  {selectedPlan.details}
                </Text>
                <Text style={styles.bottomSheetDetail}>
                  Price: {selectedPlan.price}
                </Text>
                <Text style={styles.bottomSheetDetail}>
                  Validity: {selectedPlan.validity}
                </Text>
                <Text style={styles.bottomSheetDetail}>
                  Data: {selectedPlan.data}
                </Text>
                <Text style={styles.bottomSheetDetail}>
                  Subscriptions: {selectedPlan.subscriptions}
                </Text>
              </View>
            )}
          </View>
        </BottomSheet>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => navigation.goBack('')}>
          <Text style={styles.submitText}>SUBMIT</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default DTHScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButtonText: {
    height: 20,
    width: 20,
    tintColor: Colors.White,
  },
  backButton: {
    width: 30,
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
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  contentContainer: {
    alignSelf: 'center',
  },
  imageSliderContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.White,
    marginTop: 10,
  },
  dropdownContainer: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.Black,
  },
  amountCart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  //   ------ modal 1st
  bottomSheetOneContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomSheetContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '60%',
  },
  searchBar: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  operatorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  dropdownImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  closeButtonOper: {
    marginTop: 15,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: Colors.White,
    fontSize: 16,
    fontWeight: '600',
  },

  //   ------ Modal 2nd -----
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 3,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.themeColor,
  },
  packText: {
    fontSize: 16,
    marginVertical: 10,
  },
  closeButton: {
    width: 160,
    marginTop: 70,
    padding: 10,
    borderRadius: 18,
    paddingVertical: 10,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  borderModal: {
    borderRadius: 6,
    borderWidth: 3,
    borderColor: Colors.themeColor,
    padding: 20,
    alignItems: 'center',
  },
  currentModal: {
    width: 300,
    marginTop: 20,
    padding: 10,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: Colors.themeColor,
  },
  detailText: {
    fontSize: 16.5,
    fontWeight: '700',
    marginBottom: 4,
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

  //   -------recharge plan----

  searchInput: {
    height: 50,
    borderColor: '#cccccc',
    borderWidth: 1,
    marginVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 15,
    color: Colors.Black,
    backgroundColor: Colors.White,
  },
  list: {
    paddingBottom: 40,
  },
  planCard: {
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 10,
    marginBottom: 10,
  },
  planPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.themeColor,
  },
  planDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  planDetail: {
    fontSize: 14,
    color: Colors.themeColor,
    fontWeight: 'bold',
  },
  planBody: {
    flexDirection: 'column',
  },
  planName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  planOffer: {
    fontSize: 14,
    color: '#666',
  },
  planSubscriptions: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  handleViewDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    fontWeight: 'bold',
  },
  rechargeButton: {
    marginTop: 15,
    backgroundColor: Colors.themeColor,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomSheetContainer: {
    padding: 20,
    backgroundColor: Colors.White,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  bottomSheetDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
});
