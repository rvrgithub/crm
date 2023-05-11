import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import Archived from '../EmployeeAllComponent/Archived';
import Allocated from '../EmployeeAllComponent/Allocated';
import Employee from '../EmployeeAllComponent/Employee';
import Pending from '../EmployeeAllComponent/Pending';
import Reminder from "../EmployeeAllComponent/Reminder"
import Notification from '../EmployeeAllComponent/Notification';
import NotIntersted from '../EmployeeAllComponent/NotInterested';
import { SetReminder } from '../Status/SetReminder';
import Forget from '../EmployeeAllComponent/Forget';
import VarifyOtp from '../EmployeeAllComponent/VarifyOtp';
import ResetPassword from '../EmployeeAllComponent/ResetPassword';
import Logout from '../EmployeeAllComponent/Logout';
import ChangePassword from '../EmployeeAllComponent/ChangePassword';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const Drawer = createDrawerNavigator();
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: true,
        drawerLabelStyle: {
          marginLeft: 20,
        },
      }}>
      <Drawer.Screen
        name="Dashboard"
        options={{
          drawerLabel: 'Dashboard',
          title: 'Dashboard',
          drawerIcon: ({ focused, size }) => (
            <SimpleLineIcons
              name="grid"
              size={size}
              color={focused ? 'tomato' : '#483d8b'}
            />
          ),
        }}
        component={Employee}
      />
      <Drawer.Screen
        name="Reminder"
        options={{
          drawerLabel: 'Reminder',
          title: 'Reminder',
          drawerIcon: ({ focused, size }) => (
            <MaterialCommunityIcons
            name="calendar-clock-outline"
            color='#483d8b'
            size={size}
        />
          ),
        }}
        component={Reminder}
      />
      {/* <Drawer.Screen
        name="Notification"
        options={{
          drawerLabel: 'Notification',
          title: 'Notification Screen',
          drawerIcon: ({ focused, size }) => (
            <SimpleLineIcons
              name="bell"
              size={size}
              color={focused ? 'tomato' : '#483d8b'}
            />
          ),
        }}
        component={Notification}
      /> */}
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
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;