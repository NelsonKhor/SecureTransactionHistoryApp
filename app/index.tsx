import { Alert, Button, Text, View, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link, router } from 'expo-router';
import * as LocalAuthentication from "expo-local-authentication"
import { useEffect, useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

export default function App() {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  console.log(isBiometricSupported)

  async function loginAuth() {
    try {
      const hasHardwareAuth = await LocalAuthentication.hasHardwareAsync()
      const isEnrolledAuth = await LocalAuthentication.isEnrolledAsync()
      const supportedAuth = await LocalAuthentication.supportedAuthenticationTypesAsync()

      setIsBiometricSupported(supportedAuth.length > 0)
      

      if (hasHardwareAuth && isEnrolledAuth) {
        const respond = await LocalAuthentication.authenticateAsync();
        if (respond.success) {
          router.push('/home');
        }
      } else {
        Alert.alert(
          'Authentication Error',
          'Biometric authentication is not supported or enrolled on this device.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.log('Authentication error:', error)
    }
  }

  function navigateToHome(): void {
    router.push('/home')
  }

  useEffect(() => {
    loginAuth();
  }, [])

  return (
    <>
      <View className="flex-1 items-center justify-center bg-white" >
        <Text className="text-2xl font-robotoRegular w-4/5 text-center">Press the icon to login with Biometric Fingerprint</Text>
        <FontAwesome5 name="fingerprint" size={36} color="black" className="m-5" onPress={loginAuth}/>
        {!isBiometricSupported && (
          <Button title='Or login here for web browser' onPress={navigateToHome} />
        )}
        <StatusBar style="auto"></StatusBar>
      </View>
    </>
  );
}
