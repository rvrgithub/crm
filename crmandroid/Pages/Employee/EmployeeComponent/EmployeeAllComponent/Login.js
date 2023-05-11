

import { StyleSheet, Text, ImageBackground, View, Image, TextInput, TouchableOpacity, Pressable, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { button1 } from '../../../../shared/Button'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { formgroup, head1, head2, link, link2 } from '../../../../shared/Formcss'
import CookieManager from '@react-native-cookies/cookies';
import Splash from '../../../Admin/Splash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../../App';
const Login = ({ navigation }) => {
    
    const [loder, setLoder] = useState(true)

    const [show, setShow] = useState(false)
    const [passwordShow, setPasswordShow] = useState(true)
    const [fdata, setFdata] = useState({
        email: '',
        password: ''
    })

 
    const [errormsg, setErrormsg] = useState("");

    const Sendtobackend = async () => {
        let token = await AsyncStorage.getItem("fcmToken");

        fetch(`${API_URL}/userLogin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                email: fdata.email,
                password: fdata.password,
                token
            }),
        })
            .then(res => res.json())
            .then(data => {

                if (data.status == false) {
                    setErrormsg(data.message);
                } else {
                    CookieManager.set('http://localhost/8081', {
                        name: data.message.role,
                        value: data.message.token,
                    }).then(done => {

                        if (data.message.role == "Admin") {
                            navigation.navigate('Home');
                            setErrormsg("")
                            alert("Login Successfully")
                        } else if (data.message.role == "Employee") {
                            navigation.navigate('Dashboard');
                            alert("Login Successfully")

                            setErrormsg("")
                        }
                        else {
                            navigation.navigate('Login Stack');

                        }
                    }).catch((err) => alert("Error", err))
                }
            });
    };
    const redirect = async () => {
        const cookies = await CookieManager.get('http://localhost/8081');
        try {
            if (cookies.Employee.name == undefined) {
               return navigation.navigate("Login Stack")
            } else if (cookies.Employee.name == "Employee") {
               return navigation.navigate("Dashboard")
            }
        } catch (error) {
            if (cookies.Admin.name == undefined) {
               return navigation.navigate("Login Stack")
            } else if (cookies.Admin.name == "Admin") {
                return navigation.navigate("Home")
            }
        }

    }
    useEffect(() => {
        redirect()
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setLoder(false)
            setShow(true)
        }, 2000)
    }, [])



    return (
        <View style={styles.container}>
            {loder && <Splash />}

            {show &&

                <KeyboardAvoidingView behavior='height' style={styles.container1} >

                    <Image source={require('../../../../src/assets/logo4.png')} style={styles.image} />
                    <View style={styles.s2}>
                        <Text style={{ fontSize: 30, textAlign: "center", fontWeight: "bold", color: "black" }}>Login to continue</Text>
                        <View style={formgroup}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput style={styles.input}
                                placeholder="Enter your email"
                                placeholderTextColor={'#000'}
                                onChangeText={(text) => setFdata({ ...fdata, email: text })}
                            />
                        </View>
                        <View style={formgroup}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput style={styles.input}
                                placeholder="Enter your password"
                                placeholderTextColor={'#000'}
                                secureTextEntry={passwordShow}
                                onChangeText={(text) => setFdata({ ...fdata, password: text })}
                            />
                            <Text style={{marginLeft:10,color:"red"}}>{errormsg}</Text>
                            <TouchableOpacity>
                                {passwordShow ? <Ionicons style={styles.eyeIcon} name="eye-off-outline" size={24}
                                    color="black" value={passwordShow}
                                    onPress={() => { setPasswordShow(!passwordShow) }} />
                                    : <Ionicons name="eye-outline"
                                        style={styles.eyeIcon}
                                        size={24} color="black"
                                        value={passwordShow}
                                        onPress={() => { setPasswordShow(!passwordShow) }} />}
                            </TouchableOpacity>
                        </View>
                        <View style={styles.fp}>
                            <Pressable onPress={() => navigation.navigate('Forgot Password')}>
                                <Text style={link} >Forgot Password?</Text>
                            </Pressable>
                        </View>
                      <TouchableOpacity 
                            onPress={() => Sendtobackend()}
                        ><Text style={button1}>Login</Text></TouchableOpacity>
                        <Text style={link2}>Don't have an account?&nbsp;
                            <Text style={link}
                                onPress={() => navigation.navigate('Sign Up')}
                            >
                                Create a new account
                            </Text>
                        </Text>
                    </View>
                </KeyboardAvoidingView>}
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',

    },
    patternbg: {
        left: "18%",
        position: 'absolute',
        width: 250,
        height: 250,
        zIndex: 1,
    },
    container1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: "black",

    },
    s1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '40%',
    },
    small1: {
        color: '#fff',
        fontSize: 17,
    }
    ,
    h1: {
        fontSize: 30,
        color: '#fff',
    },
    s2: {
        display: 'flex',
        backgroundColor: '#fff',
        width: '100%',
        height: '65%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        position: "absolute",
        bottom: 0
    },
    formgroup: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginVertical: 10,
    },
    image: {
        width: 200,
        height: 200,
        marginTop: -440,
    },
    label: {
        fontSize: 17,
        color: '#000',
        marginLeft: 10,
        marginBottom: 5,
    },
    input: {
        backgroundColor: "#c0c0c0",
        borderRadius: 20,
        padding: 10,
    },
    fp: {
        display: 'flex',
        alignItems: 'flex-end',
        marginHorizontal: 10,
        marginVertical: 5,
    },
    logo: {
        height: 80,
        resizeMode: 'contain',
    },
    eyeIcon: {
        position: 'absolute',
        top: -56,
        right: 15
    },
})


