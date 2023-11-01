import axios from "axios";
import React, { ChangeEvent, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { Alert, Button, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native"
import { useNavigation } from "react-router-native";
import { UserContext, useUser } from "../../feature/User/UserContext";
import LottieView from "lottie-react-native";
import { baseUrl } from "../../utils";

type Props = {
  navigation: any
}

export const Login = ({navigation}: Props) => {
  const [usernameInput, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');
  const {username, updateUsername} = useUser();
  const [error, setError] = useState(false)

  useEffect(() => {
    // ⬇ This calls my get request from the server
  }, []);

  function checkLogin() {
    axios({
        method: 'post',
        url: `${baseUrl}/api/login`,
        headers: ({}),
        data: {"username": usernameInput.toString(), "password" : password.toString()}
      }).then((response) => {
        console.log(response.data);
        if(response.data.username) {
          updateUsername(response.data.username);
          moveToApp();
        }
        if(response.data.error){
          setError(true);
        }
      })
  }

  function moveToApp() {
    navigation.navigate("SportRecordList")
  }
  function moveToRegistration() {
    navigation.navigate("RegisterUser");
  }

    return (
      <SafeAreaView style={{paddingTop: 200, alignSelf: "center"}}>
        <Text style={{fontSize: 40}}>Awesome SportTracker Appi</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeUsername}
          value={usernameInput}
          placeholder="Username"
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Password"
        />
        {error ? <Text style={{color: "red"}}>Username and password don't match</Text> : ""}
        <View style={{gap: 8}}>
          <Button title="Login" onPress={() => checkLogin()}></Button>
          <Button title="Register a new user" onPress={() => moveToRegistration()}></Button>
        </View>      
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    button: {
      padding: 10
    }
  });