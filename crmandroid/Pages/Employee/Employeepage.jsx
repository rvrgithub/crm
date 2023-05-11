

import * as React from 'react';
import { useState, useEffect } from 'react';
import { View } from "react-native";

import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from './EmployeeComponent/Navigation/AuthNavigator';

const Employeepage = () => {
    
    return (
        <NavigationContainer>
           
            <AuthNavigator />
           

        </NavigationContainer>
    )
}

export default Employeepage;