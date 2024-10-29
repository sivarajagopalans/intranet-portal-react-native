import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Alert, Button, FlatList, Image, ImageBackground, Linking, ScrollView, StyleSheet, Text, View } from 'react-native'
import { OpenUrlBtn } from '../components/OpenUrlBtn';
// import {
//   Avatar,
//   AvatarBadge,
//   AvatarFallbackText,
//   AvatarImage,
// } from '@/components/ui/avatar';

export const DashboardScreen = ({ navigation }) => {

  const [userDetails, setUserDetails] = useState('');


  useEffect(() => {

    const fetchUserDetails = async () => {
      const token = await AsyncStorage.getItem('token')
      const url = 'http://api.postiefs.com/api/auth/me'
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      setUserDetails(data.data);
    }
    fetchUserDetails();
  }, [])



  const handleLogout = async () => {
    const token = await AsyncStorage.getItem('token')

    const url = 'http://api.postiefs.com/api/auth/logout';
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = await response.json();

    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
    Alert.alert('Logout successfully', 'Your are loged out')
  }


  const profileCard = [
    {
      name: 'QMS',
      url: 'qms.postiefs.com',
      desc: 'Documents related to QMS and ISMS',

    },

    {
      name: 'HRMS',
      url: 'hrms.postiefs.com',
      desc: 'Streamlined HR processes and management.',

    },

    {
      name: 'CRM',
      url: 'crm.postiefs.com',
      desc: 'Manages target and achievements',

    }
  ]



  return (
    <ImageBackground source={{ uri: 'https://img.freepik.com/free-vector/dark-hexagonal-background-with-gradient-color_79603-1409.jpg?t=st=1728547876~exp=1728551476~hmac=42b49a713a5b4c67242b32c40d035dbc7c68122bab9de6eb51c9588434cd90dd&w=900' }}>
      <View style={styles.logout}>
        <View style={styles.profile}>
          <Text style={styles.textElement}>{userDetails.email}</Text>
          <Button title='Logout' onPress={handleLogout} />
        </View>
        <View>

          <View>
            {/* <View className='w-full mt-4 flex justify-evenly flex-wrap'>
          {
            profileCard.map(value => {
              return (
                <View key={value.id} className="max-w-96 sm:max-w-64 bg-white border m-8
							 border-gray-200 rounded-lg shadow dark:bg-gray-800 
							 dark:border-gray-700">

                  <Image source={{ uri: "https://img.freepik.com/free-vector/human-resources-concept-illustration_114360-22204.jpg?t=st=1729837463~exp=1729841063~hmac=eefd198a1d64ec4c3df7813d468beae2ae5532f6fc1cc709cf6cda9b262c5cce&w=740" }} alt="" />
                  <View className="p-5 h-60 flex flex-col justify-around">
                    <Text className="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">{value.name}</Text>

                    <Text className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {value.desc}
                    </Text>

                    <View className='text-center '>
                      <Text onPress={() => Linking.openURL(value.url)} target='_blank' style={tw`inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 
									focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
                        Visit
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                      </Text>
                    </View>
                  </View>
                </View>
              )
            })
          }
        </View> */}
          </View>

          <ScrollView indicatorStyle='white' style={{ marginBottom: 180 }}>

            {
              profileCard.map((value, index) => {
                return (
                  <View key={index + 1} style={styles.profileCard}>
                    <Image source={{ uri: 'https://img.freepik.com/free-vector/human-resources-concept-illustration_114360-22204.jpg?t=st=1729837463~exp=1729841063~hmac=eefd198a1d64ec4c3df7813d468beae2ae5532f6fc1cc709cf6cda9b262c5cce&w=740' }} width={'100%'} height={180}
                      style={styles.image} />
                    <View style={styles.innerProfileCard}>
                      <Text style={styles.textElement}>
                        {value.name}
                      </Text>
                      <Text style={styles.textElement}>
                        {value.desc}
                      </Text>
                      <Text style={{ textAlign: 'center' }}>
                        <OpenUrlBtn title='visit' url={"https://" + value.url} />
                      </Text>
                    </View>
                  </View>
                )
              })
            }
          </ScrollView>
        </View>
      </View>
    </ImageBackground>
  )
}


const styles = StyleSheet.create({
  logout: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  profile: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 50,
  },
  profileCard: {
    borderWidth: 2,
    borderColor: 'rgb(55 65 81 / 1)',
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: '#1F2937',
    color: 'orange',
    padding: 10,
    width: 270,
  },
  image: {
    borderRadius: 10
  },
  innerProfileCard: {
    height: 150,
    justifyContent: 'space-around'
  },
  textElement: {
    color: 'white',
    fontSize: 16
  }
})