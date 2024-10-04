import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../screen/Welcome";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ForgotPassword from './../auth/ForgotPassword';


const PublicScreen = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="Welcome" component={Welcome} options={{headerShown:false}}/>
            <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>
            <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
    );
}

export default PublicScreen;