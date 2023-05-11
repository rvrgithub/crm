

import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, RefreshControl } from 'react-native';

const API_URL = 'https://carrierbuild.in/Data/call_action.json';

const Callaction = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setLoading(true);
        fetch(API_URL)
            .then(response => response.json())
            .then(json => {
                setData(json);
                setLoading(false);
                setRefreshing(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
                setRefreshing(false);
            });
    };

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

    return (
        <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <View style={styles.container}>
                {data.map(item => (
                    <View key={item.id} style={styles.itemContainer}>
                        <Text style={styles.title}><Text style={{ fontWeight: '800' }}>Employee Name:</Text> {item.user_name}</Text>
                        <Text style={styles.title}><Text style={{ fontWeight: '800' }}>Client Name:</Text> {item.emp_name}</Text>
                        <Text style={styles.body}><Text style={{ fontWeight: '800' }}>Client Contact:</Text> {item.contact}</Text>
                        <Text style={styles.body}><Text style={{ fontWeight: '800' }}>Call Status:</Text> {item.call_status}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
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
        backgroundColor: '#fff',
        elevation: 10,
        marginVertical: 10,
        padding: 10,
    },
    title: {
        color: '#000',
        paddingVertical: 2,
        fontSize: 18,
    },
    body: {
        color: '#000',
        marginVertical: 10,
    },
    id: {
        marginVertical: 3,
        color: 'gray',
        fontSize: 14,
    },
});

export default Callaction;
