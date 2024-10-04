import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from '../navigation/BottomTabs'; // Assurez-vous que ce chemin est correct
import Home from '../screen/Home';
import Transaction from '../pages/Transaction';
import Categories from '../pages/Categories';
import Budget from '../pages/Budget';
import Profile from '../pages/Profile';

const ProtectedData = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="BottomTabs" component={BottomTabs} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Transaction" component={Transaction} options={{ headerShown: false }} />
            <Stack.Screen name="Categories" component={Categories} options={{ headerShown: false }} />
            <Stack.Screen name="Budget" component={Budget} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default ProtectedData;
