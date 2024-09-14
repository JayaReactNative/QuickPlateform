import React, { useEffect, useState } from 'react';
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
} from 'react-native';
import Contacts from 'react-native-contacts';
import { LeftArrow } from '../../assets/Images';
import { Colors } from '../../assets/Colors';
// import Icon from 'react-native-vector-icons/MaterialIcons';

const Recharge = ({ navigation }) => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        // Request permissions when the component mounts
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
                    }
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    Alert.alert('Permission Denied', 'You need to grant access to contacts to use this feature.');
                }
            } catch (err) {
                console.warn(err);
            }
        }
    };

    const fetchContacts = () => {
        setLoading(true);
        Contacts.getAll()
            .then((contactsList) => {
                setContacts(contactsList);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setLoading(false);
            });
    };

    const filteredContacts = contacts.filter(contact => 
        contact.givenName.toLowerCase().includes(search.toLowerCase()) ||
        contact.familyName.toLowerCase().includes(search.toLowerCase())
    );

    const renderItem = ({ item }) => (
        item.phoneNumbers.map((num, index) => (
            <View key={`${item.recordID}-${index}`} style={styles.contactItem}>
                <View style={styles.profileCircle}>
                    <Text style={styles.profileText}>{item.givenName.charAt(0).toUpperCase()}</Text>
                </View>
                <View style={styles.contactDetails}>
                    <Text style={styles.contactName}>{item.givenName} {item.familyName}</Text>
                    <Text style={styles.textTheme}>Phone ({num.label}): {num.number}</Text>
                </View>
            </View>
        ))
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    {/* <Icon name="arrow-back" size={24} color="#fff" /> */}
                    <Image source={LeftArrow} style={styles.backButtonImage} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Recharge</Text>
            </View>
            <TextInput
                style={styles.searchInput}
                placeholder="Search contacts..."
                value={search}
                onChangeText={setSearch}
            />
            {loading ? <Text>Loading...</Text> : null}
            <FlatList
                data={filteredContacts}
                renderItem={renderItem}
                keyExtractor={(item) => item.recordID}
                style={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: Colors.themeColor, // '#4CAF50'
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
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        margin: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    list: {
        marginTop: 10,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
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
    },
    textTheme: {
        fontSize: 14,
        color: '#333',
    },
    backButtonImage: {
        height: 25,
        width: 25,
        tintColor: Colors.White,
        marginTop: 10,
    },
});

export default Recharge;
