import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import React, { useState,useEffect } from 'react'
import CookieManager from '@react-native-cookies/cookies';
import { API_URL } from '../../../../App';
import { TouchableOpacity } from 'react-native-gesture-handler';
const Forget = ({ navigation }) => {
    const [email, setEmail] = useState("")
const[errMessage,setErrmessage]=useState("")
const deleteCookies=async()=>{
    CookieManager.clearAll()
            .then((success) => {
            });
}
useEffect(()=>{
    deleteCookies()
},[])


const forgetPassword=()=>{
        fetch(`${API_URL}/sendcode`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              email
             
            }),
          })
            .then(res => res.json())
            .then(data => {
              
              if (data.status == false) {
                setErrmessage(data.message);
              } else {
              
                CookieManager.set('http://localhost/8081', {
                  name: data.message.role,
                  value: data.message.token,
                }).then(done => {
                  
                });
                navigation.navigate('Verify OTP');
          
              }
            });


}


    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.heading}>Enter Your Email</Text>
            </View>
            <TextInput
                style={styles.email}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={text => setEmail(text)}
                value={email}
                placeholder={'Email'}
            />
            <Text  style={styles.error}>{errMessage}</Text>
            <TouchableOpacity style={styles.submitButton} onPress={forgetPassword}>
                <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
            <View style={styles.backToLogin_Container}>
                <TouchableOpacity onPress={() => navigation.navigate('Login Stack')}><Text style={styles.backToLogin_Text}>Back To Login</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    heading: {
        marginTop: "18%",
        textAlign: "center",
        fontSize: 30,
    },
    email: {
        marginTop: 40,
        height: 45,
        padding: 10,
        marginLeft: "auto",
        marginRight: "auto",
        width: 300,
        backgroundColor: "#F5F3F3",
        borderBottomColor: "black",
        borderBottomWidth: 0.9,
    },
    submitButton: {
        height: 45,
        marginTop: 30,
        backgroundColor: "#609EF9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
        width: 180
    },
    submitText: {
        fontSize: 19,
        fontWeight: 'bold',
        color: "#fff",
        letterSpacing: 1.3
    },
    backToLogin_Container: {
        display: "flex",
        alignItems: "center",
        marginTop: 15,
    },
    backToLogin_Text: {
        color: "#6199EA",
        fontSize: 15,
        fontWeight: 'bold',
    },
    error:{
         marginLeft: 54,
         color:'red'
    }
})

export default Forget;