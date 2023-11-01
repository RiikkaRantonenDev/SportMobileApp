import axios from "axios";
import React, { ChangeEvent, useContext, useEffect, useState } from "react"
import { Alert, Button, SafeAreaView, StyleSheet, Text, TextInput } from "react-native"
import { useNavigation } from "react-router-native";
import { UserContext, useUser } from "../../feature/User/UserContext";
import { ISportRecord } from "../../interfaces/SportRecord";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../interfaces/types";
import { SportRecordList } from "../SportRecordList/SportRecordList";
import { baseUrl } from "../../utils";
import { IUser } from "../../interfaces/User";

type UserSettingsProps = NativeStackScreenProps<RootStackParamList, "UserSettings">;

export const UserSettings = (props : UserSettingsProps) => {
    const {username, updateUsername} = useUser();
    const [userPassword, setUserPassword] = useState("");
    const [userHeight, setUserHeight] = useState('')
    const [userBirthYear, setUserBirthYear] = useState('');
    const [userWeight, setUserWeight] = useState('');
    const [userDescription, setUserDescription] = useState("");
    const [userId, setUserId] = useState("");
    const [changeableUsername, setUsername] = useState("");
    const [usernameInformation, setUsernameInformation] = useState(username);

  useEffect(() => {
    // ⬇ This calls my get request from the server
    getUserInformation();
  }, []);

  function getUserInformation() {
    axios({
        method: 'post',
        url: `${baseUrl}/api/record`,
        data: {username: username}
      }).then((response) => {
        setUserHeight(response.data.height);
        setUserWeight(response.data.weight);
        setUserBirthYear(response.data.birthyear);
        setUserDescription(response.data.description);
        setUserId(response.data._id);
        setUsernameInformation(username);
      })
      .catch(error => console.log(error.response));
      
  }

  function saveUserInformation() {
    console.log("päivitettään uusi käyttäjänimi: " + usernameInformation);
{      axios({
          method: 'put',
          url: `${baseUrl}/api/user/update`,
          headers: ({}),
          data: {
            height: userHeight,
            weight: userWeight,
            birthyear: userBirthYear,
            description: userDescription,
            _id: userId,
            //password: "",
            username: usernameInformation
          }
        }).then((response) => {

        });}
        updateUsername(usernameInformation);
        props.navigation.navigate("SportRecordList", {updateVal: true});
  }

  function changePassword(): void {
    throw new Error("Function not implemented.");
  }

    return (
      <SafeAreaView>
        <Text>ID</Text>
        <Text>Username</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUsernameInformation}
          value={usernameInformation}
        />
        <Text>Height</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUserHeight}
          value={userHeight}
          keyboardType="numeric"
        />
        <Text>Weight</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUserWeight}
          value={userWeight}
          keyboardType="numeric"
        />
        <Text>Birth Year</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUserBirthYear}
          value={userBirthYear}
        />
        <Text>Description</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUserDescription}
          value={userDescription                                                                              }
        />
        <Button title="Change Password" onPress={() =>  props.navigation.navigate("ChangePassword")}></Button>
        <Button title="Save" onPress={() => saveUserInformation()}></Button>
        <Button title="Discard" onPress={() => props.navigation.navigate("SportRecordList", {updateVal: true})}></Button>
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