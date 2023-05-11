import { StyleSheet, Text, View, TextInput, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
// import { Dropdown } from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import CookieManager from '@react-native-cookies/cookies';
import { API_URL } from '../../App';
import EmployeeList from './EmployeeList';
const CreateTask = () => {

    const [empList, setEmpList] = useState([])
    // const handelCreateTask = async () => {
    //     const cookies = await CookieManager.get('http://localhost/8081');
    //     try {
    //        if(cookies.Admin.name=="Admin"){
    //         const response = await fetch(`${API_URL}/empId`, {
    //             method: 'GET',
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Accept: "application/json",
    //                 'x-api-key': ` ${cookies.Admin.value}`
    //             },
    //         });
    //         const data = await response.json();
    //         console.log(data)
    //     }
    //     } catch (error) {
    //         console.error("catch error" + error);
    //     }
    // }

    // useEffect(()=>{
    //     handelCreateTask()
    // },[])

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Select Employee
                </Text>
            );
        }
        return null;
    };

    // Manual Task Create
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [error, setError] = useState("")

    const handleSubmit = async () => {
        const data = {
            name: name,
            contact: contact,
            email: email,
            message: msg,
            employeeId: employeeId
        };
        // if(data.employeeId==""){
        //     return alert("Please select EmployeeId")
        // }
        console.log(data)
        try {
            const cookies = await CookieManager.get('http://localhost/8081');
            if(cookies.Admin.name=="Admin"){
            const response = await fetch(`${API_URL}/reAllocate`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    'x-api-key': ` ${cookies.Admin.value}`
                },
                body: JSON.stringify(data)
            });
            response.json()
                .then(data => {
                    if (data.status == true) {
                        alert("Task created successfully!");
                        setEmail("")
                        setMsg("")
                        setEmployeeId("")
                        setContact("")
                        setName("")
                        setError("")
                    } else {
                        setError(data.message)
                        console.log(data)
                        // Alert.alert("Task creation failed!");
                    }
                })
                .catch(error => {
                    console.error(error);
                    alert("hello Something went wrong!");
                });
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong!");
        }
    };

    const getEmployee = async () => {
        fetch(`${API_URL}/empId`, {
            method: "GET",
            headers: {
                "Content-TYpe": "apllication/json",
                Accept: "apllication/json"
            }
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                setEmpList(data.message);
            })
    }
    useEffect(() => {

        getEmployee()
    }, []);

    return (
        <>
            <KeyboardAvoidingView behavior="height" style={styles.container}>
                <View style={styles.container1}>
                    <ScrollView style={styles.scroll_view} keyboardDismissMode="on-drag">
                        <View style={styles.formgroup}>
                            <Text style={styles.Manual_task}>Create Manual Task</Text>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor="#000"
                                placeholder="Client Name"
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={(text) => setName(text)}
                                value={name}
                            />
                            <TextInput
                                style={styles.input}
                                placeholderTextColor="#000"
                                placeholder="Client Contact"
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={(text) => setContact(text)}
                                value={contact}
                                keyboardType='decimal-pad'
                                maxLength={10}
                                MinLength={10}
                            />
                            <TextInput
                                style={styles.input}
                                placeholderTextColor="#000"
                                placeholder="Client Email"
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={(text) => setEmail(text)}
                                value={email}
                            />
                            <TextInput
                                style={styles.input}
                                placeholderTextColor="#000"
                                placeholder="Client Message"
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={(text) => setMsg(text)}
                                value={msg}
                            />
                            <View  style={styles.input}>

                                <Picker
                                    selectedValue={employeeId}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setEmployeeId(itemValue)
                                    }>
                                        <Picker.Item label={"Please Select EmployeeId"} value={"No Employee"} key={"item"}/>
                                    {empList.map((item) => {
                                        return <Picker.Item label={item.userName} value={item.employeeId} key={item}/>
                                    })}

                                </Picker>

                            </View>

                            {/* <TouchableOpacity onPress={() => handelCreateTask}> */}
                            {/* <View style={styles.container2}> */}
                            {/* {renderLabel()} */}
                            {/* <Dropdown
                                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={empList}
                                        search
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={!isFocus ? 'Select Employee' : '...'}
                                        searchPlaceholder="Search..."
                                        value={value}
                                        onFocus={() => setIsFocus(true)}
                                        onBlur={() => setIsFocus(false)}
                                        onChange={item => {
                                            setValue(item.value);
                                            setIsFocus(false);
                                        }}
                                        renderLeftIcon={() => (
                                            <AntDesign
                                                style={styles.icon}
                                                color={isFocus ? 'blue' : 'black'}
                                                name="Safety"
                                                size={20}
                                            />
                                        )}
                                    />
                                </View> */}
                            {/* </TouchableOpacity> */}
                            <View>
                                <Text style={{fontSize:16,marginLeft:35,color:'red'}}>{error}</Text>
                                <TouchableOpacity onPress={handleSubmit} style={styles.submit}>
                                    <Text style={{ fontSize: 22, color: '#fff', fontWeight: '800' }}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </>
    );
};

export default CreateTask;

// css
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,

    },
    container1: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        flex: 1,
    },
    scroll_view: {
        flex: 1,
    },
    Card2: {
        width: "100%",
        height: 80,
        flexDirection: "row",
    },
    Text: {
        padding: 20,
    },
    // create manual task
    formgroup: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        marginVertical: 3,
    },
    input: {
        marginVertical: 20,
        borderColor: 'grey',
        fontSize: 16,
        flex: 1,
        marginLeft: 'auto',
        marginRight: 'auto',
        height: 50,
        width: '85%',
        borderWidth: 1,
        backgroundColor: '#d3d3d3',
        borderRadius: 20,
        paddingVertical: 5,
        marginBottom: 3,
        paddingHorizontal: 10,
    },
    Manual_task: {
        color: '#000',
        fontWeight: 'bold',
        marginVertical: 20,
        textAlign: 'center',
        fontSize: 28,
        height: 30,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submit: {
        marginTop: 10,
        flex: 1,
        width: '85%',
        height: 50,
        borderRadius: 20,
        backgroundColor: 'blue',
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Text_Area: {
        backgroundColor: '#1a5acd42',
        borderRadius: 20,
        paddingVertical: 5,
        marginBottom: 3,
        paddingHorizontal: 10,
    },
    button1: {
        backgroundColor: '#5a5acd',
        color: '#fff',
        padding: 10,
        borderRadius: 20,
        fontSize: 20,
        minWidth: 150,
        textAlign: 'center',
        marginVertical: 10,
    },

    // date assign button css
    Pressable_assign: {
        backgroundColor: 'pink',
        height: 40,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },

    // dropdown css
    container2: {
        marginTop: 10,
        borderRadius: 20,
        padding: 10,
    },
    dropdown: {
        marginBottom: 10,
        backgroundColor: '#d3d3d3',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '90%',
        height: 50,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        color: '#000',
        position: 'absolute',
        backgroundColor: 'white',
        left: 50,
        top: 0,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    // Submit button
    SubmitBtn: {
        marginTop: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});








