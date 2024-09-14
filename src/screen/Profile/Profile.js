import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, SafeAreaView } from 'react-native';
import { CustomerReview, DownArrow, FaqImage, FaqQuestion, Logout, Privacy, ProfileIcon, ReferredImg, SupportImg, UpArrow } from '../../assets/Images';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../assets/Colors';

const userData = {
  "name": "Mr. Dhruv Soni",
  "email": "dhruv@gmail.com",
  "mobile": "200022342",
  "dob": "10-09-2023",
  "transactions": [
    { "id": "1", "amount": "$100", "date": "2024-09-01" },
    { "id": "2", "amount": "$50", "date": "2024-09-10" }
  ]
};
const Profile = ({ navigation }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(userData);
  }, []);

  const toggleExpand = () => setIsExpanded(prevState => !prevState);

  if (!user) {
    return <Text>Loading...</Text>; 
  }

  return (
    <LinearGradient colors={['#0C6B72', '#34AEA1']} style={styles.container}>
      <SafeAreaView>   
      <ScrollView contentContainerStyle={{flexGrow:1,paddingBottom:85,marginTop:15}} showsVerticalScrollIndicator={false}>
        <View style={styles.box}>
          <Image source={ProfileIcon} style={styles.iconStyle} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignItems: 'center' }}>
            <Text style={styles.subtitle}>My Profile</Text>
            <TouchableOpacity onPress={toggleExpand}>
              <Image source={isExpanded ? UpArrow : DownArrow} style={styles.iconStyle} />
            </TouchableOpacity>
          </View>
        </View>

        {isExpanded && (
          <View style={styles.box2}>
            <Text style={[styles.text,{fontWeight:'600',fontSize:16}]}>Name:- {user.name}</Text>
            <Text style={styles.text}>Email:- {user.email}</Text>
            <Text style={styles.text}>Mobile:-{user.mobile}</Text>
            <Text style={styles.text}>D.O.B.- {user.dob}</Text>
          </View>
        )}

        <TouchableOpacity style={styles.box}>
          <Image source={ProfileIcon} style={styles.iconStyle} />
          <Text style={styles.subtitle}>Transaction History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Faq')}>
          <Image source={FaqQuestion} style={styles.iconStyle} />
          <Text style={styles.subtitle}>FAQ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box}>
          <Image source={ReferredImg} style={styles.iconStyle} />
          <Text style={styles.subtitle}>Referred</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('TermsAndCondition')}>
          <Image source={ProfileIcon} style={styles.iconStyle} />
          <Text style={styles.subtitle}>Terms and Conditions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box}>
          <Image source={Privacy} style={styles.iconStyle} />
          <Text style={styles.subtitle}>Privacy and Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box}>
          <Image source={CustomerReview} style={styles.iconStyle} />
          <Text style={styles.subtitle}>Rate Us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('HelpAndSupport')}>
          <Image source={SupportImg} style={styles.iconStyle} />
          <Text style={styles.subtitle}>Help and Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box}>
          <Image source={Logout} style={styles.iconStyle} />
          <Text style={styles.subtitle}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 6,
    paddingTop: 15,
  },
  box: {
    borderRadius: 10,
    padding: 8,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  box2: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 8,
    marginVertical: 7,
    marginHorizontal: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 15,
    fontWeight:'600',
    color: '#fff',
  },
  text: {
    fontSize: 14,
    color:Colors.Grey,
    marginVertical: 4,
  },
  arrow: {
    fontSize: 20,
    color: '#333',
    marginTop: 8,
  },
  iconStyle: {
    width: 30,
    height: 25,
    resizeMode: 'contain',
    marginVertical: 6,
    marginRight: 17,
    tintColor:'#fff'
  },
});


export default Profile;