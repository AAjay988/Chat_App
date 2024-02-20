import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, Modal, StyleSheet, Text, View} from 'react-native';
import AppButton from '../components/AppButton';
import TextInputButton from '../components/TextInput';
import TextClick from '../components/TextclickButton';
import {Appbar, TextInput} from 'react-native-paper';
import database from '@react-native-firebase/database';
import {useDispatch, useSelector} from 'react-redux';
import {setPersonalDetails, setuserDetails} from '../redux/slices/userSlice';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WhatsappLogoo } from '../components/ImageLinks';

const LoginScreen = () => {
  const userLogin = async () => {
    const result = await auth().signInWithEmailAndPassword(email, password);
    console.log('result:',result);
    if (result) {
      database()
      .ref(`/users/${result.user.uid}`)
      .on('value', snapshot => {
        const userData = snapshot.val()
        console.log("userrDataa::",userData);
        try {
          const jsonValue = JSON.stringify(userData)
        AsyncStorage.setItem("userData",jsonValue)
        AsyncStorage.setItem('userId',result.user.uid,)
         AsyncStorage.setItem('userPic',userData.pic)
        console.log("usar Data",jsonValue);
        } catch (e) {
          console.log(e);
        }
      })
      navigation.navigate('Dashboard');
    } else {
      console.log('error');
    }
    
      return () => referance()
  };
  
  // const dispatch = useDispatch();
  // const userDetails = useSelector(state => state.user.userData);
  // const personalDetails = useSelector(state => state.user.personalData);
  // const updateUserDetails = () => {
  //   dispatch(setuserDetails({userName: 'Ajay'}));
  // };
  // useEffect(() => {
  //   dispatch(setPersonalDetails({age: 23}));
  // }, []);

  // useEffect(() => {
  //   const referance = database()
  //     .ref('/users/AJ')
  //     .on('value', snapshot => {
  //       console.log('User data: ', snapshot.val());
  //     });
  // });

  const navigation = useNavigation();
  const handlebutton = () => {
    navigation.navigate('Signup');
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={{
            backgroundColor: 'grey',
            width: '50%',
            alignSelf: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              alignSelf: 'center',
              color: 'black',
            }}>
            Select Source
          </Text>
          <AppButton title={'Camera'} />
          <AppButton title={'Gallery'} />
          <TextClick
            title={'Cancel'}
            pressButton={() => setModalVisible(false)}
          />
        </View>
      </Modal>
      <Appbar.Header>
        <Appbar.BackAction
          style={{marginRight: 340, alignItems: 'flex-start'}}
          onPress={() => navigation.navigate('Home')}
        />
        <Appbar.Action
          style={{alignItems: 'flex-end'}}
          icon="dots-vertical"
          onPress={() => setModalVisible(true)}
        />
      </Appbar.Header>
      <Text style={styles.fontStyle}>Enter your phone number</Text>
      <Text style={styles.textStyle}>Carrier chares may apply</Text>
      <Image source={{uri:WhatsappLogoo}} style={styles.imgStyle}/>
      <View style={styles.inputTextStyle}>
        <TextInput
          label={'Email'}
          value={email}
          mode="outlined"
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          label={'Password'}
          value={password}
          secureTextEntry
          mode="outlined"
          onChangeText={text => setPassword(text)}
        />
      </View>
      <TextClick
        title={'Forgot Password'}
        pressButton={() => navigation.navigate('Dashboard')}
      />
      <AppButton title={'Login'} colour={'green'} buttonPress={userLogin} />
      <TextClick
        title={`Don't have an account ?`}
        pressButton={handlebutton}></TextClick>
      {/* <Text style={{fontWeight:'bold',fontSize:20,color:'black'}}>{personalDetails.age}</Text> */}
    </View>
  );
};
export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  fontStyle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  textStyle: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: 'grey',
    marginBottom: 50,
    //paddingBottom:100
  },
  inputTextStyle: {
    borderBottomWidth: 2,
    fontSize: 25,
    width: 340,
    paddingHorizontal: 10,
    color: 'white',
    //borderBottomColor: 'green',
    borderColor: 'green',
    borderBlockColor: 'red',
  },
  imgStyle: {
    height: 150,
    width: 150,
    alignItems: 'center',
    borderRadius: 75,
  },
});
