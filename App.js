import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import StripeTerminal, {
  useStripeTerminalState,
  useStripeTerminalCreatePayment,
  useStripeTerminalConnectionManager,
} from 'react-native-stripe-terminal';

StripeTerminal.initialize({
  fetchConnectionToken: () => {
    return fetch('https://api.stripe.com/v1/terminal/connection_tokens', {
      method: 'POST',
      headers: {
        Authorization: `Bearer STRIPE_TEST_KEY`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => data.secret);
  },
});

export default function App() {
  const {
    connectionStatus,
    connectedReader,
    paymentStatus,
    cardInserted,
    readerInputOptions,
    readerInputPrompt,
  } = useStripeTerminalCreatePayment({
    amount: 123,
    description: 'Test payment',
    onSuccess: (result) => {
      Alert.alert('Payment received', JSON.stringify(result));
    },
    onFailure: (err) => {
      Alert.alert('Failed to create payment', JSON.stringify(err));
    },
  });

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
