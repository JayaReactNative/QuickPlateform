import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator, 
} from 'react-native';
import {Colors} from '../../assets/Colors';
import {Delete, Invest, Withdrawal} from '../../assets/Images';
import LinearGradient from 'react-native-linear-gradient';
import Server from '../../server/Server';

// Expanded investment data
const investmentData = [
  {
    id: '1',
    date: '13-04-2023',
    amount: '12',
    interest: '40%',
    lockingPeriod: '21 Months',
  },
  {
    id: '2',
    date: '01-06-2023',
    amount: '15',
    interest: '35%',
    lockingPeriod: '18 Months',
  },
  {
    id: '3',
    date: '15-07-2023',
    amount: '20',
    interest: '45%',
    lockingPeriod: '24 Months',
  },
  {
    id: '4',
    date: '20-08-2023',
    amount: '25',
    interest: '30%',
    lockingPeriod: '15 Months',
  },
  {
    id: '5',
    date: '05-09-2023',
    amount: '18',
    interest: '50%',
    lockingPeriod: '30 Months',
  },
];

// Expanded interest withdrawal data
const interestWithdrawlData = [
  {id: '1', date: '31-12-2023', amount: '10', status: 'Rejected'},
  {id: '2', date: '31-12-2023', amount: '10', status: 'Rejected'},
  {id: '3', date: '31-12-2023', amount: '10', status: 'Paid'},
  {id: '4', date: '31-12-2023', amount: '10', status: 'Paid'},
  {id: '5', date: '15-01-2024', amount: '12', status: 'Paid'},
  {id: '6', date: '15-01-2024', amount: '12', status: 'Rejected'},
  {id: '7', date: '28-02-2024', amount: '15', status: 'Paid'},
  {id: '8', date: '28-02-2024', amount: '15', status: 'Rejected'},
  {id: '9', date: '15-03-2024', amount: '20', status: 'Paid'},
  {id: '10', date: '15-03-2024', amount: '20', status: 'Rejected'},
];

// Expanded capital withdrawal data
const capitalWithdrawData = [
  {id: '1', date: '31-12-2023', amount: '10', status: 'Paid'},
  {id: '2', date: '31-12-2023', amount: '10', status: 'Rejected'},
  {id: '3', date: '31-12-2023', amount: '10', status: 'Paid'},
  {id: '4', date: '31-12-2023', amount: '10', status: 'Rejected'},
  {id: '5', date: '15-01-2024', amount: '12', status: 'Paid'},
  {id: '6', date: '15-01-2024', amount: '12', status: 'Rejected'},
  {id: '7', date: '28-02-2024', amount: '15', status: 'Paid'},
  {id: '8', date: '28-02-2024', amount: '15', status: 'Rejected'},
  {id: '9', date: '15-03-2024', amount: '20', status: 'Paid'},
  {
    id: '10',
    date: '15-03-2024',
    amount: '20',
    status: 'Rejected',
    image: require('../../assets/icons/cancel_red.png'),
  },
];

const Portfolio = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('Investment');
  const [investmentData, setInvestmentData] = useState([]);
  const [withdrawlData, setWithdrawlData] = useState([]);
  const [capitalWithdraw, setCapitalWithdraw] = useState([]);
  const [loading, setLoading] = useState(false);

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

        {/* <Text style={styles.cardValue}>{Date(item.dateOfInvest).toString().split(' ').slice(2, 4).reverse().join('-') + '-' + new Date(1662374787413).getFullYear()}</Text> */}
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
      {item.status && (
        <Text style={[styles.cell, {width: '25%'}]}>{item.status}</Text>
      )}
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
      case 'Interest Withdrawl':
        return withdrawlData;
      case 'Capital Withdraw':
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
      setLoading(true)
      const response = await Server.getWithDrawList();
      const sortedData = response.data?.items.sort((a, b) => {
        const dateA = new Date(a.date || a.dateOfWithdrawal).getTime();
        const dateB = new Date(b.date || b.dateOfWithdrawal).getTime();
        return dateB - dateA; // Most recent date first
      });
      setWithdrawlData(sortedData);
    } catch (error) {
      console.log('Error', 'An error occurred fetching data ');
    } finally {
      setLoading(false)
    }
  };

  const getCapitalDetail = async () => {
    try {
      setLoading(true)
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
    } finally {
      setLoading(false)
    }
  };

  const getInvestmentDetail = async () => {
    try {
      setLoading(true)
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
      // const formattedDate =
      //   new Date(parseInt(sortedData[0].dateOfInvest))
      //     .getDate()
      //     .toString()
      //     .padStart(2, '0') +
      //   '-' +
      //   (new Date(parseInt(sortedData[0].dateOfInvest)).getMonth() + 1)
      //     .toString()
      //     .padStart(2, '0') +
      //   '-' +
      //   new Date(parseInt(sortedData[0].dateOfInvest)).getFullYear();
      // console.log(formattedDate);
    } catch (error) {
      console.log('Error', 'An error occurred fetching data ');
    } finally {
      setLoading(false)
    }
  };

  return (
    <LinearGradient colors={['#0C6B72', '#34AEA1']} style={styles.container}>
       {loading ? (
          <ActivityIndicator size="large" color="#ffffff" style={styles.loader} /> // Show loader when loading
        ) : (
        <View style={styles.container}>
          <View style={{marginTop: 30}}>
            <Text style={styles.title}>Portfolio</Text>
          </View>

          <View style={styles.tabsContainer}>
            {['Investment', 'Interest Withdrawl', 'Capital Withdraw'].map(tab => (
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

          {activeTab === 'Interest Withdrawl' ? (
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
       )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    // backgroundColor: '#F4F4F4',
  },
  loader: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 2, height: 1},
    shadowRadius: 4,
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
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  warning: {
    fontWeight: 'bold',
    color: '#FFA500',
    paddingBottom: 20,
  },
});

export default Portfolio;
