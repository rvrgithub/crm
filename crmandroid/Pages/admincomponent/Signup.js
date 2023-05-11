import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { button1 } from '../../shared/Button'
import { errormessage, formgroup, head1, head2, input, input1, label, link, link2 } from '../../shared/Formcss'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from './Login';
import { API_URL } from '../../App';
const Signup = ({
    navigation
}) => {

    const [passwordShow, setPasswordShow] = useState(true)
    const [confirmPassword, setConfirmPassword] = useState(true)
    const [fdata, setFdata] = useState({

        userName: '',
        name: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
    })
    console.log(fdata);

    const [errormsg, setErrormsg] = useState(null);

    const Sendtobackend = () => {
        console.log(fdata);
        // if (fdata.userName = '' ||
        //     fdata.name == '' ||
        //     fdata.email == '' ||
        //     fdata.mobile == '' ||
        //     fdata.password == '' ||
        //     fdata.confirmPassword == ''
        // ) {
        //     // setErrormsg('All fields are required');
        //     // return;
        // } else {
        // if (fdata.password != fdata.confirmPassword) {
        //     setErrormsg('Password and Confirm Password must be same');
        //     return;
        // } else {
        console.log(fdata)
        fetch(`${API_URL}/userRegister`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...fdata })


        })
            .then(res => res.json())
            .then(data => {
                console.log(data, "from data")
                if (data.status === false) {
                    // setErrormsg('Invalid Credentials: ')
                    console.log(data.message);
                } else {
                    alert("Register Successful");
                    navigation.navigate('loginStack');
                }
            })
            .catch(error => {
                console.error('Error in network request:', error);
            });
    }
    //     }
    // }
    return (
        <View style={styles.container}>
            {/* <Image style={styles.patternbg} source={pattern} /> */}

            <View style={styles.container1}>
                <View style={styles.s1}>

                </View>
                <ScrollView style={styles.s2}>
                    <Text style={head1}>Create a New Account</Text>
                    <Text style={link2}>Already Registered?&nbsp;
                        <Text style={link}
                            onPress={() => navigation.navigate('loginStack')}
                        >
                            Login here
                        </Text>
                    </Text>
                    {
                        errormsg ? <Text style={errormessage}>{errormsg}</Text> : null
                    }
                    <View style={formgroup}>
                        <Text style={label}>User Name</Text>
                        <TextInput style={input} placeholder="Enter your Name"
                            onPressIn={() => setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, userName: text })}
                        />
                    </View>
                    <View style={formgroup}>
                        <Text style={label}>Name</Text>
                        <TextInput style={input} placeholder="Enter your Name"
                            onPressIn={() => setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, name: text })}
                        />
                    </View>
                    <View style={formgroup}>
                        <Text style={label}>Email</Text>
                        <TextInput style={input} placeholder="Enter your Email"
                            onPressIn={() => setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, email: text })}
                        />
                    </View>
                    <View style={formgroup}>
                        <Text style={label}>Mobile</Text>
                        <TextInput style={input} placeholder="Enter your Mobile No."
                            onPressIn={() => setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, mobile: text })}
                        />
                    </View>
                    <View style={formgroup}>
                        <Text style={label}>Password</Text>
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
                        <Text style={label}>Confirm Password</Text>
                        <TextInput style={input} placeholder="Confirm your Password"
                            onPressIn={() => setErrormsg(null)}
                            secureTextEntry={confirmPassword}
                            onChangeText={(text) => setFdata({ ...fdata, confirmPassword: text })}
                        />
                        <TouchableOpacity>
                            {confirmPassword ? <Ionicons style={styles.eyeIcon} name="eye-off-outline" size={24} color="black" value={confirmPassword} onPress={() => { setConfirmPassword(!confirmPassword) }} /> : <Ionicons name="eye-outline" style={styles.eyeIcon} size={24} color="black" value={confirmPassword} onPress={() => { setConfirmPassword(!confirmPassword) }} />}
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ marginBottom: 30 }}
                        onPress={() => {
                            Sendtobackend();
                        }}
                    >
                        <Text style={button1}

                        >Signup</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    )
}

export default Signup

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: "black"

    },
    // patternbg: {
    //     position: 'absolute',
    //     top: 0,
    //     width: '100%',
    //     height: '100%',
    //     zIndex: -1,
    // },
    container1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
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
        fontSize: 30,
        color: '#fff',
    },
    s2: {
        display: 'flex',
        backgroundColor: '#fff',
        width: '100%',
        height: '90%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,

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
        backgroundColor: "#FFB0CC",
        borderRadius: 20,
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
        // right: 9,  
        top: -36,
        right: 15
    },
})