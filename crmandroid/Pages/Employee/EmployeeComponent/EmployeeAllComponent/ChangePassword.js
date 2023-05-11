


import { Alert, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios';
import { API_URL } from '../../../../App';
import CookieManager from '@react-native-cookies/cookies';
const ChangePassword = ({ navigation }) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordHide, setPasswordHide] = useState(true)
    const[errMessage,setErrmessage]=useState("")



    const handleSubmit = async () => {
        const cookies = await CookieManager.get('http://localhost/8081');
        try {
            if (cookies.Employee.name == "Employee") {
                fetch(`${API_URL}/reset/password`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Bearer ${cookies.Employee.value}`,
                    },
                    body: JSON.stringify({
                        password
                    }),
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.status == false) {
                            setErrmessage(data.message)
                            return;
                        } else {
                            setErrmessage("")
                            setPassword("")
                            alert("Successufully Change Password")
                            navigation.navigate("Dashboard")

                        }

                    })
                    .catch(err => {
                        alert(err);
                    });
                }
            }catch(err) {
alert(err)
            }
        }

    return (
            <ScrollView keyboardDismissMode='on-drag'>
                <KeyboardAvoidingView style={styles.container}>
                    <View style={styles.keySection}>
                        <Ionicons name="ios-key-outline" size={70} color="black" />
                    </View>
                    <View style={styles.textSection}>
                        <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>ChangePassword</Text>
                    </View>
                    <View>
                        <TextInput
                            style={styles.password}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={text => setPassword(text)}
                            value={password}
                            placeholder={'Password'}
                            secureTextEntry={passwordHide}
                        />
                        <Pressable>
                            {passwordHide ? <Ionicons style={styles.eyeIcon} name="eye-off-outline" size={24} color="black" value={passwordHide} onPress={() => { setPasswordHide(!passwordHide) }} /> : <Ionicons name="eye-outline" style={styles.eyeIcon} size={24} color="black" value={passwordHide} onPress={() => { setPasswordHide(!passwordHide) }} />}
                        </Pressable>
                    </View>
                    <View>
                    </View>
                    <Text style={styles.error}>{errMessage}</Text>
                    <Pressable style={styles.submitButton} onPress={()=>handleSubmit()}>
                        <Text style={styles.submitText}>Submit</Text>
                    </Pressable>
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }

    export default ChangePassword

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        keySection: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#EAEAEA",
            height: 170,
            width: 170,
            borderRadius: 100,
            marginLeft: "auto",
            marginRight: 'auto',
            marginTop: 20
        },
        textSection: {
            alignItems: "center",
            marginTop: 30,
        },
        password: {
            marginTop: 40,
            height: 45,
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            backgroundColor: "#FFB0CC",
            borderBottomColor: "black",
            borderBottomWidth: 0.9,
            borderRadius: 20,
        },
        confirmPassword: {
            marginTop: 20,
            height: 45,
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            backgroundColor: "#FFB0CC",
            borderBottomColor: "black",
            borderBottomWidth: 0.9,
            borderRadius: 20,
        },
        submitButton: {
            height: 45,
            marginTop: 30,
            backgroundColor: "#F50057",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
            width: 180,
            borderRadius: 40
        },
        submitText: {
            fontSize: 19,
            fontWeight: 'bold',
            color: "#fff",
            letterSpacing: 1.3
        },
        eyeIcon: {
            position: "absolute",
            top: -36,
            right: 73
        },error:{
            marginLeft:65,
            color:"red"
        }
    })
