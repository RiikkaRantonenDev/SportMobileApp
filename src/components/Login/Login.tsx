import axios from "axios";
import React, { ChangeEvent, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { Alert, Button, SafeAreaView, StyleSheet, TextInput, View } from "react-native"
import { useNavigation } from "react-router-native";
import { UserContext, useUser } from "../../feature/User/UserContext";
import LottieView from "lottie-react-native";

type Props = {
  navigation: any
}

export const Login = ({navigation}: Props) => {
  const [usernameInput, onChangeUsername] = useState('monni');
  const [password, onChangePassword] = useState('');
  const baseUrl = "http://192.168.1.130:5000";
  const {username, updateUsername} = useUser();
  const [error, setError] = useState('')

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
          if(response.data)
            updateUsername(response.data.username);
            moveToApp();
        }).catch(error => {
          console.log(error);
          setError(error);
        })
  }

  function moveToApp() {
    navigation.navigate("SportRecordList")
  }
  function moveToRegistration() {
    navigation.navigate("RegisterUser");
  }

    return (
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={onChangeUsername}
          value={usernameInput}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Password"
        />
        <Button title="Login" onPress={() => checkLogin()}></Button>
        <Button title="Register a new user" onPress={() => moveToRegistration()}></Button>       
        <Button title="Check username (debug)" onPress={() => Alert.alert(username)}></Button>
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
  });