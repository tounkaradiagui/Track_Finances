import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProtectedData from '../components/ProtectedData';
import PublicScreen from '../components/PublicScreen';
import { useUser } from '../UserContext';

const StackNavigator = () => {

  const Stack = createNativeStackNavigator();

  const { user } = useUser();

  return (
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="ProtectedData" component={ProtectedData} options={{headerShown:false}}/>
        ) : (
          <Stack.Screen name="PublicScreen" component={PublicScreen} options={{headerShown:false}}/>
        )}
      </Stack.Navigator>
  )
}

export default StackNavigator