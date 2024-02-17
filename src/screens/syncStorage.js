import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [storedValue, setStoredValue] = useState('');

  // Load data from AsyncStorage on component mount
  useEffect(() => {
    loadData();
  }, []);

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('@myApp:key', inputValue);
      console.log('Data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const loadData = async () => {
    try {
      const value = await AsyncStorage.getItem('@myApp:key');
      if (value !== null) {
        setStoredValue(value);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  return (
    <View>
      <Text>Stored Value: {storedValue}</Text>
      <TextInput
        placeholder="Enter value to store"
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
      />
      <Button title="Save Data" onPress={saveData} />
    </View>
  );
};

export default App;
