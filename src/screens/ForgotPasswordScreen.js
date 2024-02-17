import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { TextInput } from 'react-native-paper';
import AppButton from '../components/AppButton';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = () => {
    if (!email) {
      Alert.alert('Please enter your email address.');
      return;
    }

    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert('Password reset email sent successfully. Check your email.');
      })
      .catch(error => {
        console.error('Error sending password reset email:', error);
        Alert.alert('Error', 'Failed to send password reset email. Please try again.');
      });
  };

  return (
    <View style={{height:'100%',justifyContent:'flex-start',alignItems:'center'}}>
      <Text style={{fontSize:25,color:'green',marginBottom:200,fontWeight:'bold'}}>Forgot Password</Text>
      <TextInput
      style={{
        borderBottomWidth: 2,
        fontSize: 22,
        width: 340,
        paddingHorizontal: 10,
        color: 'white',
        //marginTop:100,
        marginBottom:30,
        //borderBottomColor: 'green',
        borderColor: 'green',
      }}
          label={'Enter email'}
          value={email}
          mode="outlined"
          onChangeText={text => setEmail(text)}
        />
      <AppButton title={'Reset Passord'} colour={'green'} buttonPress={handleForgotPassword} />
    </View>
  );
};

export default ForgotPasswordScreen;
