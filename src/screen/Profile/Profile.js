import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function Profile() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Profile Icon</Text>
        <Text style={styles.subtitle}>My Profile</Text>
        <Text style={styles.arrow}>↑/↓</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>Column</Text>
        <Text style={styles.text}>Name</Text>
        <Text style={styles.text}>Email</Text>
        <Text style={styles.text}>Mob</Text>
        <Text style={styles.text}>DOB</Text>
      </View>

      <View style={styles.box}>
        
        <Text style={styles.title}>Transaction History</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>FAQ</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>Referred</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>Terms and Conditions</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>Privacy and Policy</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>Rate Us</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>Help and Support</Text>
      </View>

      <TouchableOpacity style={styles.box}>
        <Text style={styles.title}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f8f8', // Background color of the page
    padding: 16,
  },
  box: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
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
    fontSize: 14,
    color: '#666',
  },
  text: {
    fontSize: 14,
    marginVertical: 4,
  },
  arrow: {
    fontSize: 20,
    color: '#333',
    marginTop: 8,
  },
});
