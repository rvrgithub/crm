
import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { Card } from 'react-native-paper';
import CookieManager from '@react-native-cookies/cookies';
import { API_URL } from '../../App';
export default function EmployeeDetails({ route, navigation }) {
    const [show, setShow] = useState(false)
    const [leadList, setLeadList] = useState([])
    const tableHead = ['Type', 'Duration', 'Date'];
    const tableData = [
        ['John', '25', 'New York'],
        ['Jane', '32', 'San Francisco'],
        ['Bob', '45', 'Los Angeles'],
        ['Bob', '45', 'Los Angeles'],
        ['Bob', '45', 'Los Angeles'],
        ['Bob', '45', 'Los Angeles'],
    ];
    const [showState, setShowState] = useState({});
    const handlePress = (item) => {

        // console.log("items", item)
        setShowState((prev) => ({
            ...prev,
            [item]: !prev[item] // toggle the show state for the selected fruit
        }));
    };

    const fetchDetails = async () => {
        const cookies = await CookieManager.get('http://localhost/8081');

        try {


            console.log(cookies.Admin.value)
            fetch(`${API_URL}/employee/${route.params.userName}`,
                {
                    method: "GET",
                    header: {
                        "Content-type": "application/json",
                        Accept: "application/json",
                        'x-api-key': `${cookies.Admin.value}`

                    }
                }).then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.status == false) {

                        console.log('error: ' + data.message);

                    } else {
                        // console.log("else console", data.leads)
                        if (data.message.length == 0) {
                            setLeadList()
                        } else {
                            setLeadList(data.message);
                        }
                    }
                })
        } catch (error) {
            alert(error)
        }
    }
    useEffect(() => {
        fetchDetails()
    }, [])

    const dateFun = (dateValue) => {
        const dateTime = new Date(dateValue);
        const date = dateTime.toLocaleDateString();
        return date
    }
    return (

        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.container}>

                    {leadList ? leadList.map((item, index) => {
                        return (
                            <>
                                <Card style={styles.cardCss}>
                                    <Text style={styles.created}>
                                        Created Time : {dateFun(item.createdAt)}
                                    </Text>
                                    <Text style={styles.created}>
                                        Updated Date : {dateFun(item.updatedAt)}
                                    </Text>
                                    <Text style={styles.paragraph}>
                                        Name : {item.tasks[0].name}
                                    </Text>
                                    <Text style={styles.paragraph}>
                                        Email : {item.tasks[0].email}
                                    </Text>
                                    <Text style={styles.paragraph}>
                                        Phone : {item.tasks[0].contact}
                                    </Text>
                                    <Text style={styles.paragraph}>
                                        Status : {item.status}
                                    </Text>
                                    <Text style={styles.paragraph}>
                                        Work :{item.work}
                                    </Text >
                                    <View style={styles.logs}>
                                        <Text style={{
                                            fontWeight: "bold",
                                            color: 'black', fontSize: 18, marginBottom: 10
                                        }}>   Log Details .... </Text>
                                        <TouchableOpacity key={index} onPress={() => handlePress(index)}><AntDesign name="down" size={20} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                    {/* {showState[index] ?  ():(<Text>No Data</Text>)} */}
                                    {showState[index] ?
                                        (
                                            <>
                                                {item.logs.length != 0 ? (
                                                    <View style={styles.tableContainer}>
                                                        <Table borderStyle={styles.border}>
                                                            <Row
                                                                data={tableHead}
                                                                style={styles.header}
                                                                textStyle={styles.headerText}
                                                            />
                                                            {item.logs.map((rowData, index) => (
                                                                <TableWrapper key={index} style={styles.row}>
                                                                    <Cell
                                                                        key={rowData.type}
                                                                        data={rowData.type}
                                                                        textStyle={styles.cellText}
                                                                    />
                                                                    <Cell
                                                                        key={rowData.durtion}
                                                                        data={rowData.duration}
                                                                        textStyle={styles.cellText}
                                                                    />
                                                                    <Cell
                                                                        key={rowData.dateTime}
                                                                        data={rowData.dateTime}
                                                                        textStyle={styles.cellText}
                                                                    />

                                                                </TableWrapper>
                                                            ))}
                                                        </Table>
                                                    </View>
                                                ) : <View style={styles.tableContainer}>
                                                    <Table borderStyle={styles.border}>
                                                        <Row
                                                            data={tableHead}
                                                            style={styles.header}
                                                            textStyle={styles.headerText}
                                                        />
                                                        <Cell
                                                            key={"rowData.dateTime"}
                                                            data={"No Data Found"}
                                                            textStyle={styles.cellText} />
                                                    </Table>
                                                </View>}
                                            </>
                                        )

                                        : ("")}

                                </Card >
                            </>
                        )
                    }) : <Image
                        source={require('../../src/assets/nodata2.png')}
                        style={{ height: 670, width: 390, borderColor: "blue", borderWidth: 1, borderRadius: 10 }}
                    />}
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: '#ecf0f1',
        borderColor: "black",
    },
    paragraph: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        color: 'black',
        marginLeft: 20
    },
    created: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'right',
        padding: 2,
        paddingRight: 20,

    },
    updated: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    logs: {


        display: 'flex',
        marginLeft: 10,
        display: 'flex',
        flexDirection: "row",
        // borderWidth: 1,
        justifyContent: "space-between",
        paddingRight: 40,
    },

    cardCss: {
        borderColor: "blue",
        borderWidth: 1,
        marginBottom: 20
    },


    tableContainer: {
        padding: 5,
        backgroundColor: '#fff',
    },
    border: {
        borderWidth: 1,
        borderColor: '#bfbfbf'
    },
    header: {
        height: 50,
        backgroundColor: '#f1f8ff',
    },
    headerText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18
    },
    row: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: 40
    },
    cellText: {
        textAlign: 'center',
        fontSize: 16
    }
});