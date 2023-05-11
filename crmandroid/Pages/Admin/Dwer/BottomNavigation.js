import { View, Text, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Admin from '../../admincomponent/Admin';
import Empstatus from '../../admincomponent/EmpStatus';
import Reminder from '../../Employee/EmployeeComponent/EmployeeAllComponent/Reminder';
import ReminderAD from '../../admincomponent/ReminderAd';
const Bottom = createBottomTabNavigator();

const BottomNavigation = () => {
    return (
        <Bottom.Navigator initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: 'red',
                tabBarInactiveTintColor: 'gray',
                tabBarShowLabel: true,
                  tabBarLabelStyle:{
                              fontSize:15,
                              marginTop:5
                  },
                tabBarStyle: {
                    backgroundColor: '#ADD8E6',
                    font: 30,
                    padding: 10,
                    height: 70,
                }
            }}>
            <Bottom.Screen name="Home"
                

                options={{
                    

                    tabBarIcon: ({ focused }) => {
                        return (
                            <Image
                                style={{
                                    width: 50,

                                    height: 50,
                                    tintColor: focused ? '#df1b1b' : '#483d8b'
                                }}
                                source={require('../../../src/assets/homeImage.png')}
                            />
                        )
                    },

                }}
                component={Admin} />
            <Bottom.Screen name="Reminder"
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Image
                                style={{
                                    width: 50,
                                    height: 50,
                                    tintColor: focused ? '#df1b1b' : '#483d8b'
                                }}
                                source={require('../../../src/assets/reminder.png')}
                            />
                        )
                    }
                }}
                component={ReminderAD} />
            <Bottom.Screen name="Employees  "
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Image
                                style={{
                                    width: 50,
                                    height: 60,
                                    // marginBottom:5,
                                    tintColor: focused ? '#df1b1b' : '#483d8b'
                                }}
                                source={require('../../../src/assets/employeeList.png')}
                            />
                        )
                    }
                }}
                component={Empstatus} />

        </Bottom.Navigator>
    )
}

export default BottomNavigation