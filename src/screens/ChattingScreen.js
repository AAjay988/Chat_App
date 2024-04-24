import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Bubble, GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';
import database from '@react-native-firebase/database';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const ChattingScreen = ({route, user}) => {
  const {uid} = route.params;
  const [messages, setMessages] = useState([]);

  // Function to handle image selection
  const selectedImage = async () => {
    const result = await launchImageLibrary({mediaType: 'photo', quality: 0.9});
    if (result.didCancel) {
      console.log('User cancelled image picker');
    } else if (result.error) {
      console.log('ImagePicker Error: ', result.error);
    } else {
      const source = {uri: result.assets[0].uri};
      console.log('source:', source);
      // Now upload the image to your server or storage
      uploadImage(source.uri);
    }
  };

  const uploadImage = async uri => {
    const uploadUri = uri.lastIndexOf('/');
    const fileName = uri.substring(uploadUri + 1);
    console.log('uri:', uri);
    const storageRef = storage().ref(`images/${fileName}`);
    const task = storageRef.putFile(uploadUri);
    try {
      await task;
      const url = await storageRef.getDownloadURL();
      sendMessageWithImage(url);
    } catch (e) {
      console.log(e);
    }
  };

  const sendMessageWithImage = imageUrl => {
    const message = {
      _id: Math.random().toString(36).substring(7),
      text: '',
      createdAt: new Date(),
      user: {
        _id: user.uid, 
      },
      image: imageUrl,
    };
    onSend([message]);
  };

  useEffect(() => {
    const setData =
      uid !== user.uid ? user.uid + '-' + uid : uid + '-' + user.uid;
    const ref = database().ref(`/Chats/${setData}`);
    ref.on('value', snapshot => {
      const data = snapshot.val();
      //console.log(data);
      if (data) {
        const messagesList = Object.values(data);
        setMessages(messagesList);
      } else {
        setMessages([]);
      }
    });

    return () => ref.off();
  }, []);
  const onSend = async (messageArray = []) => {
    const msg = messageArray[0];
    console.log('msg:', msg);
    const messageData = {
      ...msg,
      sendBy: user.uid,
      sentTo: uid,
      createdAt: msg.createdAt.getTime(),
    };
    console.log('messageData:', messageData);
    const setData =
      uid !== user.uid ? user.uid + '-' + uid : uid + '-' + user.uid;
    await database()
      .ref(`/Chats/${setData}`)
      .push(messageData)
      .set(messageData);
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.textStyle}>Chatting Screen</Text> */}
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: user.uid,
        }}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: 'green',
                },
                left: {
                  backgroundColor: 'white',
                },
              }}
            />
          );
        }}
        renderInputToolbar={props => {
          return (
            <View>
              <InputToolbar
                {...props}
                containerStyle={{borderTopWidth: 1, borderColor: 'green'}}
              />
              <View
                style={{
                  marginRight: 40,
                  marginBottom: 10,
                  alignItems: 'flex-end',
                }}>
                <EvilIcons
                  name="image"
                  size={40}
                  color="blue"
                  onPress={() => selectedImage()}
                />
              </View>
            </View>
          );
        }}
        renderSend={props => (
          <Send {...props}>
            <View
              style={{
                marginRight: 10,
                marginBottom: 10,
                alignItems: 'flex-end',
              }}>
              <Feather name="send" size={26} color="blue" />
            </View>
          </Send>
        )}
      />
    </View>
  );
};
export default ChattingScreen;
const styles = StyleSheet.create({
  container: {
    height: '100%',
    //flex:1,
    //width:'100%',
    backgroundColor: 'cream',
    //alignItems: 'center',
    //justifyContent: 'flex-end',
  },
  textStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
});
