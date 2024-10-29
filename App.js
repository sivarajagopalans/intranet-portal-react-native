import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import tw from 'twrnc'
import { LoginScreen } from "./src/screens/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DashboardScreen } from "./src/screens/DashboardScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Navbar1 from './src/screens/Navbar1';
import Navbar2 from './src/screens/Navbar2';
import Drawer from './src/screens/Drawer';

export default function App() {

  const Stack = createNativeStackNavigator();
  // const Drawer = createDrawerNavigator();


  return (
    <NavigationContainer>
        {/* <Drawer.Navigator  initialRouteName='Navbar1'>
          <Drawer.Screen name='Navbar1' component={Navbar1}/>
          <Drawer.Screen name='Navbar2' component={Navbar2}/>
        </Drawer.Navigator> */}
        <Stack.Navigator initialRouteName="Navbar">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name='Navbar' component={Drawer}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

