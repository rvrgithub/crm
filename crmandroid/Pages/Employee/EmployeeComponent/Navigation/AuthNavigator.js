import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Forget from '../EmployeeAllComponent/Forget';
import SignUp from '../EmployeeAllComponent/SignUp';
import Logout from '../EmployeeAllComponent/Logout';
import DrawerNavigator from './DrawerNavigator';
import ArchivedAd from '../../../admincomponent/ArchivedAd';
import Login from '../EmployeeAllComponent/Login';
import NotInterstedAd from '../../../admincomponent/NotIntrestedAd';
import Employee from '../EmployeeAllComponent/Employee';
import Allocated from '../EmployeeAllComponent/Allocated';
import Pending from '../EmployeeAllComponent/Pending';
import NotIntersted from '../EmployeeAllComponent/NotInterested';
import Archived from '../EmployeeAllComponent/Archived';
import { StatusMailFile } from '../Status/StatusMain';
import { SetReminder } from '../Status/SetReminder';
import ResetPassword from '../EmployeeAllComponent/ResetPassword';
import VarifyOtp from '../EmployeeAllComponent/VarifyOtp';
import DrawerNavigatorAd from '../../../Admin/Dwer/DrawerNavigatorAd';
import AllocatedAd from '../../../admincomponent/AllocatedAd';
import PendingAd from '../../../admincomponent/PendingAd';
import EmployeeDetails from '../../../admincomponent/EmployeeDetails';
const Stack = createStackNavigator();
const AuthNavigator = () => {
  console.log(Stack);
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: "#69b6ff"
      },
      headerTitleAlign: "center"
    }}
      initialRouteName={'Login Stack'}
    >
      <Stack.Screen name={'Login Stack'} component={Login}
      options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'Forgot Password'}
        component={Forget}
      />
      <Stack.Screen
        name={'Home'}
        component={DrawerNavigatorAd}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'Dashboard'}
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      
      
      <Stack.Screen name="Sign Up" component={SignUp} options={{ headerShown: false }}/>  
     <Stack.Screen name="Allocated Stack" component={Allocated} options={{ title: "Allocated" }}/>
      <Stack.Screen name="AllocatedStack" component={AllocatedAd} options={{ title: "Allocated" }}/>
      <Stack.Screen name="Pending Stack" component={Pending} options={{ title: "Pending" }}/>
      <Stack.Screen name="Not Interested Stack" component={NotIntersted} options={{ title: "NotInterested" }}/>
      <Stack.Screen name="NotIntrestedStack" component={NotInterstedAd} options={{ title: "NotInterested" }}/>
      <Stack.Screen name="AchievedStack" component={ArchivedAd} options={{ title: "Complete" }}/>
      <Stack.Screen name="PendingStack" component={PendingAd} options={{ title: "Pending" }}/>
      <Stack.Screen name="Achieved Stack" component={Archived} options={{ title: "Complete" }}/>
      <Stack.Screen name="Status Main File" component={StatusMailFile} initialParams={{ email: "kishor", name: "kishor", contact: "9999999999" }} options={{ title: "Status" }}/>
      <Stack.Screen name="Reset" component={ResetPassword} options={{ headerShown: true }} />
      <Stack.Screen name="Verify OTP" component={VarifyOtp} options={{ headerShown: true }} />
      <Stack.Screen name="Details" component={EmployeeDetails} options={{ headerShown: true }} initialParams={{ userName: "kishor"}} />

     </Stack.Navigator>
  );
}

export default AuthNavigator;