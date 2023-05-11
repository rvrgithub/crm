
import React, { useState, useEffect } from 'react';
import { View, Text,Image, StyleSheet, FlatList, TouchableOpacity, Alert, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CookieManager from '@react-native-cookies/cookies';
import { API_URL } from '../../App';
import { useIsFocused } from '@react-navigation/native';
const PendingAd = () => {
    const [leads, setLeads] = useState([]);
    const [employees, setEmployees] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTask, setSelectedTask] = useState({});
    const [testing, setTesting] = useState({})
    const [assignTaskModalVisible, setAssignTaskModalVisible] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [change, setChange] = useState(false)

    const isFocused = useIsFocused();
    useEffect(() => {
        fetchData()
        getEmployee()
    }, [isFocused]);
    const fetchData = async () => {
        try {
            const cookies = await CookieManager.get('http://localhost/8081');
            // console.log(cookies)
            fetch(`${API_URL}/leads/Pending`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    'x-api-key': ` ${cookies.Admin.value}`
                },
            })
                .then(response => response.json())
                // console.log("api response", response))
                .then(data => {
                    if (data.status == false) {

                        console.log('error: ' + data.message);

                    } else {
                        setRefreshing(false);
                        if(data.leads.length==0){
                            setLeads()
                        }else{
                        setLeads(data.leads);
                        }
                    
                    }
                    console.log("data", data);
                })
                .catch(err => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    }

    const getEmployee = async () => {
        fetch(`${API_URL}/empId`, {
            method: "GET",
            headers: {
                "Content-TYpe": "apllication/json",
                Accept: "apllication/json"
            }
        }).then(res => res.json())
            .then(data => {
                // console.log(data)
                setEmployees(data.message);
                setRefreshing(false);
            })
    }
    

    const reassignTask = async () => {
        console.log(selectedEmployee)
        if (selectedEmployee == undefined || selectedEmployee == "") {
            alert("Please Select Employee To Reassign")
            return;
        }
        try {
            const cookies = await CookieManager.get('http://localhost/8081');
            fetch(`${API_URL}/reAssignLeads`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    // Authorization: `Bearer ${cookies.Admin.value}`,
                    'x-api-key': ` ${cookies.Admin.value}`
                },
                body: JSON.stringify({ ...testing, userName: selectedEmployee })
            })

                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    // alert("Data has been sent to employee")
                    if(data.status==false){
                        alert(data.message)
                    }else if(data.status==true){
                    // console.log("This is we are sending to backend", data);
                    setAssignTaskModalVisible(false);
                    setSelectedTask({});
                    fetchData()
               alert("Successfully Reassign")
                    }else{

                    }
                })
                .catch((error) => {
                    alert('Error:', error)
                    console.error('Error:', error);
                });
            console.log("this is what send", { ...testing, userName: selectedEmployee })

            // setSelectedEmployee('Demo Name');
            // fetchData();
            setChange(!change)
        } catch (error) {
            console.error(error);
            alert('Error', 'Failed to reassign task.', error);
        }
    };

    // handle delete
    const handleDelete = (data) => {
        console.log(data)
        Alert.alert(
            'Confirm',
            'Are you sure you want to delete the data?',
            [
                {
                    text: 'No',
                    onPress: () => alert('You Choose to Cancel'),
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: async () => {
                        try {
                            const cookies = await CookieManager.get('http://localhost/8081');
                            fetch(`${API_URL}/deleteLeads`,
                                {
                                    method: 'DELETE',
                                    headers: {
                                        "Content-Type": "application/json",
                                        Accept: "application/json",
                                        'x-api-key': `${cookies.Admin.value}`
                                    },
                                    body: JSON.stringify(data),

                                })
                                .then((response) => response.json())
                                .then(data => {
                                    if (data.status == false) {
                                        console.log('error: ' + data.message);
                                    } else {
                                        console.log("Data Deleted Successfully", data)
                                        console.log(data.leads)
                                        setRefreshing(false);
                                        setLeads(data.leads);
                                        setChange(!change)
                                        fetchData()
                                    }
                                })
                                .catch((error) => {
                                    alert('Error:', error)
                                    console.error('Error:', error);
                                });

                        } catch (error) {
                            console.error(error);
                        alert('Error', 'Failed to delete data');
                        }
                    },
                },
            ],
            { cancelable: false },
        );
    };

    const Item = ({ title }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );

    // renderItem
    const RenderItem = ({ id, name, email, contact, message, assignTo, employeeId }) => (
        <View style={styles.leadContainer} key={id}>
            <Text style={styles.employeeText}><Text style={{ fontWeight: 'bold' }}>Name:</Text>  {name}</Text>
            <Text style={styles.employeeText}><Text style={{ fontWeight: 'bold' }}>Email:</Text>  {email}</Text>
            <Text style={styles.employeeText}><Text style={{ fontWeight: 'bold' }}>Contact:</Text> {contact}</Text>
            <Text style={styles.employeeText}><Text style={{ fontWeight: 'bold' }}>Message:</Text> {message}</Text>
            <Text style={styles.employeeText}><Text style={{ fontWeight: 'bold' }}>Assign to</Text>  {assignTo}</Text>
            <View style={styles.actionContainer}>
                <TouchableOpacity style={styles.reassignButton} onPress={() => {
                    setTesting({ name: name, email: email, contact: contact, message: message, assignTo: assignTo })
                    setSelectedTask({ name, email, contact, message, });

                    setAssignTaskModalVisible(true);
                }}>
                    <Text style={styles.actionText}>ReAssign</Text>
                </TouchableOpacity>
                {/* delete */}
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => {
                        handleDelete({ employeeId: employeeId, email: email })
                        // console.log("main data", leadDelete);
                    }}
                >
                    <Text style={styles.actionText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {leads ?
                <FlatList
                    data={leads}
                    renderItem={({ item }) => <RenderItem
                        id={item.id}
                       key={item.id}
                        name={item.name}
                        email={item.email}
                        contact={item.contact}
                        message={item.message}
                        assignTo={item.assignTo}
                        userName={item.userName}
                        employeeId={item.employeeId}
                    />}
                    keyExtractor={(item, index) => {
                        return item.id;
                    }}
                    refreshing={refreshing}
                    onRefresh={() => {
                        setRefreshing(true);
                        fetchData();
                    }}
                />  : <Image
                source={require('../../src/assets/nodata2.png')}
                style={{ height: 590, width:370,borderColor:"blue",borderWidth:1,borderRadius:10 }}
            />
                // <Text>No Data</Text>
            }
            <Modal visible={assignTaskModalVisible} animationType="slide">
                <View style={styles.modal}>

                    <Text style={{ color: '#000', fontSize: 28, marginBottom: 20, textAlign: 'center' }}>Select Employee</Text>
                    <Picker
                        style={{ backgroundColor: 'grey', }}
                        selectedValue={selectedEmployee}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedEmployee(itemValue)
                        }>
                        <Picker.Item label='Please select an option...' style={{ backgroundColor: '#c0c0c0' }} value="Not Selected"
                            key="x"
                        />
                        {employees && employees.map((employee, index) => (
                            <Picker.Item
                                style={{ backgroundColor: '#c0c0c0' }}
                                key={employee.name}
                                label={employee.userName}
                                value={employee.userName}
                            />
                        ))}
                    </Picker>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <TouchableOpacity

                            style={styles.reassignButton}
                            onPress={reassignTask}>
                            <Text style={styles.actionText}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => {
                                setAssignTaskModalVisible(false);
                                setSelectedTask({});
                                setSelectedEmployee();
                            // handleDelete()
                            }}>
                            <Text style={styles.actionText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View >
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    leadContainer: {
        backgroundColor: '#fff',
        elevation: 10,
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
    },
    leadText: {
        fontSize: 18,
    },
    employeeText: {
        fontSize: 18,
        color: '#000',
        marginTop: 5,
    },
    actionContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    reassignButton: {
        backgroundColor: '#6a5acd',
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 5,
        marginRight: 10,

    },
    deleteButton: {
        backgroundColor: '#4169e1',
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 5,

    },
    actionText: {
        color: '#fff',
        fontSize: 22,
    },
    backgroundImage: {
        zIndex: -1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: '100%',
        resizeMode: 'cover',
    },
    modal: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    leadContainer: {
        backgroundColor: '#fff',
        elevation: 10,
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
    },
    leadText: {
        fontSize: 18,
    },
    employeeText: {
        fontSize: 18,
        color: '#000',
        marginTop: 5,
    },
    actionContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    reassignButton: {
        backgroundColor: '#6a5acd',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginRight: 10,
    },
    deleteButton: {
        backgroundColor: '#4169e1',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    actionText: {
        color: '#fff',
        fontSize: 16,
    },
    backgroundImage: {
        zIndex: -1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: '100%',
        resizeMode: 'cover',
    }
});

export default PendingAd;

//37686451982

