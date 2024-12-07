import { Button, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { ReactElement, useEffect } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import useAuthentication from './hooks/useAuthentication';

export default function App(): ReactElement {
  const { isBiometricSupported, onLogin } = useAuthentication();

  function navigateToHome(): void {
    router.push('/home')
  }

  useEffect(() => {
    onLogin()
  }, [])

  return (
    <>
      <View className="flex-1 items-center justify-center bg-white" >
        <Text className="text-2xl font-robotoRegular w-4/5 text-center">Press the icon to login with Biometric Fingerprint</Text>
        <FontAwesome5 name="fingerprint" size={36} color="black" className="m-5" onPress={onLogin}/>
        {!isBiometricSupported && (
          <Button title='Or login here for web browser' onPress={navigateToHome} />
        )}
        <StatusBar style="auto"></StatusBar>
      </View>
    </>
  );
}
