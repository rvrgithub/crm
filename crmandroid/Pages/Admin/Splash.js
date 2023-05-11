import { StyleSheet, Image, View } from 'react-native'
import React, { useEffect } from 'react'
import CookieManager from '@react-native-cookies/cookies';


const Splash = ({ navigation }) => {
    const cookie = async () => {
        const cookies = await CookieManager.get('http://localhost/8081')
        // console.log("cookies token", cookies.mycookies.value);
        if (cookies) {
            navigation.navigate('Admin');
        }
        else {
            navigation.navigate('Login');
        }
    }
    useEffect(() => {
        setTimeout(() => {
            cookie()
        }, 2000)
    },)

    return (
        <View style={{
            backgroundColor: '#000',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Image source={require('../../src/assets/logo1.png')} />
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})