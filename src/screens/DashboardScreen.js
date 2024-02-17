import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import ChatsScreen from './ChatsScreen';
import StatusScreen from './StatusScreen';
import CallsScreen from './CallsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Appbar} from 'react-native-paper';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';
import { auth } from "@react-native-firebase/auth";
import { MaterialIcons } from "react-native-vector-icons";
import ChattingScreen from './ChattingScreen';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const Tab = createMaterialTopTabNavigator();
  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out');
        navigation.navigate('Login'); 
      })
      .catch(error => {
        console.error('Error during logout:', error);
      });
  };
  return (
    <>
    {/* <Appbar.Header >
        <Appbar.Action
          icon="account-circle"
          size={34}
          color="green"
          onPress={handleLogout}
        />
    </Appbar.Header> */}
    <Tab.Navigator 
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Chats') {
            iconName = focused
              ? 'chatbubble-ellipses'
              : 'chatbubble-ellipses-outline';
          } else if (route.name === 'Status') {
            iconName = focused ? 'people-circle-outline' : 'people-circle';
          } else if (route.name === 'Calls') {
            iconName = focused ? 'call' : 'call-outline';
          }
          return <Ionicons name={iconName} size={25} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'grey',
      })}>
      <Tab.Screen name="Chats"  component={ChatsScreen}></Tab.Screen>
      <Tab.Screen name="Status"  component={StatusScreen}></Tab.Screen>
      <Tab.Screen name="Calls"  component={CallsScreen}></Tab.Screen>
    </Tab.Navigator>
    </>
  );
};
export default DashboardScreen;
const styles = StyleSheet.create({
  container: {
    height: '100%',
    //backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'black',
  },
});
