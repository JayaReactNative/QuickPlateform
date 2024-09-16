import React, {useState} from 'react';
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
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {LeftArrow} from '../../assets/Images';
import {Colors} from '../../assets/Colors';
import {Dropdown} from 'react-native-element-dropdown';
import ImageSlider from '../../customScreen/ImageSlider';
import TextInputCustom from '../../customScreen/TextInputCustom';

const DTHScreen = ({navigation}) => {
  const [selectedOperator, setSelectedOperator] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPacks, setFilteredPacks] = useState([]);

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

  const handleOperatorSelect = item => {
    setSelectedOperator(item.key);  // Update selected operator
    setModalVisible(true);
    const packageAmount = '350'; // For example, fetched amount for current package
    setAmount(packageAmount);
  };

  const handleSearch = term => {
    setSearchTerm(term);
    if (term === '') {
      setFilteredPacks([]);
    } else {
      const filtered = packsList.filter(
        pack =>
          pack.name.toLowerCase().includes(term.toLowerCase()) ||
          pack.validity.includes(term),
      );
      setFilteredPacks(filtered);
    }
  };

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
          style={{flexGrow: 1, paddingBottom: 103}}>
          <View style={styles.contentContainer}>
            <View
              style={[
                styles.imageSliderContainer,
                {height: windowHeight * 0.35},
              ]}>
              <ImageSlider />
            </View>

            <Text style={styles.label}>DTH Number</Text>
            <TextInputCustom Title={'Enter DTH Number'} />

            {/* Operator Selection using Dropdown */}
            <Text style={styles.label}>Select DTH Operator</Text>
            <Dropdown
              style={styles.dropdownContainer}
              data={operatorList}
              labelField="value"
              valueField="key"
              placeholder={selectedOperator ? operatorList.find(op => op.key === selectedOperator)?.value : 'Select DTH Operator'}  // Display selected operator's value or placeholder
              value={selectedOperator}  // Correctly bind selected value
              onChange={item => handleOperatorSelect(item)}
              renderItem={item => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleOperatorSelect(item)}>
                  <Image source={item.image} style={styles.dropdownImage} />
                  <Text style={styles.dropdownText}>{item.value}</Text>
                </TouchableOpacity>
              )}
            />

            <Text style={styles.label}>Amount</Text>
            <View style={styles.amountCart}>
              <Text style={styles.dropdownText}>{amount || 'Amount'}</Text>
              <TouchableOpacity >
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

            {/* Search Bar for Recharge Packs */}
            <TextInput
              style={styles.searchBar}
              placeholder="Search for recharge packs..."
              value={searchTerm}
              onChangeText={handleSearch}
            />
          </View>
        </ScrollView>

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
                    <Text style={[styles.detailText, {color: Colors.themeColor}]}>
                      {' '}
                      Not found
                    </Text>
                  </Text>
                  <Text style={[styles.detailText, {color: Colors.Grey}]}>
                    Name:
                    <Text style={[styles.detailText, {color: Colors.themeColor}]}>
                      {' '}
                      User Name
                    </Text>
                  </Text>
                  <Text style={[styles.detailText, {color: Colors.Grey}]}>
                    Next Due:
                    <Text style={[styles.detailText, {color: Colors.themeColor}]}>
                      {' '}
                    </Text>
                  </Text>
                  <Text style={[styles.detailText, {color: Colors.Grey}]}>
                    Status:
                    <Text style={[styles.detailText, {color: Colors.themeColor}]}>
                      {' '}
                      Active
                    </Text>
                  </Text>
                  <Text style={[styles.detailText, {color: Colors.Grey}]}>
                    Package:
                    <Text style={[styles.detailText, {color: Colors.themeColor}]}>
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
    flexGrow: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  contentContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
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
    paddingHorizontal: 10,
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
  dropdownItem: {
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
    fontWeight: '600',
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
  searchBar: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.White,
  },
  detailText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
