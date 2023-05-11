import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import CookieManager from '@react-native-cookies/cookies';
import { API_URL } from '../../../../App';
import { TouchableOpacity } from 'react-native-gesture-handler';
const VarifyOtp = ({ navigation }) => {
    const [otp, setOtp] = useState("")
    const [errMessage, setErrmessage] = useState("")
    let [status, setStatus] = useState(false);

    const varifyCode = async () => {
        const cookies = await CookieManager.get('http://localhost/8081');
        try {
            if (cookies.Employee.name == "Employee") {
                fetch(`${API_URL}/varify/otp`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Bearer ${cookies.Employee.value}`,
                    },
                    body: JSON.stringify({
                        otp,
                    }),
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.status == false) {
                            setErrmessage(data.message)
                            return;
                        } else {
                            setStatus(false)
                            navigation.navigate("Reset")
                        }
                    })
                    .catch(err => {
                        alert(err);
                    });
            }
        } catch (error) {
            if (cookies.Admin.name == "Admin") {
                fetch(`${API_URL}/adminverfiypassword`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        "x-api-key": `${cookies.Admin.value}`,
                    },
                    body: JSON.stringify({
                        otp,
                    }),
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.status == false) {
                            setErrmessage(data.message)
                            return;
                        } else {
                            setStatus(false)
                            navigation.navigate("Reset")

                        }

                    })
                    .catch(err => {
                    alert(err);
                    });
            }
        }
    }
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.heading}>Enter Your OTP</Text>
            </View>
            <TextInput
                style={styles.email}
                autoCapitalize="none"
                autoCorrect={true}
                onChangeText={text => setOtp(text)}
                value={otp}
                placeholder={'OTP'}
            />
            <Text style={styles.error}>{errMessage}</Text>
            <TouchableOpacity style={styles.submitButton} onPress={varifyCode}>
                <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
            <View style={styles.backToLogin_Container}>
                <TouchableOpacity onPress={() => navigation.navigate('Login Stack', {
                    userId: "Log In"
                })}><Text style={styles.backToLogin_Text}>Back To Login</Text></TouchableOpacity>
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
    error: {
        marginLeft: 55,
        color:"red"
    }

})

export default VarifyOtp;