import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Demo = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  const handlePaymentCompletion = (webviewState) => {
    // Here, you'll capture the result URL and decide the next steps
    if (webviewState.url.includes('payment-success')) {
      // Payment succeeded
      navigation.navigate('SuccessScreen');
    } else if (webviewState.url.includes('payment-failure')) {
      // Payment failed
      navigation.navigate('FailureScreen');
    }
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <WebView
        source={{ uri: 'https://payment.easebuzz.in' }} // replace with your Easebuzz payment URL
        onLoadEnd={() => setLoading(false)}
        onNavigationStateChange={handlePaymentCompletion}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Demo;
