import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { Colors } from '../../assets/Colors';
import { Invest, Withdrawal } from '../../assets/Images';

// Expanded investment data
const investmentData = [
  { id: '1', date: '13-04-2023', amount: '12/-', interest: '40%', lockingPeriod: '21 Months' },
  { id: '2', date: '01-06-2023', amount: '15/-', interest: '35%', lockingPeriod: '18 Months' },
  { id: '3', date: '15-07-2023', amount: '20/-', interest: '45%', lockingPeriod: '24 Months' },
  { id: '4', date: '20-08-2023', amount: '25/-', interest: '30%', lockingPeriod: '15 Months' },
  { id: '5', date: '05-09-2023', amount: '18/-', interest: '50%', lockingPeriod: '30 Months' }
];

// Expanded interest withdrawal data
const interestWithdrawlData = [
  { id: '1', date: '31-12-2023', amount: '10/-', status: 'Rejected' },
  { id: '2', date: '31-12-2023', amount: '10/-', status: 'Rejected' },
  { id: '3', date: '31-12-2023', amount: '10/-', status: 'Paid' },
  { id: '4', date: '31-12-2023', amount: '10/-', status: 'Paid' },
  { id: '5', date: '15-01-2024', amount: '12/-', status: 'Paid' },
  { id: '6', date: '15-01-2024', amount: '12/-', status: 'Rejected' },
  { id: '7', date: '28-02-2024', amount: '15/-', status: 'Paid' },
  { id: '8', date: '28-02-2024', amount: '15/-', status: 'Rejected' },
  { id: '9', date: '15-03-2024', amount: '20/-', status: 'Paid' },
  { id: '10', date: '15-03-2024', amount: '20/-', status: 'Rejected' }
];

// Expanded capital withdrawal data
const capitalWithdrawData = [
  { id: '1', date: '31-12-2023', amount: '10/-', status: 'Paid' },
  { id: '2', date: '31-12-2023', amount: '10/-', status: 'Rejected' },
  { id: '3', date: '31-12-2023', amount: '10/-', status: 'Paid' },
  { id: '4', date: '31-12-2023', amount: '10/-', status: 'Rejected' },
  { id: '5', date: '15-01-2024', amount: '12/-', status: 'Paid' },
  { id: '6', date: '15-01-2024', amount: '12/-', status: 'Rejected' },
  { id: '7', date: '28-02-2024', amount: '15/-', status: 'Paid' },
  { id: '8', date: '28-02-2024', amount: '15/-', status: 'Rejected' },
  { id: '9', date: '15-03-2024', amount: '20/-', status: 'Paid' },
  { id: '10', date: '15-03-2024', amount: '20/-', status: 'Rejected' }
];

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('Investment');

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.cardLabel}>Date</Text>
        <Text style={styles.cardValue}>{item.date}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.cardLabel}>Amount</Text>
        <Text style={styles.cardValue}>{item.amount}</Text>
      </View>
      {item.interest && (
        <View style={styles.row}>
          <Text style={styles.cardLabel}>Interest</Text>
          <Text style={styles.cardValue}>{item.interest}</Text>
        </View>
      )}
      {item.lockingPeriod && (
        <View style={styles.row}>
          <Text style={styles.cardLabel}>Locking Period</Text>
          <Text style={styles.cardValue}>{item.lockingPeriod}</Text>
        </View>
      )}
      {item.status && (
        <View style={styles.row}>
          <Text style={styles.cardLabel}>Status</Text>
          <Text style={[styles.cardValue, styles.statusText]}>{item.status}</Text>
        </View>
      )}
    </View>
  );

  const renderItemTable = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.cell}>{item.date}</Text>
      <Text style={styles.cell}>{item.amount}</Text>
      {item.status && <Text style={[styles.cell, styles.statusText]}>{item.status}</Text>}
    </View>
  );

  const getData = () => {
    switch (activeTab) {
      case 'Investment':
        return investmentData;
      case 'Interest Withdrawl':
        return interestWithdrawlData;
      case 'Capital Withdraw':
        return capitalWithdrawData;
      default:
        return [];
    }
  };

  const getTabIcon = (tab) => {
    return tab === 'Investment' ? Invest : Withdrawal;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Portfolio</Text>

      <View style={styles.tabsContainer}>
        {['Investment', 'Interest Withdrawl', 'Capital Withdraw'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Image
              source={getTabIcon(tab)}
              style={[styles.iconStyle, activeTab === tab && styles.activeIconStyle]}
            />
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {
        activeTab === 'Interest Withdrawl' ? <Text style={styles.warning}>Note- The Withdrawl requiest can only be placed on the last days of every month (i.e 28, 29, 30, 31) and may take up to 72 hours to disburse</Text> : <View></View>
      }

      {activeTab === 'Investment' ? <View></View> : (<View style={styles.row}>
        <Text style={styles.menuCell}>Date</Text>
        <Text style={styles.menuCell}>Amount</Text>
        {/* {activeTab === 'Investment' ? (
          <Text style={styles.headerText}>Interest</Text>
        ) : (
          <Text style={styles.headerText}>Status</Text>
        )} */}
        <Text style={styles.menuCell}>Status</Text>
      </View>)}

      <FlatList
        data={getData()}
        renderItem={activeTab === 'Investment' ? renderItem : renderItemTable}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F4F4F4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: Colors.primaryText,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    borderColor: Colors.borderColor,
    backgroundColor: Colors.tabBackground,
    marginHorizontal: 5,
    elevation: 4,
    backgroundColor: Colors.SkyBlue, // '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 3,
  },
  activeTab: {
    backgroundColor: Colors.themeColor,
    borderColor: Colors.themeColor,
  },
  tabText: {
    fontSize: 14,
    color: Colors.tabText,
    textAlign: 'center',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 5,
    marginBottom: 12,
    borderRadius: 10,
    borderColor: Colors.cardBorder,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 15,
    color: Colors.textColor,
    fontWeight: 'bold',
  },
  cardValue: {
    fontSize: 15,
    color: Colors.textColor,
  },
  statusText: {
    // fontWeight: '600',
  },
  iconStyle: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginBottom: 4,
  },
  activeIconStyle: {
    tintColor: '#FFFFFF',
  },

  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: Colors.headerBackground,
    marginBottom: 8,
  },
  headerText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    color: Colors.themeColor,
  },
  cell: {
    // flex: 1,
    fontSize: 14,
    color: Colors.textColor,
    textAlign: 'center',
    borderColor: Colors.cardBorder,
    backgroundColor: '#FFFFFF',
    width: '30%'

  },
  menuCell: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.themeColor,
    textAlign: 'center',

    // paddingVertical: 10,

  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 3,
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingVertical: 10,
    width: "100%",
    backgroundColor: "#ffff",
  },
  warning: {
    fontWeight: 'bold',
    color: '#981f02',
    paddingBottom: 20,
  }
});

export default Portfolio;
