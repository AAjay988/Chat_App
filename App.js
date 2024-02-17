import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import FirstScreen from './src/screens/FirstSCreen';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import database from '@react-native-firebase/database';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import SignupScreen from './src/screens/SignupScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChattingScreen from './src/screens/ChattingScreen';

const App = () => {
  const [user, setUser] = useState(null);
  // const userExist = value => {
  //   setUser(value);
  //   if (initializing) {
  //     setInitializing(false);
  //   }
  // };
  useEffect(() => {
    const authSubscriber = auth().onAuthStateChanged(userExist => {
      if (userExist) {
        setUser(userExist)
      } else {
        setUser('')
      }
    })
    return () => {
      authSubscriber()
    }
  }, []);
  //const reference = database().ref('/users/Aj123');
  useEffect(() => {
    database()
      .ref('/users/Aj123')
      .on('value', snapshot => {
       // console.log('User data: ', snapshot.val());
        // Do something with the user data if needed
      });
  }, []);
  //console.log(userDetails);
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <>
            {user ? (
              <>
                <Stack.Screen
                  name="Dashboard"
                  component={DashboardScreen}
                  options={{
                    headerRight: () => (
                      <MaterialIcons
                        name="account-circle"
                        size={34}
                        color="green"
                        style={{marginRight: 10}}
                        onPress={() =>
                          auth()
                            .signOut()
                            .then(() => console.log('user signed out'))
                            .catch(console.log('error'))
                        }
                      />
                    ),
                    title:'WhatsApp'
                  }}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="Home"
                  component={FirstScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Login"
                  component={LoginScreen}
                  options={{headerShown: false}}
                />
                <Stack.Screen name="Signup" component={SignupScreen} />

                <Stack.Screen
                  name="ForgotPassword"
                  component={ForgotPasswordScreen}
                />
              </>
            )}
          </>
          <Stack.Screen name='Chatting' options={({route}) => ({title:route.params.lastName})}> 
          {props => <ChattingScreen{...props} user={user}/>}</Stack.Screen>
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};
export default App;
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
