import React, {useState, useMemo, useContext, Dispatch, SetStateAction} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Login } from './src/components/Login/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { SportRecordList } from './src/components/SportRecordList/SportRecordList';
import {UserContext, UserContextProvider, useUser} from './src/feature/User/UserContext';
import { AddExercise } from './src/components/AddExercise/AddExercise';
import { RootStackParamList } from './src/interfaces/types';
import { UserSettings } from './src/components/UserSettings/UserSettings';
import { ChangePassword } from './src/components/UserSettings/ChangePassword';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreateUser } from './src/components/CreateUser/CreateUser';

const LoginScreen = (props:any) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  return isLoading ? <Splash setIsLoading={setIsLoading}/> : (
    <Login navigation={props.navigation}></Login>
  );
}

interface SplashProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const Splash = ({setIsLoading}: SplashProps) => {
  return (
      <SafeAreaView style={{flex:1, alignItems: 'center', margin: 0}}>
          <LottieView
              source={require('./assets/athlete.json')}
              autoPlay
              loop={false}
              resizeMode='cover'
              onAnimationFinish={() => setIsLoading(false)}
          ></LottieView>
      </SafeAreaView>
  )
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const {username, updateUsername} = useUser();
  const value = useMemo(
    () => ({username, updateUsername}),
    [username]
  );

  return (
    <UserContextProvider>
      <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen
              name="Home"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SportRecordList"
              component={SportRecordList}
              options={{headerShown: false}}
              />
            <Stack.Screen
              name="AddExercise"
              component={AddExercise}/>
            <Stack.Screen
              name="UserSettings"
              component={UserSettings}/>
            <Stack.Screen
              name="ChangePassword"
              component={ChangePassword}/>
            <Stack.Screen
              name="RegisterUser"
              component={CreateUser}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
    </UserContextProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center'
  }
});