
import CookieManager from '@react-native-cookies/cookies';
import { useEffect } from 'react';

const Logout = ({ navigation }) => {
    const tokenExpairy = async () => {
        CookieManager.clearAll()
            .then((success) => {
                console.log('CookieManager.clearAll =>', success);
                alert("Logout Successfull")
            });
        navigation.navigate('Login Stack')
    }
    useEffect(() => {
        tokenExpairy()
    },
        []);

    return (
        null
    );
};

export default Logout;
