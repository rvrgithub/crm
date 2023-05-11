import { View, Text,StyleSheet,SafeAreaView,ScrollView } from 'react-native'
import React, { useEffect,useState } from 'react'
import CookieManager from '@react-native-cookies/cookies';
import { API_URL } from '../../../../App';
import { Card } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { set } from 'react-native-reanimated';
export default function Reminder() {
const[data,setdata]=useState([])

    const reminderDetails=async()=>{
        try {
      const cookies = await CookieManager.get('http://localhost/8081');
            fetch(`${API_URL}/reminder/details`,{
                method:"GET",
                headers:{
                    "Content-type":"application/json",
                    Accept:"application/json",
                    Authorization: `Bearer ${cookies.Employee.value}`,
                }
            }).then(res=>res.json())
            .then(data=>{
                if(data.status==false){
                  
                }else if (data.status==true){
if(data.message.length==0){
  setdata()
}else{
  setdata(data.message)

}
                }
            })
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        reminderDetails()
    },[])

    const isFocused = useIsFocused();
 
  useEffect(() => {
    reminderDetails()
    
  }, [isFocused]);

    const dateFun = (dateValue) => {
      const dateTime = new Date(dateValue);
      const date = dateTime.toLocaleDateString();
     return date
    }
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
 <View style={styles.container}>
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
   }) : <Text style={styles.noDate}>No Data Found</Text>}
   
   
 
 </View>
 </ScrollView>
</SafeAreaView>
  )
}



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
