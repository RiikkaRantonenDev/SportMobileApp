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

type ChangePasswordProps = NativeStackScreenProps<RootStackParamList, "ChangePassword">;

export const ChangePassword = (props : ChangePasswordProps) => {
    const {username, updateUsername} = useUser();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    // ⬇ This calls my get request from the server
  }, []);

  function saveNewPassword() {
    axios({
        method: 'post',
        url: `${baseUrl}/api/user/changepassword`,
        data: {username: username, oldpassword: oldPassword, newPassword: newPassword, confirmPassword: confirmPassword}
      }).then((response) => {
      })
      .catch(error => console.log(error.response));
      
  }


    return (
      <SafeAreaView>
        <Text>CHANGE PASSWORD</Text>
        <Text>Old password</Text>
        <TextInput
          style={styles.input}
          onChangeText={setOldPassword}
          value={oldPassword}
        />
        <Text>New Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={setNewPassword}
          value={newPassword}
        />
        <Text>Re-type new password</Text>
        <TextInput
          style={styles.input}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
        />
       
        <Button title="Save" onPress={() => saveNewPassword()}></Button>
        <Button title="Discard" onPress={() => props.navigation.navigate("UserSettings")}></Button>
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