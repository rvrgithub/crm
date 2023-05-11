import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import CookieManager from '@react-native-cookies/cookies';
import { API_URL } from '../../../../App';
export const StatusFile = ({ email,status, setstatus, setAddStatus }) => {
  const statusObject = [
    { color: 'red', title: 'Working', link: '#' },
    { color: 'blue', title: 'Successfull', link: '#' },
    { color: 'yellow', title: 'Not Reachable', link: '#' },
    { color: 'green', title: 'Disquilified', link: '#' },
  ];
  const handleNavigation = async(value) => {
    try {
      const cookies = await CookieManager.get('http://localhost/8081');

      fetch(`${API_URL}/work/update`, {
        method: 'POST',
        headers: {
          "Content-Type":"application/json",
          Accept:"application/json",
          Authorization: `Bearer ${cookies.Employee.value}`,
        },
        body:JSON.stringify({
          email,
          work:value
        })
      })
        .then(res => res.json())
        .then(data => {
          
         if(data.status==false){
          return;
         }else{
          setAddStatus(value);
          setstatus(!status);
         }
          
          
        })
        .catch(err => {
          Alert(err);
        });
    } catch (error) {
      Alert(error);
    }
    
  };


  return (
      <View style={styles.bottomSheet}>
        <Text style={styles.closeButton}>
          <Icon
            onPress={() =>{ setstatus(!status)
           
            }}
            name="close"
          />
        </Text>

        <View style={styles.hover}>
          {statusObject.map((elem, index) => (
            <TouchableOpacity
              key={index}
              style={styles.titleStyle}
              onPress={() => handleNavigation(elem.title)}>
              <View
                style={{
                  backgroundColor: `${elem.color}`,
                  borderRadius: 10,
                  width: 15,
                  height: 15,
                  margin: 9,
                }}>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 20,
                  }}>
                  {elem.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    position:"relative",
    bottom: 0,
    marginTop: 10,

  },
  hover: {
    width: "100%",
    height: 250

  },
  titleStyle: {
    flex: 2,
    justifyContent: "flex-start",
    flexDirection: 'row',
    paddingBottom: 10,
    paddingTop: 10,
    borderColor: '#c2bdcf8f',
    borderBottomWidth: 1,
  },
  closeButton: {
    width: 30,
    height: 50,
    fontSize: 25,
    marginLeft: 300,
  }
});
