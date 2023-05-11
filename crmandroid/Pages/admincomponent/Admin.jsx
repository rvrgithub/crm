import { StyleSheet, View, Text, TouchableOpacity, RefreshControl, ScrollView, FlatList, Modal, TouchableHighlight, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CookieManager from '@react-native-cookies/cookies';
import { API_URL } from '../../App';
import logo from '../../src/assets/logo1.png'
import { useIsFocused } from '@react-navigation/native';
const Admin = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        setRefreshing(true);
        setRefreshing(false);
    };
    const isFocused = useIsFocused();
    useEffect(() => {
        
    }, [isFocused]);

    const myCookie = async () => {
        const cookies = await CookieManager.get('http://localhost/8081')
    }
    useEffect(() => {
        myCookie();
    }, [])
    return (
        <>
            {/* <CustomDrawer /> */}
            {/* Tasks Cards */}
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <View style={{ backgroundColor: '#fff', flex: 1, paddingVertical: 20 }}>
                    {/* first row */}
                    <View style={styles.Card1}>
                        {/* Allocated task */}
                        <TouchableOpacity
                            onPress={() => navigation.navigate('AllocatedStack')}
                            style={styles.TouchableOpacity}>
                            <View style={styles.box1}>
                                <AntDesign
                                    style={{ textAlign: 'center' }}
                                    name='addusergroup'
                                    color={'#000080'}
                                    size={40}
                                />
                                <Text style={styles.Text}>Allocated</Text>
                                {/* <Text style={styles.Text1}>0</Text> */}
                            </View>
                        </TouchableOpacity>
                        {/* Not Interested task*/}
                        <TouchableOpacity
                            onPress={() => navigation.navigate('NotIntrestedStack')}
                            style={styles.TouchableOpacity}>
                            <View style={styles.box2}>
                                <AntDesign
                                    style={{ textAlign: 'center' }}
                                    name='dislike2'
                                    color={'#000080'}
                                    size={40}
                                />
                                <Text style={styles.Text}>Not Interested</Text>
                                {/* <Text style={styles.Text1}>0</Text> */}
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/* Second row */}
                    <View style={styles.Card2}>
                        {/* Pending Task */}
                        <TouchableOpacity
                            onPress={() => navigation.navigate('PendingStack')}
                            style={styles.TouchableOpacity}>
                            <View style={styles.box3}>
                                <AntDesign
                                    style={{ textAlign: 'center' }}
                                    name='dashboard'
                                    color={'#000080'}
                                    size={40}
                                />
                                <Text style={styles.Text}>Pending</Text>
                                {/* <Text style={styles.Text1}>0</Text> */}
                            </View>
                        </TouchableOpacity>
                        {/* Archived Completed Task */}
                        <TouchableOpacity
                            onPress={() => navigation.navigate('AchievedStack')}
                            style={styles.TouchableOpacity}>
                            <View style={styles.box4}>
                                <AntDesign
                                    style={{ textAlign: 'center', padding: 20, }}
                                    name='like2'
                                    color={'#000080'}
                                    size={40}
                                />
                                <Text style={styles.Text}>Completed</Text>
                                {/* <Text style={styles.Text1}>0</Text> */}
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomarea}>
                        <View style={styles.bottomarea1}>
                            <Image
                                source={logo}
                                style={{ height: 125, width: 125 }}
                            />
                            <Text style={{ fontSize: 25, color: 'orange' }}>Welcome!</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    );
};

export default Admin;

const styles = StyleSheet.create({
    Card1: {
        flex: 1,
        flexDirection: "row",
        marginTop:10,
        // height:"200%"
    },
    TouchableOpacity: {
        width: "50%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    Card2: {
        marginTop: 20,
        flex: 1,
        flexDirection: "row",
    },
    Text: {
        fontWeight: '600',
        marginTop: 10,
        textAlign: 'center',
        fontSize: 18,
        color: "#000",
    },
    Text1: {
        textAlign: 'center',
        fontSize: 22,
        color: "#000",

    },
    box1: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        elevation: 5,
        backgroundColor: '#f8f8ff',
        height: 150,
        width: "80%",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        padding: 10,
    },
    box2: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        elevation: 5,
        backgroundColor: '#f8f8ff',
        height: 150,
        width: "80%",
        // borderRadius: 10,
        shadowOpacity: 0.3,
        shadowRadius: 2,
        padding: 10,
    },
    box3: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        elevation: 5,
        height: 150,
        width: "80%",
        backgroundColor: "#f8f8ff",
        // borderRadius: 10,
        shadowOpacity: 0.3,
        shadowRadius: 2,
        padding: 10,
    },

    box4: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        elevation: 5,
        height: 150,
        width: "80%",
        backgroundColor: "#f8f8ff",
        // borderRadius: 10,
        shadowOpacity: 0.3,
        shadowRadius: 2,
        padding: 10,
    },

    // task show css
    header: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
    },
    backgroundImage: {
        zIndex: -1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        resizeMode: 'cover',
    },
    bottomarea: {
        marginTop: 60,
        paddingHorizontal: 20,
        paddingVertical: 10,
        height: 200
    },
    bottomarea1: {
        // borderRadius: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        elevation: 5,
        backgroundColor: '#f8f8ff',
    }
});





