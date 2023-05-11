import { StyleSheet, TextInput, View, Text, Alert, SafeAreaView, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import CookieManager from '@react-native-cookies/cookies';
import { API_URL } from '../../App'
import EmployeeList from './EmployeeList';
import { useIsFocused } from '@react-navigation/native';
const AddEmp = () => {
    const isFocused = useIsFocused();
    useEffect(() => {

    }, [isFocused]);
    const [userid, setUserID] = useState('');
    const [error, setError] = useState("")
    // const[employee,setEmployee]=useState([])

    const [show, setShow] = useState(false)
    const handleAddID = async () => {
        const cookies = await CookieManager.get('http://localhost/8081');

        try {
            if (cookies.Admin.name == "Admin") {
                fetch(`${API_URL}/generateId`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        'x-api-key': ` ${cookies.Admin.value}`
                    },
                    body: JSON.stringify({ id: userid })
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.status == true) {

                            setUserID("")
                            setShow(!show)
                            getEmployee()
                            alert(data.message + userid)

                        }
                        else {
                            // setError("")
                            alert(data.message + userid)
                        }
                        // setUserID("")
                        // console.log(data); // do something with the response data
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong!");
        }
    };
    const [employee, setEmployee] = useState([])
    const getEmployee = async () => {
        const cookies = await CookieManager.get('http://localhost/8081');

        fetch(`${API_URL}/employeeId/list`, {
            method: "GET",
            headers: {
                "Content-TYpe": "apllication/json",
                Accept: "apllication/json",
                'x-api-key': ` ${cookies.Admin.value}`

            }
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                setEmployee(data.message);
            })
    }
    useEffect(() => {

        getEmployee()
    }, []);


    // Add Colors ...
    const colors = ['#4c66a4', '#287bbc', '#5185a8', '#1a3665', '#dd4b39'];

    return (
        <>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter User ID"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text) => setUserID(text)}
                    value={userid}
                />
                <Text>{error}</Text>
                <TouchableOpacity style={styles.addBtn} onPress={handleAddID}>
                    <Text style={styles.Addtext}>Add ID</Text>
                </TouchableOpacity>
                <SafeAreaView >
                    <ScrollView style={{ marginTop: 10, marginBottom: 150 }}>
                        {employee.map((item, index) => (
                            <TouchableOpacity key={index} style={[
                                styles.container1,
                            ]}  >
                                <View style={styles.listContainer}>
                                    <Text
                                        style={[
                                            styles.itemBox,
                                            { backgroundColor: colors[index % colors.length] },
                                        ]}>
                                        {item.userName[0].toUpperCase()}
                                    </Text>
                                    <Text style={styles.item}>{item.userName}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </SafeAreaView>
            </View>
        </>
    )
}

export default AddEmp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,

    },
    input: {
        borderColor: 'grey',
        borderRadius: 10,
        fontSize: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        height: 50,
        width: '85%',
        borderBottomWidth: 1,
        paddingVertical: 5,
        marginBottom: 3,
        paddingHorizontal: 10,
    },
    addBtn: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 125,
        height: 40,
        width: "100%",
        backgroundColor: '#483d8b',
    },
    Addtext: {
        color: '#fff',
        fontSize: 28
    },
    employee: {

        fontSize: 20,
        color: 'black',
        fontFamily: 'Times New Roman',
        paddingLeft: 30,
        paddingRight: 30,
        textShadowColor: '#585858',
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 10,
        textAlign: "left"
    },
    container1: {
        flex: 1,
        padding: 5,
        // marginBottom:40,
    },
    card: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: 'white',
        padding: 20,
        marginTop: 10
        // borderRadius: 10
    },
    //   container: {
    //     flex: 1,
    //     paddingTop: 22,
    //   },
    listContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: 60,
        borderBottomWidth: 0.2,
        // borderBottomColor: '#e5e5e8',
        borderColor: 'grey',
        padding: 5,

    },
    item: {
        padding: 10,
        fontSize: 18,
        paddingLeft: 25,
    },
    itemBox: {
        fontSize: 20,
        padding: 10,
        paddingLeft: 17,
        borderWidth: 1,
        marginLeft: 10,
        width: 50,
        fontWeight: 'bold',
        color: 'white',
        borderRadius: 3,
        borderColor: 'white',
    },
})
