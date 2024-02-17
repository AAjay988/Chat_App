import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import TextClick from '../components/TextclickButton';
import AppButton from '../components/AppButton';
import TextInput from '../components/TextInput';
import {WhatsappLogo} from '../components/ImageLinks';

const FirstScreen = () => {
  const [phonenumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();
  const handlebutton = () => {
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.fontStyle}>Welcome to WhatsApp</Text>
      <Image source={{uri: WhatsappLogo}} style={styles.imageStyle} />
      <Text style={styles.textStyle}>
        Read our policy. Tap Agree and Continue' to accept the terms of Service
      </Text>
      <AppButton
        title={'AGREE AND CONTINUE'}
        colour={'green'}
        buttonPress={handlebutton}
      />
      {/* <TextInput title={'Phone Number'} handleText={setPhoneNumber}/>
      <TextClick title={'TextClick'} pressButton={() => console.log('text')}/> */}
    </View>
  );
};
export default FirstScreen;
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontStyle: {
    color: 'green',
    fontWeight: '500',
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textStyle: {
    alignItems: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: 'grey',
    justifyContent: 'center',
    marginBottom: 100,
  },
  imageStyle: {
    height: 300,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 150,
    margin: 80,
  },
});
