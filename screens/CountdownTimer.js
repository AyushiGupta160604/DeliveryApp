import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import pincodes from '../assets/pincodes.json';
import products from '../assets/products.json';
import stocks from '../assets/stocks.json';

const CountdownTimer = ({ endTime }) => {
    const [timeLeft, setTimeLeft] = useState(0);
    const [provider, setProvider] = useState('');
    const [tat, setTat] = useState(0);

  useEffect(() => {
    const pinData = pincodes.find(pin => pin.Pincode === selectedPincode);

    if (pinData) {
        setProvider(pinData["Logistics Provider"]);
        setTat(pinData.TAT);

        const countdownEnd = Date.now() + pinData.TAT * 60 * 60 * 1000;
        setTimeLeft(countdownEnd - Date.now());

        const intervalId = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1000);
        }, 1000);
        
        return () => clearInterval(intervalId);
      }
    }, [selectedPincode]);

    const formatTimeLeft = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
    
        return `${hours}h ${minutes}m ${seconds}s`;
      };

  return (
    <View>
      <Text>Provider: {provider}</Text>
      <Text>Time Left for Same-Day Delivery: {timeLeft > 0 ? formatTimeLeft(timeLeft) : "Delivery time expired"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CountdownTimer;