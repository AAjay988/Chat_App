import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  PermissionsAndroid,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AppButton from '../components/AppButton';
import TextClick from '../components/TextclickButton';
import {IconButton, TextInput} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ProfileImage, WhatsappLogoo} from '../components/ImageLinks';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';

const SignupScreen = () => {
  const navigation = useNavigation();
  const handlebutton = () => {
    navigation.navigate('Dashboard');
  };
  const handleIconButton = () => {
    setModalVisible(true);
    setSelectedImage();
  };
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [downloadURL, setDownloadURL] = useState('');

  const userSignup = async () => {
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(responce => {
          database().ref(`/users/${responce.user.uid}`).set({
            // uid: responce.user.uid,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            pic: downloadURL,
          });
          console.log(responce);
        });
    } catch (error) {
      console.error('Error', error.message);
      alert('Somethimg wrong');
    }
  };
  
  const OpenCamera = () => {
    launchCamera({quality: 0.9, mediaType: 'photo'}, image => {
      console.log(image);
      setSelectedImage(image.assets[0].uri);
    });
    setModalVisible(false);
  };

  const OpenGallery = () => {
    launchImageLibrary({quality: 0.9, mediaType: 'photo'}, image => {
      const filePath = image.assets[0].uri;
      const fileName = `userProfile/${Date.now()}`;
      const uploadTask = storage().ref().child(fileName).putFile(filePath);
      console.log(filePath);
      uploadTask.on(
        'state_changed',
        snapshot => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progress === 100) {
            alert('image uploaded');
          }
        },
        error => {
          alert('error uploading image');
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log('File available at', downloadURL);
            setSelectedImage(downloadURL);
            setDownloadURL(downloadURL)
          }).catch(error =>{
            console.error('Error getting download URL:', error);
            alert('Error getting download URL');
          })
        },
      );
    });
    setModalVisible(false);
  };

  useEffect(()=>{
    console.log('downloadURL:',downloadURL);
  },[downloadURL])
  return (
    <KeyboardAvoidingView behavior="position">
      <View style={styles.container}>
        {/* <Image source={{uri:WhatsappLogoo}} style={styles.imgStyle}/> */}
        {selectedImage && (
          <Image source={{uri: selectedImage}} style={styles.imgStyle} />
        )}
        <AppButton
          title={'Select Photo'}
          buttonPress={() => setModalVisible(true)}
          colour={'green'}
        />

        <Modal
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => setModalVisible(false)}>
          <View
            style={{
              backgroundColor: 'orange',
              width: '60%',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 15,
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
            <AppButton
              title={'Camera'}
              colour={'blue'}
              buttonPress={OpenCamera}
            />
            <AppButton
              title={'Gallery'}
              colour={'blue'}
              buttonPress={OpenGallery}
            />
            <TextClick
              title={'Cancel'}
              colors={'blue'}
              pressButton={() => setModalVisible(false)}
            />
          </View>
        </Modal>

        <View style={styles.inputTextStyle}>
          <TextInput
            label="First Name"
            mode="outlined"
            value={firstName}
            onChangeText={text => setFirstName(text)}
          />
          <TextInput
            label="Last Name"
            mode="outlined"
            value={lastName}
            onChangeText={text => setLastName(text)}
          />
          <TextInput
            label="Phone Number"
            mode="outlined"
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text)}
          />
          <TextInput
            label="email"
            mode="outlined"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            label="Password"
            mode="outlined"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
        </View>

        <AppButton title={'Signup'} colour={'green'} buttonPress={userSignup} />

        {/* <IconButton  icon={'camera'} iconColor='black' size={40} onPress={handleIconButton}/> */}
        <View style={styles.textClickStyle}>
          <TextClick
            title={'Already have an account'}
            pressButton={() => navigation.goBack()}></TextClick>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
const styles = StyleSheet.create({
  container: {
    height: '50%',
    // backgroundColor: 'white',
    alignItems: 'center',
    //justifyContent: 'flex-start',
  },
  textStyle: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    //paddingBottom:20,
    marginBottom: 20,
  },
  fontStyle: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: '500',
    color: 'grey',
    marginBottom: 60,
  },
  buttonStyle: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: '500',
    color: 'grey',
    marginTop: 50,
    marginBottom: 30,
  },
  inputTextStyle: {
    borderBottomWidth: 2,
    fontSize: 25,
    width: 340,
    paddingHorizontal: 10,
    //borderBottomColor: 'green',
    borderColor: 'green',
  },
  imgStyle: {
    height: 150,
    width: 150,
    alignItems: 'center',
    borderRadius: 75,
    margin:25
  },
  box2: {
    paddingHorizontal: 40,
    justifyContent: 'space-evenly',
    height: '50%',
  },
  textClickStyle: {
    alignItems: 'center',
  },
});
