import { View, Text, StyleSheet, Button, SafeAreaView, FlatList, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react'

import {API_URL} from "../../App"
import CookieManager from '@react-native-cookies/cookies';
const EmployeeList = () => {

const [employee,setEmployee]=useState([])
const getEmployee=async()=>{
  const cookies = await CookieManager.get('http://localhost/8081');

  fetch(`${API_URL}/employeeId/list`,{
      method:"GET",
      headers:{
          "Content-TYpe":"apllication/json",
          Accept:"apllication/json",
          'x-api-key': ` ${cookies.Admin.value}`

      }
  }).then(res=>res.json())
  .then(data=>{
      console.log(data)
      setEmployee(data.message);
})
}
  useEffect(() => {
      
      getEmployee()
  }, []);
const [enableStyle, setEnableStyle] = useState("green")
const empStatusUpdate=async(empStatus,userName)=>{
    console.log(empStatus)
  let empSt;
  if(empStatus=="Enable"){
    empSt="Disable"
  }else if (empStatus=="Disable"){
    empSt="Enable"
  }else if(empStatus=="Delete"){
    empSt="Delete"
  }else{

  }
  try {
    fetch(`${API_URL}/employee/status/${empSt}`,{
      method:"POST",
      headers:{
"Content-type":"application/json",
Accept:"application/json",
      },
      body:JSON.stringify({
        userName
      })
    }).then(res=>res.json())
    .then(data=>console.log(data))
  } catch (error) {
  }
}

const onClick = (id) => {
  setEnableStyle("red");
  console.log("id", id)
}

const name = ["AAAA", "BBBBB", "CCCCC", "DDDDD", "EEEEE", "FFFFF", "GGGGG", "AAAA", "BBBBB", "CCCCC", "DDDDD", "EEEEE", "FFFFF", "GGGGG"];

return (
  <SafeAreaView >
    <ScrollView>
      {employee.map((item, index) => {
        return (
          <TouchableOpacity key={index} style={[
            styles.container,
          ]}  >
            <View style={ {
              flexDirection: 'row',
              justifyContent: "space-evenly",


            }}>
              {/* <Text style={{ fontSize: 20, color: "blue" }}>{index}</Text> */}
              <Text style={{ fontSize: 20 }}>{item.userName}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  </SafeAreaView>
)
}

export default EmployeeList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    // marginTop:30
  },
  card: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    padding: 20,
    marginTop:10
    // borderRadius: 10
  }
});