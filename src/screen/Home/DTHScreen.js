import React, {useRef, useState, useEffect} from 'react';
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
import Server from '../../server/Server';

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
  const [dthNumber, setDthNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOperators, setFilteredOperators] = useState([]);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const bottomSheetRef = useRef(null);
  const [operators, setOperators] = useState([]);
  const [plans, setPlans] = useState([]); // State for plans

  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    getOperators();
  }, []);

  const getOperators = async () => {
    try {
      const response = await Server.getOperators();
      const resp = response.data.items || []; // Adjust based on actual API response structure
      const formattedOperators = resp.map(op => ({
        key: op.operatorCode,
        value: op.operatorName,
        image: { uri: op.logoLink } // Load image from URL
      }));
      setOperators(formattedOperators);
      setFilteredOperators(formattedOperators);

    } catch (error) {
      console.log('Error', 'An error occurred fetching data', error);
    }
  };

  const handleOperatorSelect = async (item) => {
    setSelectedOperator(item.key);
    setIsBottomSheetOpen(false);
    LayoutAnimation.easeInEaseOut();

    // Fetch Recharge plan list
    const planData = { opcode: 'Jio' };
    const planResponse = await Server.getRechargeList(planData);
    const fetchedPlans = planResponse.data?.items.data.plans || [];
    setPlans(fetchedPlans);

    // Fetch Special/Main Recharge
    const currentPlanData = { opcode: item.key, dthNumber: dthNumber };
    const currentPlanResponse = await Server.getCurrentDTHeList(currentPlanData);
    // console.log('Current Plan Data: ', currentPlanResponse.data)
    // console.log('Message: ', currentPlanResponse.data.items.message)

    // Check if special/main recharge exists or not
    if (currentPlanResponse.data.items.message != 'No Plan Found, Try later') {
      setModalVisible(true);
      setAmount('350');
    } else {
      setAmount(fetchedPlans[0].amount);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term === '') {
      setFilteredOperators(operators);
    } else {
      const filtered = operators.filter((op) =>
        op.value.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredOperators(filtered);
    }
  };

  const openBottomSheet = () => {
    // console.log("DTH Number", dthNumber)
    if (dthNumber.length < 5) {
      console.log("Please select dth number first")
      return
    }
    setFilteredOperators(operators);
    setIsBottomSheetOpen(true);
  };

  const filteredPlans = plans.filter(plan => {
    const lowercasedSearch = search.toLowerCase();
    return (
      plan.planName.toLowerCase().includes(lowercasedSearch) ||
      plan.amount.toString().includes(lowercasedSearch) || // Assuming amount is numeric
      plan.validity.toLowerCase().includes(lowercasedSearch) ||
      plan.dataBenefit?.toLowerCase().includes(lowercasedSearch) ||
      plan.planDescription.toLowerCase().includes(lowercasedSearch)
    );
  });

  const handleViewDetails = (plan) => {
    setSelectedPlan(plan);
    bottomSheetRef.current?.expand();
  };

  const renderPlanItem = ({ item }) => (
    <View style={styles.planCard}>
      <View style={styles.planHeader}>
        <Text style={styles.planPrice}>{`₹${item.amount}`}</Text>
        <Text style={styles.planDetail}>{item.validity}</Text>
      </View>
      <View style={styles.planBody}>
        <Text style={styles.planName}>{item.planName}</Text>
        <Text style={styles.planOffer}>{item.planDescription}</Text>
        <Text style={styles.planSubscriptions}>
          SUBSCRIPTIONS: {item.subscriptions || 'N/A'}
        </Text>
        <TouchableOpacity onPress={() => handleViewDetails(item)}>
          <Text style={styles.handleViewDetails}>View Details</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.rechargeButton} onPress={() => setAmount(item.amount)}>
        <Text style={styles.buttonText}>SELECT</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient colors={['#0C6B72', '#34AEA1']} style={styles.container}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.appbarHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image source={LeftArrow} style={styles.backButtonText} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>DTH Recharge</Text>
          <View style={styles.backButton} />
        </View>

        {/* Scrollable Content */}
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} style={{ flexGrow: 1 }}>
          <View style={styles.contentContainer}>
            <View style={[styles.imageSliderContainer, { height: windowHeight * 0.35 }]}>
              <ImageSlider topView={10} ImageWidth={'93%'} />
            </View>

            <Text style={styles.label}>DTH Number</Text>
            <TextInputCustom Title={'Enter DTH Number'} ChangeText={(val) => setDthNumber(val)} />

            {/* Operator Selection */}
            <Text style={styles.label}>Select DTH Operator</Text>
            <TouchableOpacity style={styles.dropdownContainer} onPress={openBottomSheet}>
              <Text style={styles.dropdownText}>
                {selectedOperator
                  ? operators.find((op) => op.key === selectedOperator)?.value
                  : 'Select DTH Operator'}
              </Text>
            </TouchableOpacity>

            <Text style={styles.label}>Amount</Text>
            <View style={styles.amountCart}>
              <Text style={styles.dropdownText}>{amount || 'Amount'}</Text>
              <TouchableOpacity onPress={() => setChangesClick(!onChangesClick)}>
                <LinearGradient colors={['#0C6B72', '#34AEA1']} style={{ paddingVertical: 8, paddingHorizontal: 8, borderRadius: 15 }}>
                  <Text style={{ fontSize: 12, fontWeight: '600', color: Colors.White }}>Change</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Recharge PLAN ------ */}
            {onChangesClick && (
              <View>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search and select plans..."
                  value={search}
                  onChangeText={setSearch}
                  placeholderTextColor={Colors.Grey}
                />
                <FlatList
                  data={filteredPlans}
                  renderItem={renderPlanItem}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={styles.list}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            )}
          </View>
        </ScrollView>

        {/* Bottom Sheet Modal for Operator Selection */}
        <Modal animationType="slide" transparent={true} visible={isBottomSheetOpen} onRequestClose={() => setIsBottomSheetOpen(false)}>
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
                <LinearGradient colors={['#0C6B72', '#34AEA1']} style={styles.closeButtonOper}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal for DTH Information */}
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.borderModal}>
                <Text style={[styles.modalTitle, { marginBottom: 10 }]}>DTH INFORMATION</Text>

                <View style={styles.currentModal}>
                  <Text style={[styles.modalTitle, { color: Colors.White }]}>Current Pack: 335</Text>
                </View>
                <View style={{ alignSelf: 'center', marginVertical: 5 }}>
                  <LinearGradient colors={['#0C6B72', '#34AEA1']} style={styles.button}>
                    <Text style={styles.buttonText}>Recharge</Text>
                  </LinearGradient>
                </View>
              </View>

              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeModal}>
                <Text style={styles.closeModalText}>Close</Text>
              </TouchableOpacity>
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
                <Text style={styles.bottomSheetTitle}>{selectedPlan.planName}</Text>
                <Text style={styles.bottomSheetDetail}>
                  {selectedPlan.planDescription}
                </Text>
                <Text style={styles.bottomSheetDetail}>
                  Price: ₹{selectedPlan.amount}
                </Text>
                <Text style={styles.bottomSheetDetail}>
                  Validity: {selectedPlan.validity}
                </Text>
                <Text style={styles.bottomSheetDetail}>
                  Data: {selectedPlan.dataBenefit || 'N/A'}
                </Text>
                <Text style={styles.bottomSheetDetail}>
                  Subscriptions: {selectedPlan.subscriptions || 'N/A'}
                </Text>
              </View>
            )}
          </View>
        </BottomSheet>



        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => navigation.goBack('')}>
          <Text style={styles.submitText}>SUBMIT</Text>
        </TouchableOpacity>

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
    paddingTop:Platform.OS === "ios"?0: 45,
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  contentContainer: {
    alignSelf: 'center',
    // justifyContent: 'center',
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
    marginBottom: 4
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
    backgroundColor: Colors.White
  },
  list: {
    paddingBottom: 20,
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
    fontWeight: 'bold'
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
