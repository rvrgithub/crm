import React, { useState } from 'react'
import CookieManager from '@react-native-cookies/cookies';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { API_URL } from '../../../../App';
const UpdateFields = ({ navigation,email }) => {
    const [select, setSelect] = useState("");
    const statusObject = [
        { title: 'Not Interested', link: 'NotInterestedStack', color: "#d1b9eb" },
        { title: 'Completed', link: 'ArchivedStack', color: "#f7c599" },
    ];
   
    const updateToComplete=async()=>{
        try {
            const cookies = await CookieManager.get('http://localhost/8081');
            fetch(`${API_URL}/status/update`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${cookies.Employee.value}`,
              },
              body: JSON.stringify({
                email,
                status:"Complete"
              }),
            })
              .then(res => res.json())
              .then(data => {
               if(data.status==false){
                alert(data.message)
                return;
               }else{
                alert("Successfully Status Updated To Complete")

                navigation.navigate("Dashboard")
              
               }
              })
              .catch(err => {
                Alert(err);
              });
          } catch (error) {
            Alert(error);
          }
    
    }

    
    const updateToComplete2=async()=>{
        try {
            const cookies = await CookieManager.get('http://localhost/8081');
        
            fetch(`${API_URL}/status/update`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${cookies.Employee.value}`,
              },
              body: JSON.stringify({
                email,
                status:"Not Interested"
              }),
            })
              .then(res => res.json())
              .then(data => {
               if(data.status==false){
                alert(data.message)
                return;
               }else{
                updateNotIntersted()
                alert("Successfully Status Updated To Not - Interested")
                navigation.navigate("Dashboard")
              
               }
              })
              .catch(err => {
                alert(err);
              });
          } catch (error) {
            alert(error);
          }
    
    } 
var updateNotIntersted=async()=>{
    try {
        const cookies = await CookieManager.get('http://localhost/8081');
    
        fetch(`${API_URL}/notInterested`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${cookies.Employee.value}`,
          },
          body: JSON.stringify({
            email
          }),
        })
          .then(res => res.json())
          .then(data => {
          })
          .catch(err => {
Alert(err);
          });
      } catch (error) {
        Alert(error);
      }
  }
    return (
        <View style={styles.bottomSheet}>
            <View style={styles.hover}>
                    <TouchableOpacity
                        style={{
                            flex: 2,
                            justifyContent: "flex-start",
                            flexDirection: 'row',
                            paddingBottom: 10,
                            paddingTop: 20,
                            paddingLeft: 20,
                            borderColor: '#c2bdcf8f',
                            backgroundColor: `#d1b9eb`,
                            color: "white",
                            borderRadius: 10,
                            borderBottomWidth: 1,
                        }}
                        onPress={()=>updateToComplete2()}
                    >
                        <View
                            style={{
                                backgroundColor: "white",
                                color: "white",
                                borderRadius: 10,
                                width: 15,
                                height: 15,
                                margin: 9,
                            }}>
                        </View>
                        <View
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: "white"
                                }}>
                                Not Interested
                            </Text>
                        </View>
                    </TouchableOpacity>



                <TouchableOpacity
                        style={{
                            flex: 2,
                            justifyContent: "flex-start",
                            flexDirection: 'row',
                            paddingBottom: 10,
                            paddingTop: 20,
                            paddingLeft: 20,
                            borderColor: '#c2bdcf8f',
                            backgroundColor: `#f7c599`,
                            color: "white",
                            borderRadius: 10,
                            borderBottomWidth: 1,
                        }}
                        onPress={()=>updateToComplete()}
                    >
                        <View
                            style={{
                                backgroundColor: "white",
                                color: "white",
                                borderRadius: 10,
                                width: 15,
                                height: 15,
                                margin: 9,
                            }}>
                        </View>
                        <View
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: "white"
                                }}>
                               Complete
                            </Text>
                        </View>
                    </TouchableOpacity>
            </View>
        </View>
    )
}

export default UpdateFields;
const styles = StyleSheet.create({
    bottomSheet: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 10,
        borderTopColor: "gray",
    },
    hover: {
        width: "100%",
        height: 160,
        margin: 0,
    },
    closeButton: {
        width: 30,
        height: 50,
        fontSize: 25,
        marginLeft: 300,
    }
});



