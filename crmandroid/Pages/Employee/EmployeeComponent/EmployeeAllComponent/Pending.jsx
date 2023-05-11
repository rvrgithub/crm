import { View,Image, Text, StyleSheet, SafeAreaView,RefreshControl, ScrollView, Button,TouchableOpacity, Linking, PermissionsAndroid, Alert } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import CookieManager from '@react-native-cookies/cookies';
import { Icon } from 'react-native-elements';
import CallLogs from 'react-native-call-log';
import { API_URL } from '../../../../App';
import { useIsFocused } from '@react-navigation/native';

export default function Pending({ navigation }) {
  const [logData, setLogData] = useState([]);
  const abc = (index) => {
    var randomColor = Math.floor(Math.random() * 16777215 * index).toString(16);
    let color = "";
    for (let i = 0; i < 3; i++) {
      color += ("0" + Math.floor(Math.random() * index * Math.pow(16, 2) / 2).toString(10)).slice(-2);
    }
    return `#${color}`
  }

  const [cookies, setCookies] = useState();
  const [list, setList] = useState([]);
  useEffect(() => {
    getCookies();
  }, []);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  const onRefresh = () => {
    setRefreshing(true);
    getCookies();
    setRefreshing(false);
  };

  const isFocused = useIsFocused();
 
  useEffect(() => {
    getCookies()
  }, [isFocused]);


  const getCookies = async () => {
    try {
      const cookies = await CookieManager.get('http://localhost/8081');
      setCookies(cookies);

      fetch(`${API_URL}/employee/leads/Pending`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cookies.Employee.value}`,
        },
      })
        .then(res => res.json())
        .then(data => {

         if(data.length==0){
            setList()
          }else{
            setList(data);
            
          }
        })
        .catch(err => {
          alert(err);
        });
    } catch (error) {
      alert(error);
    }
  }
  const connectCall = (contact) => {
    let number = '';
    if (Platform.OS === 'android') {
      number = `tel:${contact}`;
    } else {
      number = `tel:${contact}`;
    }
    Linking.openURL(number);
  }

  // single lead update page

  const singlePage = async (email, contact, name) => {
    if (Platform.OS != 'ios') {
      try {
        const cookies = await CookieManager.get('http://localhost/8081');
        //Ask for runtime permission
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
          {
            title: 'Call Log Example',
            message: 'Access your call logs',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
         
          CallLogs.load(1000).then(c => {
            let num = contact;
            let leadNum = num.slice(num.length - 10, num.length);
           

            let logs = c.filter(
              item =>
                item.phoneNumber.slice(
                  item.phoneNumber.length - 10,
                  item.phoneNumber.length,
                ) == leadNum,
            );

            fetch(`${API_URL}/logUpdate`, {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${cookies.Employee.value}`,
              },
              body: JSON.stringify(
                {
                  email: email,
                  logs: logs
                }
              )
            })
              .then(res => res.json())
              .then(data => {
                navigation.navigate("Status Main File", { email: email, name: name, contact: contact, logData: logs });
              })
              .catch(err => {
               alert(err);
              });
          });
        } else {
          alert('Call Log permission denied');
        }
      } catch (e) {
        alert(e);
      }
    } else {
      alert(
        'Sorry! You can’t get call logs in iOS devices because of the security concern',
      );
    }
  };

  return (
    <SafeAreaView >
      <ScrollView refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
        {list ? list.map((item, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => singlePage(item.email, item.contact, item.name)}>
              <View style={[styles.card, { backgroundColor:"black" }]}>
                <Text style={styles.cardName}>Name : {item.name}</Text>
                <Text style={styles.cardDescription}>Email : {item.email}</Text>
                <View style={styles.contactFlex}>
                  <Text style={styles.cardContact}>Contact : {item.contact}</Text>
                  <Icon
                    onPress={() => connectCall(item.contact)}
                    color="white"
                    name="phone"
                  />
                </View>
                <Text style={styles.cardMessage}>Message : {item.message}</Text>
              </View>

            </TouchableOpacity>
          );
        }) : <Image
        source={require('../../../../src/assets/nodata2.png')}
        style={{ height: 630, width:420 }}
    />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: '#a088e0',
    shadowOffset: { width: 0, height: 43 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    padding: 20,
    borderRadius: 10,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    margin: 10,
    color: 'white',
  },
  cardName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  cardContact: {
    color: "white",
    fontSize: 20,
    borderRadius: 10,
  },
  cardMessage: {
    fontSize: 25,
    color: "gray",
  },
  contactFlex: {
    flex: 2,
    justifyContent: "flex-start",
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});