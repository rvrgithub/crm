import { View, StyleSheet, Button, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon } from 'react-native-elements';
import { StatusFile } from './StatusFile';
import { TouchableOpacity } from 'react-native-gesture-handler';
import UpdateFields from './UpdateFields';
import LogsData from './LogsData';
import CookieManager from '@react-native-cookies/cookies';
import { LabelFile } from './LabelFile';
import { SetReminder } from './SetReminder';
import { API_URL } from '../../../../App';
export const StatusMailFile = ({ route, navigation }) => {

  const [lead, setLead] = useState("")
  const [status, setStatus] = useState(false);
  const [addStatus, setAddStatus] = useState('');
  const [labelState, setLabelState] = useState("");
  const [getDate, setGetDate] = useState("");
  const [state, setState] = useState(0);
  const [updateField, setUpdateField] = useState(false);
  const [addLabelTimer, setAddLabelTimer] = useState(15);

  const [callLogs, setCallLogs] = useState(false);
  const [updatetime, setUpdateTime] = useState("");
  const logData = route.params.logData;
  
  useEffect(() => {
    getCookies();
  }, []);
  const getCookies = async () => {
    try {
      const cookies = await CookieManager.get('http://localhost/8081');
      fetch(`${API_URL}/singleLead`, {
        method: 'POST',
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${cookies.Employee.value}`,
        },
        body: JSON.stringify({
          email: route.params.email
        })
      })
        .then(res => res.json())
        .then(data => {
          setGetDate(data.createdAt)
          if(data.work==null){
            setAddStatus("Not Updated")
          }else{
            setAddStatus(data.work)
          }
        })
        .catch(err => {
          Alert(err);
        });
    } catch (error) {
      Alert(error);
    }
  };


const dateTaken=new Date(getDate)

const currentDate = new Date();
const difftime= parseInt(Math.abs((currentDate.getTime()-dateTaken.getTime())/1000));


const labelUpdate=()=>{if (172800 > difftime) {
      setLabelState('Hot');
    } else if ( 345600 >difftime && difftime>172800) {
      setLabelState('Warm');
    } else if( 345600 >difftime){
      
      setLabelState('Cold');
    }
  }
  useEffect(()=>{
    labelUpdate()
  },[getCookies])



  return (
    <View style={styles.container}>
      <View style={styles.nameTimerFlex}>
        <Text
          style={{
            fontSize: 27,
            margin: 15,
          }}>
          {route.params.name}
        </Text>
      </View>
      <View
        style={styles.statusStyle}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#cfcfd5', fontSize: 15 }}>Status</Text>
          <Text style={{ fontSize: 20 }}>
            {addStatus}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#cfcfd5', fontSize: 40 }}> | </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#cfcfd5', }}>Label</Text>
          <Text style={{ fontSize: 20, color: labelState === 'Hot' ? 'red' : labelState === 'Warm' ? 'blue' : 'green' }}>
            {' '}
            {labelState}
          </Text>
        </View>
      </View>
      <View style={styles.features}
      >
        <Text style={styles.edit}>
          <TouchableOpacity>
            <Icon name="edit" color="white"
              onPress={() => {
                setState(1);
                setStatus(!status);
                setCallLogs(false);
                setUpdateField(false);
                setCallLogs(false);
              }}
            />
          </TouchableOpacity>
        </Text>
        <Text style={styles.update}>
          <TouchableOpacity>
            <Icon
              name="update"
              color="white"
              onPress={() => {
                setState(2);
                setUpdateField(!updateField);
                setCallLogs(false);
                setStatus(false);
              }}
            />
          </TouchableOpacity>
        </Text>
        <Text style={styles.phone}>
          <TouchableOpacity>
            <Icon name="phone" color="white"
              onPress={() => {
                setState(3);
                setCallLogs(!callLogs);
                setUpdateField(false);
                setStatus(false);
              }}
            />
          </TouchableOpacity>
        </Text>

        <SetReminder email={route.params.email} leadName={route.params.name}/>

      </View>
      {state === 1 ? (

        <View style={styles.statusContainer}>
          {status ? (
            <StatusFile
              email={route.params.email}
              status={status}
              setstatus={setStatus}
              setAddStatus={setAddStatus}
            />
          ) : null}
        </View>
      ) :



        state === 2 ? (

          <View style={styles.statusContainer}>
            {updateField ? (
              <UpdateFields
                updateField={updateField}
                setUpdateField={setUpdateField}
                navigation={navigation}
                email={route.params.email}
              />
            ) :
              null}
          </View>
        ) :

          state === 3 ? (

            <View>
              {
                callLogs ? (
                  <LogsData
                    logData={logData}
                  />
                ) :
                  null
              }
            </View>

          ) :
            null
      }




    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  statusStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  statusContainer: {
    display: "flex",
    justifyContent: "flex-end",
    position: "absolute",
    bottom: 4,
    left: 0,
    right: 0,
  },

  
  features: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    
  },
  edit: {
    margin: 5,
    marginRight: 20,
    backgroundColor: '#2d3ee6',
    borderRadius: 50,
    padding: 10,
  },
  update: {
    margin: 5,
    backgroundColor: '#f04b57',
    borderRadius: 50,
    padding: 10,
    marginRight: 20,
  },
  phone: {
    margin: 5,
    backgroundColor: 'green',
    borderRadius: 50,
    padding: 10,
    marginRight: 20,
  },

});



