
import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { button1 } from '../../../../shared/Button'
import { errormessage, formgroup, head1, head2, input, input1, label, link, link2 } from '../../../../shared/Formcss'
import Ionicons from 'react-native-vector-icons/Ionicons';

import { API_URL } from '../../../../App';
const Signup = ({ navigation }) => {

    const [passwordShow, setPasswordShow] = useState(true)
    const [confirmPassword, setConfirmPassword] = useState(true)
    const [error, setError] = useState("")
    const [fdata, setFdata] = useState({

        userName: '',
        name: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
    })


    const [errormsg, setErrormsg] = useState(null);

    const Sendtobackend = () => {


        fetch(`${API_URL}/userRegister`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...fdata })


        })
            .then(res => res.json())
            .then(data => {
                if (data.status === false) {
                    setError(data.Message)
                } else if (data.status == true) {
                    alert("Signup Successufully")
                    navigation.navigate('Login Stack');
                }
            })
            .catch(error => {
                alert('Error in network request:', error);
            });
    }
    return (
        // <View style={styles.container}>

        <View style={styles.container1}>

            <ScrollView style={styles.s2}>
                <Text style={head1}>Create a New Account</Text>
                <Text style={link2}>Already Registered?&nbsp;
                    <Text style={link}
                        onPress={() => navigation.navigate('Login Stack')}
                    >
                        Login here
                    </Text>
                </Text>
                {
                    errormsg ? <Text style={errormessage}>{errormsg}</Text> : null
                }
                <View style={formgroup}>
                    <Text style={{color:"black",marginLeft:5}}>User Name</Text>
                    <TextInput style={input} placeholder="Enter your Name"
                        onPressIn={() => setErrormsg(null)}
                        onChangeText={(text) => setFdata({ ...fdata, userName: text })}
                    />
                </View>
                <View style={formgroup}>
                    <Text style={{color:"black",marginLeft:5}}>Name</Text>
                    <TextInput style={input} placeholder="Enter your Name"
                        onPressIn={() => setErrormsg(null)}
                        onChangeText={(text) => setFdata({ ...fdata, name: text })}
                    />
                </View>
               
                <View style={formgroup}>
                    <Text style={{color:"black",marginLeft:5}}>Mobile</Text>
                    <TextInput style={input} placeholder="Enter your Mobile No."
                        onPressIn={() => setErrormsg(null)}
                        onChangeText={(text) => setFdata({ ...fdata, mobile: text })}
                    />
                </View>
                <View style={formgroup}>
                    <Text style={{color:"black",marginLeft:5}}>Email</Text>
                    <TextInput style={input} placeholder="Enter your Email"
                        onPressIn={() => setErrormsg(null)}
                        onChangeText={(text) => setFdata({ ...fdata, email: text })}
                    />
                </View>
                <View style={formgroup}>
                    <Text style={{color:"black",marginLeft:5}}>Password</Text>
                    <TextInput style={input} placeholder="Enter your Password"
                        onPressIn={() => setErrormsg(null)}
                        secureTextEntry={passwordShow}
                        onChangeText={(text) => setFdata({ ...fdata, password: text })}
                    />
                    <TouchableOpacity>
                        {passwordShow ? <Ionicons style={styles.eyeIcon} name="eye-off-outline" size={24} color="black" value={passwordShow} onPress={() => { setPasswordShow(!passwordShow) }} /> : <Ionicons name="eye-outline" style={styles.eyeIcon} size={24} color="black" value={passwordShow} onPress={() => { setPasswordShow(!passwordShow) }} />}
                    </TouchableOpacity>
                </View>

                <View style={formgroup}>
                    <Text style={{color:"black",marginLeft:5}}>Confirm Password</Text>
                    <TextInput style={input} placeholder="Confirm your Password"
                        onPressIn={() => setErrormsg(null)}
                        secureTextEntry={confirmPassword}
                        onChangeText={(text) => setFdata({ ...fdata, confirmPassword: text })}
                    />
                    <TouchableOpacity>
                        {confirmPassword ?
                            <Ionicons
                                style={styles.eyeIcon}
                                name="eye-off-outline"
                                size={24} color="black"
                                value={confirmPassword}
                                onPress={() => { setConfirmPassword(!confirmPassword) }} />
                            : <Ionicons name="eye-outline"
                                style={styles.eyeIcon} size={24}
                                color="black" value={confirmPassword}
                                onPress={() => { setConfirmPassword(!confirmPassword) }}
                            />}
                    </TouchableOpacity>
                </View>
                <Text style={{marginLeft:10,color:"red"}}>{error}</Text>
                <TouchableOpacity style={{ marginTop: -10 }}
                    onPress={() => {
                        Sendtobackend();
                    }}
                >
                    <Text style={button1}

                    >Signup</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
        // </View>
    )
}

export default Signup

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '50%',
        display: 'flex',
        backgroundColor: "black"

    },
    container1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '300%',
        width: '100%',
        marginTop: -10,
    },
    s1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10%',
    },
    small1: {
        color: '#fff',
        fontSize: 17,
    }
    ,
    h1: {
        fontSize: 20,
        color: '#fff',
    },
    s2: {
        display: 'flex',
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',  // ... 
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
    },
    formgroup: {
        display: 'flex',
        flexDirection: 'column',
        width: '70%',
        marginTop: -10,
    },
    label: {
        fontSize: 17,
        color: "",
        marginLeft: 10,
        // marginBottom: 5,
        marginTop: -10,

    },
    input: {
        backgroundColor: "#FFB0CC",
        borderRadius: 2,
        padding: 10,
    },
    fp: {
        display: 'flex',
        alignItems: 'flex-end',
        marginHorizontal: 10,
        marginVertical: 5,
    },
    eyeIcon: {
        position: 'absolute',
        top: -36,
        right: 15
    },
    button1: {
        marginTop: -15,
    }
})
