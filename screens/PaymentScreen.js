import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Button, Alert, StyleSheet } from 'react-native';
import pincodes from '../assets/pincodes.json';

const PaymentScreen = ({ route }) => {
  const { product } = route.params;
  const [pincode, setPincode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [countdownTime, setCountdownTime] = useState(null);

  const calculateDeliveryDate = (tat) => {
    const now = new Date();
    const deliveryTime = new Date(now.getTime() + tat * 60 * 60 * 1000);
    return deliveryTime;
  };

  const handlePincodeSubmit = () => {
    const pincodeInfo = pincodes.find(p => p.Pincode.toString() === pincode);

    if (!pincodeInfo) {
      setErrorMessage('Invalid pincode. No delivery service available.');
      setDeliveryDate(null);
      setCountdownTime(null);
    } else {
      const { TAT } = pincodeInfo;
      const deliveryEndTime = calculateDeliveryDate(TAT);
      setDeliveryDate(deliveryEndTime.toDateString());
      setCountdownTime(deliveryEndTime.getTime() - Date.now());
      setErrorMessage('');

    }
  };

  const handlePayment = () => {
    if (!deliveryDate) {
      Alert.alert('Error', 'Please enter a valid pincode to calculate delivery.');
    } else {
      Alert.alert('Payment Successful', `Thank you for your purchase!\nExpected Delivery Date: ${deliveryDate}`);
    }
  };


  useEffect(() => {
    let timer;
    if (countdownTime > 0) {
      timer = setInterval(() => {
        setCountdownTime(prevTime => prevTime - 1000); // Decrement by 1 second
      }, 1000);
    } else if (countdownTime <= 0) {
      setCountdownTime(0);
    }
    return () => clearInterval(timer);
  }, [countdownTime]);

  const formatCountdown = (time) => {
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://i5.walmartimages.com/asr/88e642af-7183-48c7-8b9a-872d6abf24a6_1.f9ed6caa72e06acd9d3b04db27227cb6.jpeg' }} style={styles.productImage} />
      <Text style={styles.title}>{product["Product Name"]}</Text>
      <Text style={styles.price}>Price: ₹{product.Price}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Pincode"
        keyboardType="numeric"
        value={pincode}
        onChangeText={setPincode}
        maxLength={6}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <View style={styles.button}>
        <Button title="Calculate Delivery Date" onPress={handlePincodeSubmit} />
        {deliveryDate && (
        <Text style={styles.deliveryDate}>Expected Delivery Date: {deliveryDate}</Text>
        )}
        {countdownTime > 0 && (
          <Text style={styles.countdown}>Time Left for Same-Day Delivery: {formatCountdown(countdownTime)}</Text>
        )}
        </View>

      <Button title="Proceed to Payment" onPress={handlePayment} color="#28a745" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fa',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    width: '100%',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  deliveryDate: {
    fontSize: 16,
    color: '#333',
    marginVertical: 20,
    textAlign: 'center',
  },
  productImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 30,
  },
  button:{
    marginTop: 10,
    marginBottom: 10,
  }
});

export default PaymentScreen;