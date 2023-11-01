import axios from "axios";
import React, { useContext, useEffect, useState } from "react"
import { Alert, AppState, Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { UserContext } from "../../feature/User/UserContext";
import { ISportRecord } from "../../interfaces/SportRecord";
import { DataTable } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../interfaces/types";
import { useParams } from "react-router-native";
import { RollInRight } from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native";
import { baseUrl } from "../../utils";
import { faPersonBiking} from '@fortawesome/free-solid-svg-icons/faPersonBiking'
import { faPersonRunning} from '@fortawesome/free-solid-svg-icons/faPersonRunning'
import { faPersonSwimming} from '@fortawesome/free-solid-svg-icons/faPersonSwimming'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type Props = {
  navigation: any
}

let iconMap = new Map<string, IconProp>([
  ["icon1", faPersonRunning],
  ["icon2", faPersonBiking],
  ["icon3", faPersonSwimming],
])

type SportRecordListProps = NativeStackScreenProps<RootStackParamList, "SportRecordList">;

export const SportRecordList = (props : SportRecordListProps) => {
  const user = useContext(UserContext);
  const [sportRecords, setSportRecords] = useState<ISportRecord[]>([]);
  const [sports, setSports] = useState<ISport[]>();
  const [updateVal, setUpdateVal] = useState(props?.route.params?.updateVal || false);

  useEffect(() => {
      getSportRecords();
      getSports();
    }, [updateVal]);

    useFocusEffect(
      React.useCallback(() => {
        getSportRecords();
        getSports();
      }, [updateVal])
    );

    function getSports() {
      axios({
        method: 'get',
        url: `${baseUrl}/api/sports`,
        headers: ({})
      }).then((response) => {
        setSports(response.data);
      });
    }

  function getSportRecords() {
    axios({
        method: 'post',
        url: `${baseUrl}/api/record`,
        data: {"username": user.username}
      }).then((response) => {
        setSportRecords([]);
        response.data.sportRecords.map((item : ISportRecord) => setSportRecords(sportRecords => [...sportRecords, item]));
      })
      .catch(error => console.log(error.response));
  }

  function deleteRecord(_id : string) {
    axios({
        method: 'post',
        url: `${baseUrl}/api/record/delete`,
        data: {"username": user.username, "_id": _id}
      }).then((response) => {
        setSportRecords([]);
        getSportRecords();
        //response.data.sportRecords.map((item : ISportRecord) => setSportRecords(sportRecords => [...sportRecords, item]));
      })
      .catch(error => console.log(error.response));
  }

  function addExercise(){
    props.navigation.navigate("AddExercise");
  }

  function userSettings(){
    props.navigation.navigate("UserSettings");
  }

  function logOutUser(): void {
    Alert.alert("Logging out...");
    user.updateUsername('');
    props.navigation.navigate("Home");
  }

    return (
      <>
      <View style={{backgroundColor: '#DADADA', padding: 10, paddingTop: 30}}>
        <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
          <View style={[styles.box, {backgroundColor: "cyan"}]}>
            <Text>Hello, {user.username}!</Text>
          </View>

        </View>
        <View style={styles.box}>
            <Text onPress={() => logOutUser()} style={{alignContent: "flex-end"}}>Logout</Text>
          </View>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => getSportRecords()}><Text style={styles.buttonLabel}>Get SportRecords</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => addExercise()}><Text style={styles.buttonLabel}>Add Exercise</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => userSettings()}><Text style={styles.buttonLabel}>User Settings</Text></TouchableOpacity>
          <DataTable>
          <DataTable.Header style={styles.head}>
                    <DataTable.Title>Icon</DataTable.Title>
                    <DataTable.Title>Sport</DataTable.Title>
                    <DataTable.Title>Date</DataTable.Title>
                    <DataTable.Title>Distance</DataTable.Title>
                    <DataTable.Title>Duration</DataTable.Title>                    
                    <DataTable.Title>Description</DataTable.Title>
                </DataTable.Header>
        
          {sportRecords?.map((record) => { return(
          <>
                <DataTable.Row id={record._id} onPress={() =>
                       Alert.alert('Alert Title', 'Choose an action', [
                        {
                          text: 'Edit',
                          onPress: () => props.navigation.navigate("AddExercise",{   
                            distance: record.distance.toString(),
                            duration: record.duration.toString(),
                            date: record.dateTime.toString(),
                            description: record.description.toString(),
                            sport: record.sport.toString(),
                            icon: record.icon.toString(),
                            _id: record._id.toString()
                          }),
                        },
                        {
                          text: 'Delete',
                          onPress: () => Alert.alert("Confirm deletion", "Are you sure?", [{text: "Yes", onPress: () => deleteRecord(record._id)}, {text: "No", onPress: () => {}}])},
                        {text: 'Cancel', onPress: () => console.log('OK Pressed')},
                      ])}
                   key={record._id} style={styles.row}>
                    <DataTable.Cell key={record.icon}>
                      <FontAwesomeIcon icon={iconMap.get(record.icon) as IconProp}></FontAwesomeIcon>
                    </DataTable.Cell>
                    <DataTable.Cell key={record._id + "-sportId"}>{record.sport}</DataTable.Cell>
                    <DataTable.Cell>{record.dateTime}</DataTable.Cell>
                    <DataTable.Cell>{record.distance}</DataTable.Cell>
                    <DataTable.Cell>{record.duration}</DataTable.Cell>
                    <DataTable.Cell>{record.description}</DataTable.Cell>
                </DataTable.Row>         
              </>)})
            }
          </DataTable>
      </View>
      </>
    )
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 100, paddingHorizontal: 30,backgroundColor: '#fff' },
  head: { height: 44, backgroundColor: 'lavender' },
  row: { height: 40, backgroundColor: 'lightyellow' },

  box: {
    width: "auto",
    padding: 5,
    height: 50,
  },

  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: '#4682b4',
    alignSelf: 'center',
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '48%',
    textAlign: 'center',
  },
  selected: {
    backgroundColor: 'coral',
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
  },
  selectedLabel: {
    color: 'white',
  },
  label: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 24,
  },
});