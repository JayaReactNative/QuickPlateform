import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Alert,Platform, Dimensions
} from 'react-native';
import {Colors} from '../../assets/Colors';
import {Invest, Withdrawal} from '../../assets/Images';
import LinearGradient from 'react-native-linear-gradient';
import Server from '../../server/Server';



const { width, height } = Dimensions.get('window');
const Portfolio = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('Investment');
  const [investmentData, setInvestmentData] = useState([]);
  const [withdrawlData, setWithdrawlData] = useState([]);
  const [capitalWithdraw, setCapitalWithdraw] = useState([]);

  useEffect(() => {
    getWithdrawDetail();
    getCapitalDetail();
    getInvestmentDetail();
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('TransactionDeatail')}>
      <View style={[styles.row, {alignSelf: 'flex-start'}]}>
        <Text
          style={[
            styles.cardLabel,
            {fontWeight: '600', color: Colors.White, width: '60%'},
          ]}>
          Date
        </Text>
        <Text style={styles.cardValue}>
          {new Date(parseInt(item.dateOfInvest))
            .getDate()
            .toString()
            .padStart(2, '0') +
            '-' +
            (new Date(parseInt(item.dateOfInvest)).getMonth() + 1)
              .toString()
              .padStart(2, '0') +
            '-' +
            new Date(parseInt(item.dateOfInvest)).getFullYear()}
        </Text>

      </View>
      <View style={[styles.row, {alignSelf: 'flex-start'}]}>
        <Text
          style={[
            styles.cardLabel,
            {fontWeight: '600', color: Colors.White, width: '60%'},
          ]}>
          Amount
        </Text>
        <Text style={styles.cardValue}>₹{item.amount}</Text>
      </View>
      {item.interest && (
        <View style={[styles.row, {alignSelf: 'flex-start'}]}>
          <Text
            style={[
              styles.cardLabel,
              {fontWeight: '600', color: Colors.White, width: '60%'},
            ]}>
            Interest
          </Text>
          <Text style={styles.cardValue}>{item.interest}</Text>
        </View>
      )}
      {item.lockingPeriod && (
        <View style={[styles.row, {alignSelf: 'flex-start'}]}>
          <Text
            style={[
              styles.cardLabel,
              {fontWeight: '600', color: Colors.White, width: '60%'},
            ]}>
            Locking Period
          </Text>
          <Text style={styles.cardValue}>{item.lockingPeriod}</Text>
        </View>
      )}
      {item.status && (
        <View style={[styles.row, {alignSelf: 'flex-start'}]}>
          <Text
            style={[
              styles.cardLabel,
              {fontWeight: '600', color: Colors.White, width: '60%'},
            ]}>
            Status
          </Text>
          <Text style={[styles.cardValue]}>{item.status}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderItemTable = ({item}) => (
    <View style={styles.tableRow}>
      <Text style={[styles.cell, {width: '27%'}]}>
        {item.date ? item.date : item.dateOfWithdrawal}
      </Text>
      <Text style={[styles.cell, {width: '45%'}]}>₹{item.amount}</Text>
      
        <Text style={[styles.cell, {width: '25%'}]}>{item.status}</Text>
      <TouchableOpacity
        onPress={() => Alert.alert('Do you want to cancel request?')}>
        <Image
          source={item.image}
          style={{width: 30, height: 23, resizeMode: 'contain'}}
        />
      </TouchableOpacity>
    </View>
  );

  const getData = () => {
    switch (activeTab) {
      case 'Investment':
        return investmentData;
      case 'Interest\nWithdraw':
        return withdrawlData;
      case 'Capital\nWithdraw':
        return capitalWithdraw;
      default:
        return [];
    }
  };

  const getTabIcon = tab => {
    return tab === 'Investment' ? Invest : Withdrawal;
  };

  // ------- api integration ----
  const getWithdrawDetail = async () => {
    try {
      const response = await Server.getWithDrawList();
      const sortedData = response.data?.items.sort((a, b) => {
        const dateA = new Date(a.date || a.dateOfWithdrawal).getTime();
        const dateB = new Date(b.date || b.dateOfWithdrawal).getTime();
        return dateB - dateA; // Most recent date first
      });
      setWithdrawlData(sortedData);
    } catch (error) {
      console.log('Error', 'An error occurred fetching data ');
    }
  };

  const getCapitalDetail = async () => {
    try {
      const response = await Server.getCapitalDrawList();
      const sortedData = response.data?.items.sort((a, b) => {
        const dateA = new Date(
          a.dateOfWithdrawal || a.dateOfWithdrawal,
        ).getTime();
        const dateB = new Date(
          b.dateOfWithdrawal || b.dateOfWithdrawal,
        ).getTime();
        return dateB - dateA;
      });
      setCapitalWithdraw(sortedData);
    } catch (error) {
      console.log('Error', 'An error occurred fetching data ');
    }
  };

  const getInvestmentDetail = async () => {
    try {
      const response = await Server.getInvestmentList();
      const sortedData = response.data?.items.sort((a, b) => {
        const dateA = new Date(
          a.dateOfWithdrawal || a.dateOfWithdrawal,
        ).getTime();
        const dateB = new Date(
          b.dateOfWithdrawal || b.dateOfWithdrawal,
        ).getTime();
        return dateB - dateA;
      });
      setInvestmentData(sortedData);
    } catch (error) {
      console.log('Error', 'An error occurred fetching data ');
    }
  };

  return (
    <LinearGradient colors={['#0C6B72', '#34AEA1']} style={styles.container}>
      <View style={styles.container}>
        <View style={{marginVertical: 10}}>
          <Text style={styles.title}>Portfolio</Text>
        </View>

        <View style={styles.tabsContainer}>
          {['Investment', 'Interest\nWithdraw', 'Capital\nWithdraw'].map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => {
                setActiveTab(tab);
              }}>
              <Image
                source={getTabIcon(tab)}
                style={[
                  styles.iconStyle,
                  activeTab === tab && styles.activeIconStyle,
                ]}
              />
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === 'Interest\nWithdraw' ? (
          <Text style={styles.warning}>
            Note- The Withdrawl requiest can only be placed on the last days of
            every month (i.e 28, 29, 30, 31) and may take up to 72 hours to
            disburse
          </Text>
        ) : (
          <View></View>
        )}

        {activeTab === 'Investment' ? (
          <View></View>
        ) : (
          <View style={styles.row}>
            <Text style={styles.menuCell}>Date</Text>
            <Text style={styles.menuCell}>Amount</Text>
            <Text style={styles.menuCell}>Status</Text>
          </View>
        )}

        <FlatList
          data={getData()}
          renderItem={activeTab === 'Investment' ? renderItem : renderItemTable}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 6,
    // backgroundColor: '#F4F4F4',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 16,
    color: Colors.White,
  },
  tabsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    alignSelf: 'center',
  },
  tab: {
    width: 110,
    alignItems: 'center',
    paddingVertical: 10,
    elevation: 4,
    backgroundColor:Platform.OS === 'ios' ?'rgba(0, 0, 0, 0.35)':Colors.themegreen,
    shadowColor: '#000',
    shadowOpacity: Platform.OS === 'ios' ? 0.3 : 0.35,
    shadowOffset: Platform.OS === 'ios' ? {width: 2, height: 1} : {width: 0, height: 0},
    elevation: 5,
    borderRadius: 15,
  },
  activeTab: {
    backgroundColor: Colors.SkyBlue,
    shadowColor: '#fff',
    shadowOpacity: 0.23,
    shadowOffset: {width: 4, height: 2},
    shadowRadius: 4,
    elevation: 5,
  },
  tabText: {
    fontSize: 14,
    color: Colors.White,
    textAlign: 'center',
  },
  activeTabText: {
    color: Colors.Black,
    fontWeight: '600',
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 80,
  },
  card: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 5,
    marginBottom: 12,
    borderRadius: 10,
    borderColor: Colors.cardBorder,
     backgroundColor:Platform.OS === 'ios' ?'rgba(0, 0, 0, 0.2)':Colors.themegreen,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 15,
    color: Colors.textColor,
    fontWeight: 'bold',
  },
  cardValue: {
    fontSize: 15,
    color: Colors.White,
  },
  iconStyle: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    tintColor: '#FFFFFF',
    marginBottom: 6,
  },
  activeIconStyle: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginBottom: 6,
    tintColor: '#000',
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
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.themeColor,
  },
  cell: {
    fontSize: 14,
    color: Colors.White,
    textAlign: 'center',
    fontWeight: '500',
  },
  menuCell: {
    // flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.White,
    textAlign: 'left',
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 4,
    elevation: 3,
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingVertical: 10,
    width: '100%',
     backgroundColor:Platform.OS === 'ios' ?'rgba(0, 0, 0, 0.2)':Colors.themegreen,
  },
  warning: {
    fontWeight: 'bold',
    color: '#FFA500',
    paddingBottom: 20,
  },
});

export default Portfolio;
