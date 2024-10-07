import React, { useState, useRef, useEffect } from 'react';
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
  UIManager,
  LayoutAnimation,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../assets/Colors';
import { LeftArrow } from '../../assets/Images';
import BottomSheet from '@gorhom/bottom-sheet';
import Server from '../../server/Server';


if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SelectRechargePlan = ({ route, navigation }) => {
  const { contact, ind } = route.params;
  const [search, setSearch] = useState('');
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOperators, setFilteredOperators] = useState([]);
  const [selectedOperator, setSelectedOperator] = useState('');
  const [stateName, setStateName] = useState('');
  const [plans, setPlans] = useState([]); // State for plans
  const [selectedPlan, setSelectedPlan] = useState(null);
  const bottomSheetRef = useRef(null);

  useEffect(() => {
    getNumberName();
  }, []);

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

  const handleViewDetails = plan => {
    setSelectedPlan(plan);
    bottomSheetRef.current?.expand();
  };

  const getNumberName = async () => {
    try {
      const data = { mobileNumber: contact.phoneNumbers[ind]?.number.replaceAll(' ', '').replaceAll('+91', '') };
      const response = await Server.getSimName(data);
      const resp = response.data?.items;
      setSelectedOperator(resp.company);
      setStateName(resp.circle);

      const planData = { opcode: resp.company };
      const planResponse = await Server.getRechargeList(data);
      const fetchedPlans = planResponse.data?.items.data.plans || [];

      
    } catch (error) {
      console.log('Error', 'An error occurred fetching data');
    }
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
       {/* Header */}
       <View style={styles.appbarHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image source={LeftArrow} style={styles.backButtonText} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Select Recharge Plan</Text>
          <View style={styles.backButton} />
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

          <View style={{
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
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <Text style={{ color: Colors.Grey, fontSize: 15, fontWeight: '600' }}>
                  {selectedOperator}
                </Text>
                <Text style={{
                  color: Colors.Grey,
                  fontSize: 25,
                  fontWeight: '400',
                  marginTop: -15,
                }}>
                  &#x2304;
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{
              backgroundColor: 'white',
              borderRadius: 5,
              padding: 10,
              width: '45%',
            }}>
              <Text numberOfLines={1}
                style={{ color: Colors.Grey, fontSize: 15, fontWeight: '300' }}>
                {stateName}
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
          {filteredPlans.length > 0 ? (
            <FlatList
              data={filteredPlans}
              renderItem={renderPlanItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.list}
            />
          ) : (
            <View>
              <Text style={{
                color: Colors.White,
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}>No plans available</Text>
            </View>
          )}
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
  appbarHeader: { 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    paddingTop:Platform.OS === "ios"?0: 45,
    backgroundColor:Colors.themeColor
  },
  backButton: {
    marginLeft: 3,
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
    shadowOffset: { width: 0, height: 2 },
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
    shadowOffset: { width: 0, height: 2 },
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

export default SelectRechargePlan;
