import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Button, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc'

export const LoginScreen = ({ navigation }) => {

  const [formData, setFormData] = useState(
    { email: '', password: '' }
  );
  const [token, setToken] = useState('');

  const handleSubmit = async () => {
    const url = 'http://api.postiefs.com/api/auth/login';
    if (formData.email !== '' && formData.password !== '') {
      const response = await fetch(url, {
        method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (data.status) {
        const access_token = data.data?.access_token;
        await AsyncStorage.setItem('token', access_token)
        setToken(access_token);
        navigation.navigate('Dashboard');
        Alert.alert('Login Successfully')
      }
      else {
        Alert.alert('Something Wrong', 'email or password incorrect')
      }

    }

    if (await AsyncStorage.getItem('token')) {

    }

  }


  const handleChange = (text, name) => {
    setFormData({ ...formData, [name]: text })
  }

  useEffect(() => {
    const initNavigation = async () => {

      if (await AsyncStorage.getItem('token')) {
        navigation.navigate('Dashboard');
      }
      // console.log('login successfull');

    }
    initNavigation();

  })


  return (
    <ImageBackground source={{
      uri: 'https://img.freepik.com/free-vector/dark-hexagonal-background-with-gradient-color_79603-1409.jpg?t=st=1728547876~exp=1728551476~hmac=42b49a713a5b4c67242b32c40d035dbc7c68122bab9de6eb51c9588434cd90dd&w=900'
    }} style={{ flex: 1, }}>
      <View style={styles.container}>
        <Text style={styles.heading}>Login Page</Text>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <View>
            <TextInput onChangeText={(text) => handleChange(text, 'email')} placeholder='enter your email' style={styles.inputBox} placeholderTextColor={'white'} />
          </View>
          <View style={tw`flex text-white`}>
            <TextInput secureTextEntry onChangeText={(text) => handleChange(text, 'password')} placeholder='enter your password' style={styles.inputBox} placeholderTextColor={'white'} />
          </View>
        </View>
        <View style={{ marginVertical: 15 }}>
          <Button color={'blue'} onPress={handleSubmit}
            title='Submit' />
        </View>

        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 40,
    marginVertical: 20,
    color: 'white'
  },
  inputBox: {
    borderWidth: 1,
    borderColor: 'darkslateblue',
    width: 250,
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    color: 'white',
    fontSize: 18,
  },
});