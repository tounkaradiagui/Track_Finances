import { Linking } from 'react-native';
import { ThemeProvider } from './context/ThemeContext';
import StackNavigator from './navigation/StackNavigator';
import { UserProvider } from './UserContext';
import { NavigationContainer } from '@react-navigation/native';
import Toast from "react-native-toast-message";
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const handleDeepLink = (url) => {
      const token = url.split("token=")[1];
      navigation.navigate("ResetPassword", { token });
    };

    const subscription = Linking.addEventListener("url", ({ url }) => {
      handleDeepLink(url);
    });

    // Si l'application est déjà ouverte et reçoit un lien
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink(url);
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

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
