import React, { useCallback } from 'react'
import { Alert, Button, Image, Linking, Pressable, Text } from 'react-native'

export const OpenUrlBtn = ({ url }) => {

  const handlePress = useCallback(async () => {
    const supportedUrl = await Linking.canOpenURL(url);
    if (supportedUrl) {
      await Linking.openURL(url);
    }
    else {
      Alert.alert("this link can't open");
    }
  }, [url]);

  return (
    <Pressable onPress={handlePress} >
      {/* <Text style={{ marginRight: 10,}}> */}

        <Image style={{ cursor: 'pointer',height:20,width:20}} 
        source={require('../../assets/images/right-arrow.png')} resizeMode='center'
        />
      {/* </Text> */}
    </Pressable>
  )
}
