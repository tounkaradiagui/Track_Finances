import StackNavigator from './navigation/StackNavigator';
import {Provider} from 'react-redux'
import { StatusBar } from 'expo-status-bar';
import { UserContext, UserProvider } from './UserContext';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <StackNavigator/>
      </NavigationContainer>
    </UserProvider>
  );
}
