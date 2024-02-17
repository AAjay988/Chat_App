import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Avatar, IconButton} from 'react-native-paper';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const ChatsScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const userUid = await AsyncStorage.getItem('userId');
    database()
      .ref('/users/')
      .on('value', snapshot => {
        const userData = snapshot.val();
        {
      //     console.log(userData);
      // setUsers(Object.values(userData))
        }
        const tempUsers = [];
        Object.keys(userData).map(userId => {
          //console.log(userId,userUid);
          if (userId !== userUid) {
            tempUsers.push({
              ...userData[userId],
              uid: userId,
            });
          }
        });
        setUser(tempUsers);
      });
  };

  const renderAvatarColor = index => {
    const colors = [
      '#FF5733',
      '#33FF57',
      '#5733FF',
      'orange',
      'yellow',
      'indigo',
      'red',
    ];
    return colors[index % colors.length];
  };

  const RenderCard = ({item, index}) => {
    //console.log(item);
    const handleButton = () => {
      navigation.navigate('Chatting', {name: item.lastName,uid:item.uid});
    };

    return (
      <TouchableOpacity onPress={handleButton}>
        <View style={styles.myCard}>
          <Avatar.Text
            size={50}
            label={`${item.firstName.charAt(0)}${item.lastName.charAt(0)}`}
            color="white"
            style={{backgroundColor: renderAvatarColor(index)}}
          />
          <View>
            <Text
              style={
                styles.fontStyle
              }>{`${item.firstName} ${item.lastName}`}</Text>
            <Text style={styles.fontStyle}>{item.phoneNumber}</Text>
            <Text style={styles.fontStyle}>{item.email}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={user}
        keyExtractor={item => item.uid}
        renderItem={({item, index}) => <RenderCard item={item} index={index} />}
      />
      <View
        style={{
          flex: 1,
          alignSelf: 'flex-end',
          justifyContent: 'flex-end',
          marginBottom: 10,
        }}>
        <IconButton
          icon={'plus'}
          iconColor="grey"
          size={40}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};
export default ChatsScreen;
const styles = StyleSheet.create({
  container: {
    height: '100%',
    //backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
  fontStyle: {
    fontSize: 20,
    marginLeft: 15,
    color: 'black',
  },
  imgStyle: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'green',
  },
  myCard: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 90,
    margin: 2,
    width: 428,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
});
