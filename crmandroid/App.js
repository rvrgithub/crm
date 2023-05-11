import { View } from 'react-native'
import React, { useEffect } from 'react'
import Mainscreen from './MainPage/Mainscreen'
import Employeepage from './Pages/Employee/Employeepage'
import Adminpage from './Pages/Admin/Adminpage'
import { notificationListner, requestUserPermission } from "./src/Notifications"
export const API_URL =
  Platform.OS === 'ios' ? 'http://localhost:4000' : 'http://192.168.100.5:4000';
export const url = 'http://localhost/8081'
const App = () => {
  useEffect(() => {
    requestUserPermission()
    notificationListner()
  }, [])
  return (
    <View style={{ flex: 1 }}>
      <Employeepage />
    </View>
  )
}

export default App;

