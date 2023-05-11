import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Icon } from 'react-native-elements';
import CookieManager from '@react-native-cookies/cookies';
import { API_URL } from '../../../../App';
export const SetReminder = ({email,leadName}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Select Date');
  const [selectedTime, setSelectedtime] = useState('Select Time');
  
  const showDatePicker = () => {
    console.log("hello")
    setDatePickerVisibility(!isDatePickerVisible);
    console.log(isDatePickerVisible)

  };
  const hideDatePicker = ({navigation}) => {
    setDatePickerVisibility(false);
  };
  const handleDateConfirm = async(date) => {
    const currentDate = new Date();
    const currentSec = currentDate.getTime();
    const dateTaken = new Date(date);
    const dtString = dateTaken.toISOString().split('T');
    const splitDate = dtString[0].split('-');
    const diff = Math.abs((currentDate.getTime() - dateTaken.getTime()) / 1000)
    setSelectedDate(diff + 3600)
    console.log(diff+3600)
    console.log(date)
    setDatePickerVisibility(false)
    try {
      const cookies = await CookieManager.get('http://localhost/8081');
      fetch(`${API_URL}/reminderUpdate`, {
        method: 'POST',
        headers: {
          "Content-type":"application/json",
          Accept:"application/json",
          Authorization: `Bearer ${cookies.Employee.value}`,
        },
        body:JSON.stringify({
          reminder:diff+3600,
          date:date,
          email,
          leadName
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          sendDataToBackend({ date: splitDate });
          navigation.gavigate("Pending Stack")
        })
        .catch(err => {
         console.log(err);
        });
    } catch (error) {
     console.log(error);
    }
  };


  return (
    <View>
      <TouchableOpacity
        style={styles.alarm}
        onPress={() => {
          showDatePicker();
        }}
      >
        <Icon name="alarm" color="white"
         />
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
        minimumDate={new Date()}

      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 50,
  },
  touchable: {
    width: '50%',
    height: 50,
    borderWidth: 1,
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
    color: "gray",
  },
  alarm: {
    margin: 5,
    backgroundColor: '#ddc84e',
    borderRadius: 50,
    padding: 10,
  },
});
