import { Alert, Button, Text, View, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import * as LocalAuthentication from "expo-local-authentication"
import { ReactElement, useEffect, useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import useStore from './store/useStore';

export default function App(): ReactElement {
  const [isBiometricSupported, setIsBiometricSupported] = useState<boolean>(false);
  const setIsLoggedin = useStore((state) => state.setIsLoggedin);

  async function loginAuth(): Promise<void> {
    try {
      const hasHardwareAuth = await LocalAuthentication.hasHardwareAsync()
      const isEnrolledAuth = await LocalAuthentication.isEnrolledAsync()
      const supportedAuth = await LocalAuthentication.supportedAuthenticationTypesAsync()

      setIsBiometricSupported(supportedAuth.length > 0)
      
      if (hasHardwareAuth && isEnrolledAuth) {
        const respond: LocalAuthentication.LocalAuthenticationResult = await LocalAuthentication.authenticateAsync();
        if (respond.success) {
          setIsLoggedin(true);
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
      console.error('Authentication error:', error);
      Alert.alert(
        'Unexpected Error',
        'An unexpected error occurred during authentication.',
        [{ text: 'OK' }]
      );
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
