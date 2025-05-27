import axios from 'axios';
import StackNavigator from './navigation/StackNavigator';
import { UserProvider } from './UserContext';
import { NavigationContainer } from '@react-navigation/native';
import Toast from "react-native-toast-message";

export default function App() {
  // const [isLoading, setIsLoading] = useState(true);
  // const [user, setUser] = useState(null);
  // const [error, setError] = useState(null);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  // const [isDarkMode, setIsDarkMode] = useState(false);
  return (
        <NavigationContainer>
          <UserProvider>
              <StackNavigator/>
              <Toast/>
          </UserProvider>
        </NavigationContainer>
  );
}