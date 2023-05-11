

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Adminpage from '../Pages/Admin/Adminpage';
import Employeepage from '../Pages/Employee/Employeepage';

export default function Mainscreen() {
    const [role, setRole] = useState('');
    const [redirectToAdmin, setRedirectToAdmin] = useState(false);
    const [redirectToEmployee, setRedirectToEmployee] = useState(false);

    useEffect(() => {
        if (role === 'Admin') {
            // Redirect to Adminpage
            setRedirectToAdmin(true);
        } else if (role === 'Employee') {
            // Redirect to Employeepage
            setRedirectToEmployee(true);
        }
    }, [role]);

    if (redirectToAdmin) {
        return <Adminpage />
    }

    if (redirectToEmployee) {
        return <Employeepage />
    }

    return (
        <View style={styles.container}>
            {/* <Image style={styles.patternbg} source={require('../../assets/logo1.png')} /> */}
            <Image style={{ height: 200, width: 200 }} source={require('../src/assets/logo1.png')} />
            <Text style={{ color: '#fff', fontSize: 22, fontStyle: 'italic', fontWeight: 'bold' }}>Please Select Your Designation</Text>
            <TouchableOpacity style={styles.admin} onPress={() => setRole('Admin')}>
                <Text style={styles.text}>
                    Admin
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.admin} onPress={() => setRole('Employee')}>
                <Text style={styles.text}>
                    Employee
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    admin: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 200,
        marginTop: 20,
        backgroundColor: '#fff',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#000',
    }
});
