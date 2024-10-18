import { ThemeProvider } from './context/ThemeContext';
import StackNavigator from './navigation/StackNavigator';
import { UserProvider } from './UserContext';
import { NavigationContainer } from '@react-navigation/native';
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <NavigationContainer>
          <StackNavigator/>
          <Toast/>
        </NavigationContainer>
      </UserProvider>
    </ThemeProvider>
  );
}
