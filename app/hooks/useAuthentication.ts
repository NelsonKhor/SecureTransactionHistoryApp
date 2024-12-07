import { useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import * as LocalAuthentication from "expo-local-authentication"
import useStore from '../store/useStore';

export interface AuthenticationHook {
    isBiometricSupported: boolean
    onLogin: () => Promise<void>
    onLogout: () => Promise<void>
}

export default function useAuthentication(): AuthenticationHook {
  const [isBiometricSupported, setIsBiometricSupported] = useState<boolean>(false);
  const setIsLoggedin = useStore((state) => state.setIsLoggedin);

  async function onLogin(): Promise<void> {
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

  async function onLogout(): Promise<void> {
    try {
      setIsLoggedin(false)
    } catch (error) {
    }
  }

  return {
    isBiometricSupported,
    onLogin,
    onLogout,
  }
}
