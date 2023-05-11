import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomDrawerAd from './CustomDrawerAd';
import Admin from '../../admincomponent/Admin';
import Login from '../../admincomponent/Login';
import Logout from '../../admincomponent/Logout';
import Help from '../../admincomponent/Help';
import ChangePassword from '../../admincomponent/ChangePassword';
import Verifymail from '../../admincomponent/Verifymail';
import Forgot from '../../admincomponent/Forgot';
import CreateTask from '../../admincomponent/CreateTask';
import Selectfile from '../../admincomponent/Selectfile';
import AddEmp from '../../admincomponent/AddEmp';
const Tab = createBottomTabNavigator();
import { BottomTabStack } from '../Adminpage';
import Callaction from '../../admincomponent/CallAction';
import Empstatus from '../../admincomponent/EmpStatus';
import BottomNavigation from './BottomNavigation';
export default function DrawerNavigatorAd() {
  return (
    <>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerAd {...props} />}
        screenOptions={{
          headerShown: true,
          drawerLabelStyle: {
            marginLeft: 20,
          },
        }}>


        <Drawer.Screen
          name="Tab"
          options={{
            drawerLabel: 'Home',
            title: 'Home',
            drawerIcon: ({ focused, size }) => (
              <AntDesign
                name="home"
                size={size}
                color={focused ? 'tomato' : '#483d8b'}
              />
            ),
          }}
          component={BottomNavigation}
        />

        {/* <Drawer.Screen
          name="Home"
          options={{
            drawerLabel: 'Home',
            title: 'Home',
            drawerIcon: ({ focused, size }) => (
              <Ionicons
                name="md-home"
                size={size}
                color={focused ? 'tomato' : '#483d8b'}
              />
            ),
          }}
          component={Admin}
        /> */}



        <Drawer.Screen
          name="Selectfile"
          options={{
            drawerLabel: 'Upload File',
            title: 'Upload File',
            drawerIcon: ({ focused, size }) => (
              <AntDesign
                name="cloudupload"
                size={size}
                color={focused ? 'tomato' : '#483d8b'}
              />
            ),
          }}
          component={Selectfile}
        />
        <Drawer.Screen
          name="AddEmp"
          options={{
            drawerLabel: 'Add Employee',
            title: 'Add Employee',
            drawerIcon: ({ focused, size }) => (
              <AntDesign
                name="addusergroup"
                size={size}
                color={focused ? 'tomato' : '#483d8b'}
              />
            ),
          }}
          component={AddEmp}
        />


        <Drawer.Screen
          name="CreateTask"
          options={{
            drawerLabel: 'CreateTask',
            title: 'CreateTask',
            drawerIcon: ({ focused, size }) => (
              <MaterialIcons
                name="add-task"
                size={size}
                color={focused ? 'tomato' : '#483d8b'}
              />
            ),
          }}
          component={CreateTask}
        />
        <Drawer.Screen
          name="ChangePassword"
          options={{
            drawerLabel: 'Change Password',
            title: 'Change Password',
            drawerIcon: ({ focused, size }) => (
              <MaterialCommunityIcons
                name="key-change"
                size={size}
                color={focused ? 'tomato' : '#483d8b'}
              />
            ),
          }}
          component={ChangePassword}
        />

        <Drawer.Screen
          name="Help"
          options={{
            drawerLabel: 'Help',
            title: 'Help Screen',
            drawerIcon: ({ focused, size }) => (
              <Entypo
                name="help"
                size={size}
                color={focused ? 'tomato' : '#483d8b'}
              />
            ),
          }}
          component={Help}
        />
        <Drawer.Screen
          name="Logout"
          options={{
            drawerLabel: 'Logout',
            title: 'Logout Screen',
            drawerIcon: ({ focused, size }) => (
              <SimpleLineIcons
                name="logout"
                size={size}
                color={focused ? 'tomato' : '#483d8b'}
              />
            ),
          }}
          component={Logout}
        />
        {/* <BottomTabStack/> */}

      </Drawer.Navigator>
      {/* <Tab.Navigator
            initialRouteName="Admin"
            screenOptions={{
                headerShown: false,
                tabBarStyle: { height: 60, paddingBottom: 5, paddingTop: 5, backgroundColor: "#f8f8ff" },
                activeTintColor: 'tomato',
                inactiveTintColor: '#483d8b',
                labelStyle: { paddingBottom: 10, fontSize: 14, },
            }}
        >
            <Tab.Screen
                name="Admin"
                component={Admin}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="home"
                            color='#483d8b'
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="CallAction"
                component={Callaction}
                options={{
                    tabBarLabel: 'Call Action',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons
                            name="call-end"
                            color='#483d8b'
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="EmpStatus"
                component={Empstatus}
                options={{
                    tabBarLabel: 'Emp Status',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="list-status"
                            color='#483d8b'
                            size={size}
                        />
                    ),
                }}
            />
        </Tab.Navigator > */}
      {/* <BottomTabStack/> */}
    </>
  )
}