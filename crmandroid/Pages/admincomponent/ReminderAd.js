import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, Image,ScrollView,RefreshControl } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
//import Card
import CookieManager from '@react-native-cookies/cookies';
import { Card } from 'react-native-paper';
import { API_URL } from '../../App';
const ReminderAD = () => {
const[data,setdata]=useState([])
const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
let dataDetails=async()=>{
try {
  const cookies = await CookieManager.get('http://localhost/8081');

  fetch(`${API_URL}/allemployee/reminder`,{
    method:"GET",
    headers:{
      "Content-type":"application/json",
      Accept:"application/json",
      'x-api-key': ` ${cookies.Admin.value}`
    }
  }).then(res=>res.json())
  .then((data)=>{
    console.log(data)
    if (data.status == false) {

      alert('error: ' + data.message);

  } else {
     
      if(data.message.length==0){
          setdata()
      }else{
      setdata(data.message);
      }
  
  }
  })
} catch (error) {
  
}
}
const isFocused = useIsFocused();
    useEffect(() => {
      dataDetails()
    }, [isFocused]);

    const onRefresh = () => {
      setRefreshing(true);
      dataDetails()
      setRefreshing(false);
    };
const dateFun = (dateValue) => {
  const dateTime = new Date(dateValue);
  const date = dateTime.toLocaleDateString();
 return date
}
  return (
    <SafeAreaView style={styles.container}>
          <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>

      <View style={styles.container}>
      <View style={{ marginVertical: 10, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 28, color: '#000', fontWeight: '700' }}>Reminder Details</Text>
            </View>
        {data ? data.map((item)=>{
          return(
            <>
            <Card style={styles.cardCss}>
          <Text style={styles.paragraph}>
          Client Name : {item.tasks[0].name}
          </Text>
          <Text style={styles.paragraph}>
          Assign Employee : {item.userName}
          </Text>
          <Text style={styles.paragraph}>
        Reminder date : {dateFun(item.reminder)}
          </Text>
        </Card>
            </>
          )
        }) : <Image
        source={require('../../src/assets/nodata2.png')}
        style={{ height: 530, width:370,borderColor:"blue",borderWidth:1,borderRadius:10 }}
    />}
        
        
      
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReminderAD;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingLeft:10,
    paddingTop:4
  },
  cardCss:{
    marginTop:20
  },
  noDate:{
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingLeft:10,
    paddingTop:4
  }
});


//