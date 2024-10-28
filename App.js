import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import tw from 'twrnc'
import { LoginScreen } from "./screens/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DashboardScreen } from "./screens/DashboardScreen";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {

  const Stack = createNativeStackNavigator()


  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

