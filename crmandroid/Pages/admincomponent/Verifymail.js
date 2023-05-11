
import axios from 'axios';
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { API_URL } from '../../App';

const Verifymail = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');

    const handleEmailChange = (text) => setEmail(text);
    const handleOtpChange = (text) => setOtp(text);

    const handleSubmit = () => {
        fetch(`${API_URL}/adminverfiypassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                otp,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status == true) {
                    // show success message to user or navigate to next screen
                    alert(data.message)
                    navigation.navigate('GeneratepassStack');
                } else {
                    // handle unsuccessful verification, e.g. show error message
                    console.log('Verification unsuccessful');
                    alert(data.message);
                }
            })
            .catch(error => {
                // handle error from server, e.g. show error message
                console.log('Error verifying email:', error.message);
            });
    };

    return (
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f5a']} style={{ flex: 1 }}>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={handleEmailChange}
                    value={email}
                />
                <TextInput
                    style={styles.input}
                    placeholder="OTP"
                    onChangeText={handleOtpChange}
                    value={otp}
                />

                <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmit(email, otp)} >
                    <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>

                {/* <Button title="Submit" onPress={() => handleSubmit(email, otp)} /> */}
            </View>
        </LinearGradient>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        fontSize: 16,
        backgroundColor: '#fff',
        height: 45,
        width: 300,
        margin: 12,
        padding: 10,
    },
    submitButton: {
        height: 45,
        marginTop: 10,
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
});

export default Verifymail;
