

import { View, StyleSheet, Text, Button } from 'react-native';
import React, { useState } from 'react';
import DocumentPicker from 'react-native-document-picker';
import { ScrollView } from 'react-native-gesture-handler';
import Papa from "papaparse"
import { API_URL } from '../../App';
const Selectfile = () => {
    const [fileResponse, setFileResponse] = useState([]);
    const [jsonData, setJsonData] = useState([]);
    console.log(jsonData);
    const testing = async () => {
        try {
            const fileResponse = await DocumentPicker.pick({
                type: [DocumentPicker.types.csv],
            });

            if (fileResponse[0]) {
                const response = await fetch(fileResponse[0].uri);
                const fileData = await response.text();
                const parsedData = Papa.parse(fileData.trim(), {
                    header: true,
                    skipEmptyLines: true,
                    newline: "\n",
                });

                setJsonData(parsedData.data)
                console.log("This is jsonData", JSON.stringify(parsedData.data))

                fetch(`${API_URL}/leads`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ jsonData }),
                })
                    .then(response => response.json())
                    .then(data => {
                        alert("Data has been sent to employee")
                        // console.log("This is data", data);
                    })
                    .catch((error) => {
                        alert('Error:', error)
                        // console.error('Error:', error);
                    });

            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View>
                <Button title="Upload CSV file" onPress={testing} />
            </View>
        </ScrollView>

    );
};

export default Selectfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'pink',
    },
    dataContainer: {
        marginTop: 20,
        padding: 20,
        backgroundColor: '#ddd',
        borderRadius: 5,
    },
    dataTitle: {
        fontWeight: 'bold',
    },
    data: {
        fontFamily: 'Courier',
    },
    uri: {
        marginTop: 20,
        fontWeight: 'bold',
    },
});


















