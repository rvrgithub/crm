import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Button, Image, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import CookieManager from '@react-native-cookies/cookies';
import { API_URL } from "../../App"
import EmployeeList from './EmployeeList';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const Empstatus = ({ navigation }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [labelState, setLabelState] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        // setLoading(true);
        try {
            fetch(`${API_URL}/allEmployee/id`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.status == false) {
                        // alert('error: ' + data.message);
                        setLoading(false);
                            setRefreshing(false);
                            setData()
                    } else {
                        if (data.message.length == 0) {
                            setData()
                            setLoading(false);
                            setRefreshing(false);
                        } else {
                            setData(data.message);
                            setLoading(false);
                            setRefreshing(false);
                        }

                    }

                })
                .catch(error => {
                    alert(error);
                    setLoading(false);
                    setRefreshing(false);
                });
        } catch (err) {
            alert(err)
        }
    };

    const empStatusUpdate = async (empStatus, userName) => {
        console.log(empStatus)
        let empSt;
        if (empStatus == "Enable") {
            empSt = "Disable"
        } else if (empStatus == "Disable") {
            empSt = "Enable"
        } else if (empStatus == "Delete") {
            empSt = "Delete"
        } else {

        }
        try {
            fetch(`${API_URL}/employee/status/${empSt}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    userName
                })
            }).then(res => res.json())
                .then(data => fetchData())
        } catch (error) {

        }
    }

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={42} />
            </View>
        );
    }

    const empDetails = (userName) => {
        console.log(userName)
        navigation.navigate('Details', { userName })
    }

    return (
        <View>
            <View style={{ marginVertical: 10, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 28, color: '#000', fontWeight: '700' }}>Employee Status</Text>
            </View>
            <ScrollView
                contentContainerStyle={styles.scrollViewContent}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View style={styles.container}>
                    {data ? data.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.itemContainer} onPress={() => empDetails(item.userName
                        )}>
                            <Text style={styles.title}><Text style={{ fontWeight: '600' }}>Employee Name:</Text> {item.name}</Text>
                            <Text style={styles.title}><Text style={{ fontWeight: '600' }}>Employee Id:</Text> {item.userName}</Text>
                            <View style={{ display: "flex", flexDirection:"row",gap:20}}>
                                <Button title='delete' onPress={() => empStatusUpdate("Delete", item.userName)}/>
                                <Button title={`${item.empStatus}`} color={item.empStatus == "Enable" ? "green" : "red"} onPress={() => empStatusUpdate(item.empStatus, item.userName)} />
                            </View>
                        </TouchableOpacity>
                    )) : <Image
                        source={require('../../src/assets/nodata2.png')}
                        style={{ height: 550, width: 370, borderColor: "blue", borderWidth: 1, borderRadius: 10 }}
                    />}
                </View>
            </ScrollView >
            {/* <EmployeeList/> */}
        </View>
    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
    },
    container: {
        padding: 10,
    },
    itemContainer: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 10,
        marginVertical: 10,
        padding: 10,
    },
    title: {
        color: '#000',
        paddingVertical: 2,
        fontSize: 18,
        marginBottom: 5
    },
    body: {
        fontSize: 16,
        color: '#000',
        marginVertical: 10,
    },
    id: {
        marginVertical: 3,
        color: '#000',
        fontSize: 16,
    },
    btnCss: {
        marginLeft: 200
    }
});

export default Empstatus;
