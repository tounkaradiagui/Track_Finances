import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ForgotPassword from './../auth/ForgotPassword';
import WelcomeScreen from './../screen/WelcomeScreen';

const Stack = createNativeStackNavigator();

const PublicScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default PublicScreen;