import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Pressable,
} from 'react-native';
import Contacts from 'react-native-contacts';
import {LeftArrow} from '../../assets/Images';
import {Colors} from '../../assets/Colors';
import LinearGradient from 'react-native-linear-gradient';
import Server from '../../server/Server';

const Recharge = ({navigation}) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    requestPermissions().then(() => {
      fetchContacts();
    });
  }, []);



  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts Permission',
            message: 'This app needs access to your contacts.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Permission Denied',
            'You need to grant access to contacts to use this feature.',
          );
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const fetchContacts = () => {
    setLoading(true);
    Contacts.getAll()
      .then(contactsList => {
        setContacts(contactsList);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      });
  };

  const filteredContacts = contacts.filter(
    contact =>
      contact.givenName.toLowerCase().includes(search.toLowerCase()) ||
      contact.familyName.toLowerCase().includes(search.toLowerCase()),
  );

  const renderItem = ({item}) =>
    item.phoneNumbers.map((num, index) => (
      <TouchableOpacity
        key={`${item.recordID}-${index}`}
        style={styles.contactItem}
        onPress={() =>
          navigation.navigate('SelectRechargePlan', {contact: item, ind: index})
        }>
        <View style={styles.profileCircle}>
          <Text style={styles.profileText}>
            {item.givenName.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.contactDetails}>
          <Text style={styles.contactName}>
            {item.givenName} {item.familyName}
          </Text>
          <Text style={styles.textTheme}>
            Phone ({num.label}): {num.number}
          </Text>
        </View>
      </TouchableOpacity>
    ));

  const handleAddNumber = () => {
    if (phoneNumber.trim()) {
      // Create dummy contact object with the provided phone number
      const dummyContact = {
        company: 'Unknown',
        emailAddresses: [],
        familyName: '',
        givenName: 'Unknown',
        hasThumbnail: false,
        imAddresses: [],
        jobTitle: '',
        middleName: '',
        phoneNumbers: [
          {
            label: 'mobile',
            number: phoneNumber.trim(), // Use the phone number entered by the user
          },
        ],
        postalAddresses: [],
        recordID: '', // uuidv4(), // Generate a unique record ID
        thumbnailPath: '',
        urlAddresses: [],
      };

      // Redirect to next screen with the dummy contact
      navigation.navigate('SelectRechargePlan', {
        contact: dummyContact,
        ind: 0,
      });

      // Close the modal and clear the input
      setModalVisible(false);
      setPhoneNumber('');
    } else {
      Alert.alert('Validation Error', 'Please enter a phone number.');
    }
  };


 

  return (
    <LinearGradient
      colors={[Colors.themeColor, Colors.themeColor]}
      style={styles.container}>
      <SafeAreaView>
        <View style={styles.bodyContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              <Image source={LeftArrow} style={styles.backButtonImage} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Recharge</Text>
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search contacts..."
            value={search}
            onChangeText={setSearch}
            placeholderTextColor={Colors.Grey}
          />
          {loading ? <Text style={styles.loading}>Loading...</Text> : null}

          <FlatList
            data={filteredContacts}
            renderItem={renderItem}
            keyExtractor={item => item.recordID}
            contentContainerStyle={styles.list}
          />

          {/* Modal for manual number entry */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalBackground}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Enter Phone Number</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  placeholderTextColor={Colors.Black}
                  maxLength={10}
                />
                <View style={styles.modalButtons}>
                  <Pressable
                    style={styles.modalButton}
                    onPress={() => setModalVisible(false)}>
                    <Text style={styles.modalButtonText}>Cancel</Text>
                  </Pressable>
                  <Pressable
                    style={styles.modalButton}
                    onPress={handleAddNumber}>
                    <Text style={styles.modalButtonText}>Add</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>

        {/* Floating Action Button */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    alignItems: 'center',
    textAlign: 'center',
  },
  bodyContainer: {
    backgroundColor: Colors.White,
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
    left: 10,
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchInput: {
    height: 50,
    borderColor: '#cccccc',
    borderWidth: 1,
    margin: 15,
    paddingHorizontal: 10,
    borderRadius: 15,
    color: Colors.Grey,
  },
  list: {
    paddingBottom: 350,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
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
    marginBottom: 5,
    color: '#000',
  },
  textTheme: {
    fontSize: 14,
    color: '#000',
  },
  backButtonImage: {
    height: 25,
    width: 25,
    tintColor: Colors.White,
    marginTop: 10,
  },
  fab: {
    position: 'absolute',
    bottom: 170,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.themeColor,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  fabText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalInput: {
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: '100%',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: Colors.themeColor,
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Recharge;
