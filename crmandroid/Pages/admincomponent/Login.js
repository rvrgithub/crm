import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Pressable, KeyboardAvoidingView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { button1 } from '../../shared/Button'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { formgroup, head1, head2, link, link2 } from '../../shared/Formcss'
import CookieManager from '@react-native-cookies/cookies';
import { API_URL } from '../../App';

const Login = ({ navigation }) => {

f
    const [passwordShow, setPasswordShow] = useState(false)
    const [fdata, setFdata] = useState({
        email: '',
        password: ''
    })

    const [errormsg, setErrormsg] = useState(null);

    const Sendtobackend = () => {
        if (fdata.email == '' || fdata.password == '') {
            setErrormsg('All fields are required');
            return;
        }
        else {
            console.log(fdata)
            fetch(`${API_URL}/userLogin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(fdata)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status == false) {
                        console.log(data);
                    } else {
                        CookieManager.set('http://localhost/8081', {
                            name: "Employee",
                            value: data.message.token,
                        }).then(done => {
                            console.log('CookieManager.set=>', done);
                            if(data.message.role=="Admin"){
                                navigation.navigate('Admin');
                            }else{
                                navigation.navigate('Dashboard');
                            }
                        }).catch((err) => console.log("err", err))                      
                    }
                }
                )
        }
    }



    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior='height' style={styles.container1} >
                <View style={styles.s2}>
                    <Text style={head1}>Login</Text>
                    <Text style={head2}>Sign in to continue</Text>
                    {
                        errormsg ? <Text style={styles.errormessage}>{errormsg}</Text> : null
                    }
                    <View style={formgroup}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput style={styles.input}
                            placeholder="Enter your email"
                            placeholderTextColor={'#000'}
                            onPressIn={() => setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, email: text })}
                        />
                    </View>
                    <View style={formgroup}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput style={styles.input}
                            placeholder="Enter your password"
                            placeholderTextColor={'#000'}
                            secureTextEntry={false}
                            onChangeText={(text) => setFdata({ ...fdata, password: text })}
                            onPressIn={() => setErrormsg(null)}

                        />
                        <TouchableOpacity>
                            {passwordShow ? <Ionicons style={styles.eyeIcon} name="eye-off-outline" size={24} color="black" value={passwordShow} onPress={() => { setPasswordShow(!passwordShow) }} /> : <Ionicons name="eye-outline" style={styles.eyeIcon} size={24} color="black" value={passwordShow} onPress={() => { setPasswordShow(!passwordShow) }} />}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.fp}>
                        <Pressable onPress={() => navigation.navigate('Dashboard')}>
                            <Text style={link} >Forgot Password?</Text>
                        </Pressable>
                    </View>
                    <Text style={button1}
                        onPress={() => Sendtobackend()}
                    >Login</Text>
                    <Text style={link2}>Don't have an account?&nbsp;
                        <Text style={link}
                            onPress={() => navigation.navigate('SignupStack')}
                        >
                            Create a new account
                        </Text>
                    </Text>
                </View>
                {/* </View> */}
            </KeyboardAvoidingView>
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
    label: {
        fontSize: 17,
        color: '#000',
        marginLeft: 10,
        marginBottom: 5,
    },
    input: {
        // backgroundColor: "#FFB0CC",
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
        // right: 9,
        top: -36,
        right: 15
    },
})

