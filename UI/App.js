import { ThemeProvider } from './context/ThemeContext';
import StackNavigator from './navigation/StackNavigator';
import { UserProvider } from './UserContext';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <NavigationContainer>
          <StackNavigator/>
        </NavigationContainer>
      </UserProvider>
    </ThemeProvider>
  );
}
