import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  SafeAreaView,
  RefreshControl,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import CookieManager from '@react-native-cookies/cookies';
import { API_URL } from '../../../../App';
import { useIsFocused } from '@react-navigation/native';
const Archived=() =>{
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

      fetch(`${API_URL}/employee/leads/Complete`, {
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
  };

  
  return (

    <SafeAreaView >
      <ScrollView refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
        {list ? list.map((item, index) => {
          return (
            <TouchableOpacity key={index}>
              <View style={[styles.card, { backgroundColor: `green` }]}>
                <Text style={styles.cardName}>Name : {item.name}</Text>
                <Text style={styles.cardDescription}>Email : {item.email}</Text>
                <Text style={styles.cardContact}>Contact : {item.contact}</Text>
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

  }
});
export default Archived