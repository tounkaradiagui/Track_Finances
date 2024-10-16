import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from '../navigation/BottomTabs'; // Assurez-vous que ce chemin est correct
import Home from '../screen/Home';
import Transaction from '../pages/Transaction';
import Categories from '../pages/Categories';
import Budget from '../pages/Budget';
import Profile from '../pages/Profile';
import CreateCategory from '../views/CreateCategory';
import Target from '../views/Target';
import AddTransaction from '../views/AddTransaction';
import AddBudget from '../views/AddBudget';
import Settings from '../pages/Settings';
import About from '../pages/About';
import EditProfile from '../pages/EditProfile';

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
            <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: 'Profil' }} />
            <Stack.Screen name="Settings" component={Settings} options={{ title: 'Paramètre'}}/>
            <Stack.Screen name="About" component={About} options={{ title: 'A Propos'}}/>

            {/* Manage categories */}
            <Stack.Screen name="CreateCategory" component={CreateCategory} options={{ title: 'Catégorie'}}/>

            {/* Manage transactions */}
            <Stack.Screen name="AddTransaction" component={AddTransaction} options={{ title: 'Transaction'}}/>

            {/* Manage budgets */}
            <Stack.Screen name="AddBudget" component={AddBudget} options={{ title: 'Ajouter un Budget'}}/>

            {/* Financial Goal / Target */}
            <Stack.Screen name="Target" component={Target} options={{ title: 'Fixer un Objectif'}}/>

        </Stack.Navigator>
    );
};

export default ProtectedData;
