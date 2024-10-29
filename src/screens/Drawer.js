import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Navbar1 from './Navbar1';
import Navbar2 from './Navbar2';

const Drawer = () => {

  const Drawer = createDrawerNavigator();


  return (
    // <NavigationContainer>
        <Drawer.Navigator initialRouteName='Home'>
          <Drawer.Screen name='Home' component={Navbar1} />
          <Drawer.Screen name='About' component={Navbar2} />
        </Drawer.Navigator>
      // </NavigationContainer>
  )
}

export default Drawer