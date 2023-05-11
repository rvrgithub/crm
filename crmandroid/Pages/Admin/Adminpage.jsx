import 'react-native-gesture-handler';
import * as React from 'react';
import { useState, useEffect } from 'react';
import CookieManager from '@react-native-cookies/cookies';


// import component
import Login from '../admincomponent/Login';
import Signup from '../admincomponent/Signup';
import Logout from '../admincomponent/Logout';
import ChangePassword from '../admincomponent/ChangePassword';
import Forgot from '../admincomponent/Forgot';
import Allocated from '../admincomponent/AllocatedAd';
import NotIntrested from '../admincomponent/NotIntrestedAd';
import Pending from '../admincomponent/PendingAd';
import Archived from '../admincomponent/ArchivedAd';
import Admin from '../admincomponent/Admin';
import Callaction from '../admincomponent/CallAction';
import Empstatus from '../admincomponent/EmpStatus';
import Help from '../admincomponent/Help';
import CreateTask from '../admincomponent/CreateTask';
import AddEmp from '../admincomponent/AddEmp';
import Selectfile from '../admincomponent/Selectfile';
import Verifymail from '../admincomponent/Verifymail';
import Generatepass from '../admincomponent/Generatepass';
import Mainscreen from '../../MainPage/Mainscreen';

// import (important) dependencies
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Icons
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export const BottomTabStack = () => {
    return (
        // Bottom Bar
        <Tab.Navigator
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
        </Tab.Navigator >
    );
};
// Which Drawer Bottom Bar Will Visible or not
const HomeScreenStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="loginStack" component={Login} />
            <Stack.Screen name="SignupStack" component={Signup} />
            <Stack.Screen name="ForgotStack" component={Forgot} />
            <Stack.Screen name="AdminStack" component={Admin} />
            <Stack.Screen name="VerfiymailStack" component={Verifymail} />
            <Stack.Screen name="GeneratepassStack" component={Generatepass} />
            <Stack.Screen name="HomeStack" component={MainScreenStack} />
        </Stack.Navigator>
    );
};



const MainScreenStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='Admin'
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="BottomStack" component={BottomTabStack} />
            <Stack.Screen options={{ headerTitle: 'Allocated Task' }} name="AllocatedStack" component={Allocated} />
            <Stack.Screen options={{ headerTitle: 'Not Intrested Task' }} name="NotIntrestedStack" component={NotIntrested} />
            <Stack.Screen options={{ headerTitle: 'Pending Task' }} name="PendingStack" component={Pending} />
            <Stack.Screen options={{ headerTitle: 'Completed Task' }} name="ArchivedStack" component={Archived} />
            {/* <Stack.Screen name="loginStack" component={Login} /> */}
        </Stack.Navigator>
    )
}

// main component
const Adminpage = () => {

    const [userLoggedIn, setUserLoggedIn] = useState(false);

    const cookie = async () => {
        const cookie = await CookieManager.get('http://localhost/8081')
        setUserLoggedIn(cookie.mycookies.value)
    }
    useEffect(() => {
        cookie()
        // MainScreenStack()
    }, [])
    console.log("my token", userLoggedIn)
    if (userLoggedIn) {
        return (
            // Side bar (Drawer)
            <NavigationContainer>
                <Drawer.Navigator
                    usNavigationContainereLegacyImplementation
                    initialRouteName="HomeScreenStack"
                    screenOptions={
                        { headerShown: false }
                    }
                >
                    {/* My Home Screen  */}
                    <Drawer.Screen
                        name="Home"
                        options={{
                            drawerLabel: 'Home',
                            title: 'Home Screen',
                            drawerIcon: ({ focused, size }) => (
                                <Ionicons
                                    name="md-home"
                                    size={size}
                                    color={focused ? 'tomato' : '#483d8b'}
                                />
                            ),
                        }}
                        component={Admin}
                    />
                    {/* Help Drawer */}
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
                    {/* Change Password Drawer */}
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
                    {/* Logout Drawer */}
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
            </NavigationContainer >
        );
    }

    else {
        return (

            // Side bar (Drawer)
            <NavigationContainer>
                <Drawer.Navigator
                    useLegacyImplementation
                    initialRouteName="MainScreenStack"
                    screenOptions={
                        {
                            headerStyle: {
                                backgroundColor: '#fff'
                            }
                        }
                        // {headerShown: true }
                    }
                >
                    {/* My Home Screen  */}
                    <Drawer.Screen
                        name="MainScreenStack"
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
                        component={MainScreenStack}
                    />
                    {/* Create Task */}
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
                    {/* Select file */}
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
                    {/* Add Employee */}
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

                    {/* Help Drawer */}
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
                    {/* Change Password Drawer */}
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
                    {/* Logout Drawer */}
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
            </NavigationContainer >
        );
    }

};

export default Adminpage;







