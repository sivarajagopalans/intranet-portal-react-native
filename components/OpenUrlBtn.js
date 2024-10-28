import React, { useCallback } from 'react'
import { Alert, Button, Linking } from 'react-native'

export const OpenUrlBtn = ({ url, title }) => {

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
    <Button title={title} onPress={handlePress} />
  )
}
