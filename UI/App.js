import StackNavigator from './navigation/StackNavigator';
import { UserProvider } from './UserContext';
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
