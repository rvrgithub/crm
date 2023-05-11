import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { API_URL } from '../../App';
const Forgot = ({ navigation }) => {
    const [email, setEmail] = useState("")

    const handleSubmit = () => {
        fetch(`${API_URL}/admiemail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })

        })
            .then(response => response.json()).then(
                data => {
                    console.log(data);
                    if (data.status == false) {
                        setErrormsg(data.message);
                    }
                    else {
                        alert("OTP has been sent to your mail");
                        navigation.navigate('VerfiymailStack');
                    }

                })
            .catch(error => {
                // Display an error message to the user.
                alert('An error occurred while sending the password reset request.' + error);
            });
    };
    return (
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f5a']} style={{ flex: 1 }}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.heading}>Forgot Password?</Text>
                </View>
                <TextInput
                    style={styles.email}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={text => setEmail(text)}
                    value={email}
                    placeholder={'Email'}
                />
                <Pressable style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitText}>Submit</Text>
                </Pressable>
                <View style={styles.backToLogin_Container}>
                    <Pressable onPress={() => navigation.navigate('loginStack')}><Text style={styles.backToLogin_Text}>Back To Login</Text></Pressable>
                </View>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        color: "#fff",
        fontSize: 15,
        fontWeight: 'bold',
    },
})

export default Forgot;

