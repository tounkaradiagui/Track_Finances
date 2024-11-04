import StackNavigator from './navigation/StackNavigator';
import { UserProvider } from './UserContext';
import { NavigationContainer } from '@react-navigation/native';
import Toast from "react-native-toast-message";

export default function App() {
  return (
        <NavigationContainer>
          <UserProvider>
              <StackNavigator/>
              <Toast/>
          </UserProvider>
        </NavigationContainer>
  );
}
