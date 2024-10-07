import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Image, TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { FaqBanner, LeftArrow } from '../../assets/Images';
import { Colors } from '../../assets/Colors';
import LinearGradient from 'react-native-linear-gradient';

const faqs = [
  { question: 'What is crowdfunding?', answer: 'Crowdfunding is a way of raising money to finance projects by collecting small contributions from a large number of people. This method democratizes the funding process and allows innovators to get support from a broad audience.' },
  { question: 'How does it work?', answer: 'Typically, you present your idea or project on a crowdfunding platform. People can then pledge money to support your project. In return, you might offer them rewards or equity, depending on the type of crowdfunding.' },
  { question: 'What types of crowdfunding are there?', answer: 'There are several types, including donation-based (for charity), reward-based (for perks), equity-based (for shares in the company), and debt-based (for loans to be repaid with interest).' },
  { question: 'Are there any fees involved?', answer: 'Most crowdfunding platforms charge a fee, which is usually a percentage of the funds raised. This fee covers the platform’s operational costs and services. Make sure to read the platform’s fee structure carefully before starting your campaign.' },
  { question: 'How can I start a crowdfunding campaign?', answer: 'To start, choose a crowdfunding platform that suits your needs. Create a compelling campaign page with detailed information about your project, set a clear funding goal, and promote your campaign through social media, email, and other channels to attract backers.' },
];


const Faq = ({ navigation }) => {
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (

    <LinearGradient colors={[Colors.themeColor, '#34AEA1']} style={styles.container}>

      <SafeAreaView >
        {/* Header */}
        <View style={styles.appbarHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image source={LeftArrow} style={styles.backButtonText} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>FAQ</Text>
          <View style={styles.backButton} />
        </View>
        
        <ScrollView contentContainerStyle={styles.bodyContainer}>
          <View style={styles.bannerContainer}>
            <Image source={FaqBanner} style={styles.bannerImage} />
          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Frequently Asked Questions</Text>
          </View>
          <View style={styles.faqContainer}>
            {faqs.map((faq, index) => (
              <View key={index} style={styles.faqItem}>
                <TouchableOpacity onPress={() => toggleExpand(index)} style={styles.questionContainer}>
                  <Text style={styles.question}>{faq.question}</Text>
                </TouchableOpacity>
                {expanded === index && <Text style={styles.answer}>{faq.answer}</Text>}
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // padding: 16,
    // backgroundColor: '#F9F9F9', 
    paddingTop: 30,
  },

  bodyContainer: {
    flexGrow: 1,
    padding: 16,
    // backgroundColor: '#F9F9F9', 
    paddingTop: 30,
  },
  bannerContainer: {
    marginBottom: 20,
  },
  bannerImage: {
    width: '100%',
    height: 100,
    borderRadius: 12, 
    overflow: 'hidden',
    resizeMode: 'cover',
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  header: {
    fontSize: 22,
    fontWeight: '600', // Medium weight
    color: '#fff',
  },
  faqContainer: {
    paddingHorizontal: 0,
  },
  faqItem: {
    backgroundColor: 'white',
    borderRadius: 12, // Rounded corners
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  questionContainer: {
    paddingVertical: 0,
  },
  question: {
    fontSize: 16,
    fontWeight: '500', // Medium weight
    color: '#007AFF', // iOS blue color
  },
  answer: {
    fontSize: 14,
    color: '#333',
    marginTop: 8,
  },

  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    // width: '30%',
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
});


export default Faq;