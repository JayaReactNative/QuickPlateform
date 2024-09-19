import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
  ScrollView,
  Modal,
  LayoutAnimation,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../assets/Colors';
import {LeftArrow} from '../../assets/Images';
import BottomSheet from '@gorhom/bottom-sheet';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SelectRechargePlan = ({route, navigation}) => {
  const {contact, ind} = route.params;
  const [search, setSearch] = useState('');
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOperators, setFilteredOperators] = useState([]);
  const [selectedOperator, setSelectedOperator] = useState('Vodafone Idea(VI)');

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

  const operatorList = [
    {
      key: 'bsnl-topup',
      value: 'BSNL - TOPUP',
      image: require('../../assets/icons/user_dummy.png'),
    },
    {
      key: 'airtel',
      value: 'Airtel',
      image: require('../../assets/icons/user_dummy.png'),
    },
    {
      key: 'jio',
      value: 'Jio',
      image: require('../../assets/icons/user_dummy.png'),
    },
    {
      key: 'vodafone',
      value: 'Vodafone Idea(VI)',
      image: require('../../assets/icons/user_dummy.png'),
    },
  ];

  const [selectedPlan, setSelectedPlan] = useState(null);
  const bottomSheetRef = useRef(null);

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

  // -----OPerator item---
  const handleOperatorSelect = item => {
    setSelectedOperator(item.value);
    setIsBottomSheetOpen(false);
    LayoutAnimation.easeInEaseOut();
  };

  return (
    <LinearGradient
      colors={[Colors.themeColor, '#34AEA1']}
      style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Image source={LeftArrow} style={styles.backButtonImage} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Select Recharge Plan</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.contactItem}>
            <View style={styles.profileCircle}>
              <Text style={styles.profileText}>
                {contact.givenName.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.contactDetails}>
              <Text style={styles.contactName}>
                {contact.givenName} {contact.familyName}
              </Text>
              <Text style={styles.textTheme}>
                Phone ({contact.phoneNumbers[ind]?.label}):{' '}
                {contact.phoneNumbers[ind]?.number}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginVertical: 15,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => setIsBottomSheetOpen(true)}
              style={{
                backgroundColor: 'white',
                borderRadius: 5,
                padding: 10,
                width: '50%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                {/* Operator Text */}
                <Text
                  style={{color: Colors.Grey, fontSize: 15, fontWeight: '600'}}>
                  {selectedOperator}
                </Text>

                {/* Unicode Character */}
                <Text
                  style={{
                    color: Colors.Grey,
                    fontSize: 25,
                    fontWeight: '400',
                    marginTop: -15,
                  }}>
                  &#x2304;
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 5,
                padding: 10,
                width: '45%',
              }}>
              <Text
                style={{color: Colors.Grey, fontSize: 15, fontWeight: '300'}}>
                Karnataka
              </Text>
            </View>
          </View>

          <TextInput
            style={styles.searchInput}
            placeholder="Search plans..."
            value={search}
            onChangeText={setSearch}
            placeholderTextColor={Colors.White}
          />
          <FlatList
            data={filteredPlans}
            renderItem={renderPlanItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
          />
        </ScrollView>
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
                {operatorList.length === 0 ? (
                  <Text>No Operators Found</Text>
                ) : (
                  operatorList.map(item => (
                    <TouchableOpacity
                      key={item.key}
                      style={styles.operatorItem}
                      onPress={() => handleOperatorSelect(item)}>
                      <Image source={item.image} style={styles.dropdownImage} />
                      <Text style={styles.dropdownText}>{item.value}</Text>
                    </TouchableOpacity>
                  ))
                )}
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
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.themeColor,
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  backButton: {
    position: 'absolute',
    left: 3,
    padding: 10,
  },
  backButtonImage: {
    height: 25,
    width: 25,
    tintColor: Colors.White,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollView: {
    paddingHorizontal: 15,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: Colors.White,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.themeColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  profileText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  textTheme: {
    fontSize: 14,
    color: '#000',
  },
  searchInput: {
    height: 50,
    borderColor: '#cccccc',
    borderWidth: 1,
    marginVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 15,
    color: Colors.White,
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
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    padding: 10,
  },
  operatorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  dropdownImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
  },
  closeButtonOper: {
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SelectRechargePlan;
