import React from 'react'
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';
import { color } from 'react-native-reanimated';
const LogsData = ({ logData }) => {
// console.log(logData)
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>

                    {logData.length!=0 ? logData.map((elem, index) => (
                        <View key={index} style={{
                            padding: 10,
                            borderColor: "#909398",
                            borderWidth: 1,
                            borderRadius: 10,
                            margin: 5,
                        }}>
                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginBottom: 5,
                            }}><View style={styles.divStyle}>
                                    {`${elem.type}` === "OUTGOING" ? (
                                        <Text style={styles.textStyle}>
                                            <Text style={{ color: "green" }}>{elem.type}</Text>
                                            <Text style={{ fontSize: 10 }}>
                                                <Icon name="phone-forwarded" color={"green"}
                                                />
                                            </Text>
                                        </Text>
                                    ) : `${elem.type}` === "INCOMING" ? (
                                        <Text style={styles.textStyle}>
                                            <Text style={{ color: "blue" }}>{elem.type}</Text>
                                            <Text style={{ fontSize: 10 }}  >
                                                <Icon name="phone-callback" color={"blue"} />
                                            </Text>
                                        </Text>
                                    )
                                        : `${elem.type}` === "INCOMING" ? (

                                            <Text style={styles.textStyle}>
                                                <Text style={{ color: "red" }}>{elem.type}</Text>
                                                <Text>{"  "}</Text>
                                                <Text style={{ fontSize: 10 }}>
                                                    <Icon name="phone-missed" color={"red"} />
                                                </Text>
                                            </Text>)
                                            :

                                            (
                                                <Text style={styles.textStyle}>
                                                    <Text style={{ color: "black", fontSize: 18 }}>Not Answering</Text>
                                                    <Text>{"  "}</Text>
                                                    <Text style={{ fontSize: 8 }}>
                                                        <Icon
                                                            name="phone-disabled" color={"black"} />
                                                    </Text>
                                                </Text>)
                                    }
                                    {/* </Text> */}
                                    <Text>{"   "}</Text>
                                </View>
                                <View style={styles.divStyle}>
                                    <Text style={styles.textStyle}>Contact:- {""}</Text>
                                    <Text style={styles.textStyle}>{elem.phoneNumber}</Text>
                                </View>
                            </View>
                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 5,
                            }}>


                                <View style={styles.divStyle}>

                                    <Text style={styles.textStyle}>
                                        Duration:- {"   "}
                                    </Text>
                                    <Text style={styles.textStyle}>{elem.duration}</Text>
                                </View>
                                <View style={styles.divStyle}>
                                    <Text style={styles.textStyle}>
                                        {elem.dateTime}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )) :<Text style={{fontSize:20,marginLeft:150}}>No Data</Text>}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default LogsData;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        marginTop: 30
    },

    divStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#d8dbdf",
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 20,
    },
    textStyle: {
        fontSize: 15, color: "gray"

    }
})
