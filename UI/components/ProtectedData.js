import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from '../navigation/BottomTabs';
import Home from '../screen/Home';
import Transaction from '../pages/Transaction';
import Categories from '../pages/Categories';
import Budget from '../pages/Budget';
import Profile from '../pages/Profile';
import CreateCategory from '../views/CreateCategory';
import AddTransaction from '../views/AddTransaction';
import AddBudget from '../views/AddBudget';
import Settings from '../pages/Settings';
import About from '../pages/About';
import EditProfile from '../pages/EditProfile';
import Security from '../pages/Security';
import ChangePassword from './ChangePassword';
import TransactionDetails from './TransactionDetails';
import Goal from '../pages/Goal';
import AddGoal from '../views/AddGoal';
import Savings from '../pages/Savings';
import ShowGoal from './ShowGoal';
import CategoryDetails from './CategoryDetails';
import BudgetDetails from './BudgetDetails';

const ProtectedData = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="BottomTabs" component={BottomTabs} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="About" component={About} options={{ title: 'A Propos'}}/>

            {/* Manage Profile */}
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: 'Mon Compte' }} />
            <Stack.Screen name="Security" component={Security} options={{ title: 'Mon Compte' }} />
            <Stack.Screen name="Settings" component={Settings} options={{ title: 'Paramètre'}}/>
            <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ title: 'Mon Compte'}}/>

            {/* Manage budgets */}
            <Stack.Screen name="Budget" component={Budget} options={{ headerShown: false }} />
            <Stack.Screen name="AddBudget" component={AddBudget} options={{ title: 'Budget'}}/>
            <Stack.Screen name="BudgetDetails" component={BudgetDetails} options={{ title: 'Détails Budget'}}/>

            {/* Manage categories */}
            <Stack.Screen name="Categories" component={Categories} options={{ headerShown: false }} />
            <Stack.Screen name="CreateCategory" component={CreateCategory} options={{ title: 'Catégorie'}}/>
            <Stack.Screen name="CategoryDetails" component={CategoryDetails} options={{ title: 'Détails'}}/>

            {/* Financial Goal / Target */}
            <Stack.Screen name="Goal" component={Goal} options={{ title: 'Mes objectifs'}}/>
            <Stack.Screen name="AddGoal" component={AddGoal} options={{ title: 'Ajouter'}}/>
            <Stack.Screen name="Savings" component={Savings} options={{ title: 'Epargne'}}/>
            <Stack.Screen name="ShowGoal" component={ShowGoal} options={{ title: 'Ajouter un épargne'}}/>
            

            {/* Manage transactions */}
            <Stack.Screen name="Transaction" component={Transaction} options={{ headerShown: false }} />
            <Stack.Screen name="AddTransaction" component={AddTransaction} options={{ title: 'Transaction'}}/>
            <Stack.Screen name="TransactionDetails" component={TransactionDetails} options={{ title: 'Détails Transaction'}}/>
        </Stack.Navigator>
    );
};

export default ProtectedData;
