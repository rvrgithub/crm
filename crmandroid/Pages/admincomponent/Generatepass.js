
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { API_URL } from '../../App';
const Generatepass = ({ navigation }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleNewPasswordChange = (text) => setNewPassword(text);
    const handleConfirmPasswordChange = (text) => setConfirmPassword(text);

    const toggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    const handleSubmit = () => {
        if (newPassword !== confirmPassword) {
            alert("Password must be the same.")
            return;
        }
        fetch(`${API_URL}/adminchangepassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: newPassword, confirmPassword: confirmPassword }),
        })
            .then(response => response.json())
            .then(data => {
                navigation.navigate('loginStack');
                alert("You have successfully changed your password.")
            })
            .catch(error => {
                console.error("Error:", error);
            });
    };

    return (
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f5a']} style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={!showNewPassword}
                        placeholder="New Password"
                        onChangeText={handleNewPasswordChange}
                        value={newPassword}
                    />
                    <Icon name={showNewPassword ? 'eye-slash' : 'eye'} onPress={toggleNewPasswordVisibility} size={25} />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={!showConfirmPassword}
                        placeholder="Confirm New Password"
                        onChangeText={handleConfirmPasswordChange}
                        value={confirmPassword}
                    />
                    <Icon name={showConfirmPassword ? 'eye-slash' : 'eye'} onPress={toggleConfirmPasswordVisibility} size={25} />
                </View>
                {/* <Button title="Submit" onPress={handleSubmit} /> */}
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} >
                    <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
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
    inputContainer: {
        marginVertical: 10,
        height: 45,
        width: 300,
        justifyContent: 'center',
        borderWidth: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        height: 40,
        width: 220,
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

export default Generatepass;
