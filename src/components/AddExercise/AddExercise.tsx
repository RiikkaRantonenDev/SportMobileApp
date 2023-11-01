import axios from "axios";
import React, { ChangeEvent, useContext, useEffect, useRef, useState } from "react"
import { Alert, Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { UserContext } from "../../feature/User/UserContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../interfaces/types";
import * as ImagePicker from 'react-native-image-picker';
import { Dropdown } from "react-native-element-dropdown";
import { baseUrl } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons/faMugSaucer'
import { faPersonBiking } from '@fortawesome/free-solid-svg-icons/faPersonBiking'
import { faPersonRunning } from '@fortawesome/free-solid-svg-icons/faPersonRunning'
import { faPersonSwimming } from '@fortawesome/free-solid-svg-icons/faPersonSwimming'

type AddExerciseProps = NativeStackScreenProps<RootStackParamList, "AddExercise">;

export const AddExercise = (props : AddExerciseProps) => {
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
  const [icon, setIcon] = useState(props.route.params?.icon?.toString() || "");

  useEffect(() => {
    getSports();
  }, []);

  function validateForm() {
    if(date.length == 0 ||  sport.length == 0 || (distance.length == 0 && duration.length == 0))
    {
      console.log("Error");
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
            "description": description.toString(),
            "icon": icon.toString()
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
              "icon": icon.toString(),
              "_id": exericiseId
            }
          }).then((response) => {
            props.navigation.navigate("SportRecordList", {updateVal: true});
          });
        }
      }
  }

    return (
      <SafeAreaView style={{padding: 20}}>
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
        <Text>Icon</Text>
        <View  style={styles.iconsWrapper}>
          <TouchableOpacity id="icon-1" style={[styles.iconContainer, icon == "icon1" ? styles.activeIcon : styles.inactiveIcon]} onPress={() => setIcon("icon1")}>
            <FontAwesomeIcon icon={ faPersonRunning} />
          </TouchableOpacity>
          <TouchableOpacity id="icon-2" style={[styles.iconContainer, icon == "icon2" ? styles.activeIcon : styles.inactiveIcon]} onPress={() => setIcon("icon2")}>
            <FontAwesomeIcon icon={ faPersonBiking }/>
          </TouchableOpacity>
          <TouchableOpacity id="icon-3" style={[styles.iconContainer, icon == "icon3" ? styles.activeIcon : styles.inactiveIcon]} onPress={() => setIcon("icon3")}>
            <FontAwesomeIcon icon={ faPersonSwimming }/>
          </TouchableOpacity>
        </View>
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
        <SafeAreaView style={{gap: 12}}>
          <Button title="Save" onPress={() => saveExercise()}></Button>
          <Button title="Discard" onPress={() => props.navigation.navigate("SportRecordList", {updateVal: true})}></Button>
        </SafeAreaView>
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
  iconContainer: {
    padding: 10,
    border: "1px solid black"
  },
  iconsWrapper: {
    flex: 0,
    flexDirection: 'row'
  },
  activeIcon: {
    backgroundColor: "cyan"
  },
  inactiveIcon:{
    backgroundColor: "gray"
  }
  });


