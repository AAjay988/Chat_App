import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import database from '@react-native-firebase/database';

const ChattingScreen = ({route, user}) => {
  const {uid} = route.params;
  const [messages, setMessages] = useState([]);

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
    //console.log(setData);
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
    backgroundColor: 'lightgrey',
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

/* useEffect(() => {
    const fetchMessages = async () =>{
      try {
        const setData = uid !== user.uid ? user.uid+ '-' + uid : uid+ '-' +user.uid
        const snapshot = await database().ref(`/chatsRoom/${setData}/myMsg`).once('value')
        const messageData = snapshot.val()
        if (messageData) {
          const message = Object.keys(messageData).map(messageId => ({
            ...messageData[messageId],
            _id: messageId,
            createdAt: new Date(messageData[messageId].createdAt),
          }))
          console.log('Mapped messages:',message)
          setMessages(message)
        }
      } catch (error) {
        console.log('Error fetching Data',error);
      }
    }
    fetchMessages()
  },[])*/
// const onSend = (messageArray) => {
//   const msg = messageArray[0]
//   //console.log(messageArray[0].user._id);
//   const myMsg = {
//     ...msg,
//     sentBy:user.uid,
//     sentTo: uid,
//     createdAt: new Date()
//   }
//   console.log(myMsg);
//   setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg))
//   const setData = uid !== user.uid ? user.uid+ '-' + uid : uid+ '-' +user.uid
//   //console.log(setData);
//   database().ref(`/chatrooms/${setData}`)
//   .set({myMsg})
// }
//1111111111111111111111111111111111111
/*const onSend = useCallback(async (newMessages = []) => {
    try {
      if (newMessages.length > 0) {
        await Promise.all(
          newMessages.map(async message => {
            console.log(message);
            await database().ref(`/chats/${user.uid}`).push().set({
              _id: message._id,
              text: message.text,
              createdAt: message.createdAt.getTime(),
              user: {
                _id: message.user._id,
                name: message.user.name,
                avatar: message.user.avatar,
              },
            });
          })
        );
      }
    } 
    catch (error) {
      console.log('Error Saving message:',error);
    } 
  }, [user])*/

// user={{
//   _id: user.uid,
//   name: user.name,
//   avatar: user.avatar
// }}
