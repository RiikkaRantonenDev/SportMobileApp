import axios from "axios";
import React, { ChangeEvent, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { Alert, Button, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native"
import { useNavigation } from "react-router-native";
import { UserContext, useUser } from "../../feature/User/UserContext";
import LottieView from "lottie-react-native";

type Props = {
  navigation: any
}

export const CreateUser = ({navigation}: Props) => {
  const [usernameInput, onChangeUsername] = useState("");
  const [password, onChangePassword] = useState('');
  const [description, setDescription] = useState('');
  const baseUrl = "http://192.168.1.130:5000";
  const [error, setError] = useState('')

  useEffect(() => {
    // ⬇ This calls my get request from the server
  }, []);

  function registerUser() {
    axios({
        method: 'post',
        url: `${baseUrl}/api/users/add`,
        headers: ({}),
        data: {"username": usernameInput.toString(), "password" : password.toString(), "description" : description.toString()}
      }).then((response) => {
        console.log(response.data);
        if(response.data)
          moveToApp();
      }).catch(error => {
        console.log(error);
        setError(error);
      })
  }

  function moveToApp() {
    navigation.navigate("Home")
  }

    return (
      <SafeAreaView>
        {error ? <Text>{error}</Text> : ""}
        <Text>Choose username</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeUsername}
          value={usernameInput}
        />
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
        />
        <Text>Description</Text>
        <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
        ></TextInput>
        <Button title="Register" onPress={() => registerUser()}></Button>
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