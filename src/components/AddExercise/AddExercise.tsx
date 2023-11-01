import axios from "axios";
import React, { ChangeEvent, useContext, useEffect, useRef, useState } from "react"
import { Alert, Button, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native"
import { UserContext } from "../../feature/User/UserContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../interfaces/types";
import * as ImagePicker from 'react-native-image-picker';
import { Dropdown } from "react-native-element-dropdown";

type AddExerciseProps = NativeStackScreenProps<RootStackParamList, "AddExercise">;

export const AddExercise = (props : AddExerciseProps) => {
  const baseUrl = "http://192.168.1.130:5000";
  const [date, setDate] = useState(props.route.params?.date || "");
  const [sport, setSport] = useState(props.route.params?.sport?.toString() || "running");
  const [distance, setDistance] = useState(props.route.params?.distance?.toString() || "");
  const [duration, setDuration] = useState(props.route.params?.duration?.toString() || "");
  const [description, setDescription] = useState(props.route.params?.description || "");
  const {username, updateUsername: setUsername} = useContext(UserContext);
  const exericiseId = props.route.params?._id || undefined;
  const [response, setResponse] = React.useState<any>(null);
  const [error, setErrorText] = useState("");
  const [sports, setSports] = useState<ISport[]>([]);

  const onButtonPress = React.useCallback((type:string, options:any) => {
    if (type === 'capture') {
      ImagePicker.launchCamera(options, setResponse);
      console.log(response);
    } else {
      ImagePicker.launchImageLibrary(options, setResponse);
    }
  }, []);

  useEffect(() => {
    getSports();
  }, []);

  function validateForm() {
    if(date.length == 0 ||  sport.length == 0 || (distance.length == 0 && duration.length == 0))
    {
      console.log("Error")
      setErrorText("Field must not be empty");
      return false;
    }
    return true;
  }

  function getSports() {
    axios({
      method: 'get',
      url: `${baseUrl}/api/sports`,
      headers: ({})
    }).then((response) => {
      setSports(response.data);
      console.log(sports);
    });
  }

  function saveExercise() {
    if(validateForm()){
      if(!exericiseId) {
        axios({
          method: 'post',
          url: `${baseUrl}/api/record/add`,
          headers: ({}),
          data: {
            "username": username, 
            "dateTime": date.toString(), 
            "sport" : sport.toString(),
            "distance": distance.toString(),
            "duration": duration.toString(),
            "description": description.toString()
          }
        }).then((response) => {
          props.navigation.navigate("SportRecordList", {updateVal: true});
        });}
        else {
          axios({
            method: 'post',
            url: `${baseUrl}/api/record/update`,
            headers: ({}),
            data: {
              "username": username, 
              "dateTime": date.toString(), 
              "sport" : sport.toString(),
              "distance": distance.toString(),
              "duration": duration.toString(),
              "description": description.toString(),
              "_id": exericiseId
            }
          }).then((response) => {
            props.navigation.navigate("SportRecordList", {updateVal: true});
          });
        }
      }
  }

    return (
      <SafeAreaView>
        <Text>ID {sport}</Text>
        {error ? <Text style={{color:"red"}}>{error}</Text> : ""}
        <Text>Date</Text>
        <TextInput
          style={styles.input}
          onChangeText={setDate}
          value={date}
        />
        <Text>Sport</Text>
        <Dropdown
          data={sports}
          onChange={(e) => setSport(e.sportName)}
          labelField={"sportName"}
          valueField={"selectionId"}
          search
          placeholder="asd"
        ></Dropdown>
        <Text>Distance</Text>
        <TextInput
          style={styles.input}
          onChangeText={setDistance}
          value={distance}
        />
        <Text>Duration</Text>
        <TextInput
          style={styles.input}
          onChangeText={setDuration}
          value={duration}
        />
        <Text>Description</Text>
        <TextInput
          style={styles.input}
          onChangeText={setDescription}
          value={description}
        />
        {/* <Button title="Capture" onPress={() => onButtonPress('capture', {saveToPhotos: true, mediaType: 'photo'})}></Button> */}
        <Button title="Save" onPress={() => saveExercise()}></Button>
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
    buttonContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginVertical: 8,
    },
  });


