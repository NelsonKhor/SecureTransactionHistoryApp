import { Alert } from 'react-native';
import * as LocalAuthentication from "expo-local-authentication"
import useStore from '../store/useStore';

export interface AuthorizationHook {
  onAuthorized: () => Promise<void>
  onUnauthorized: () => Promise<void>
}

export default function useAuthorization(): AuthorizationHook {
  const { isAuthorized, setIsAuthorized } = useStore((state) => ({
    isAuthorized: state.isAuthorized,
    setIsAuthorized: state.setIsAuthorized,
  }));

  async function onAuthorized(): Promise<void> {
    try {
      const hasHardwareAuth = await LocalAuthentication.hasHardwareAsync()
      const isEnrolledAuth = await LocalAuthentication.isEnrolledAsync()
      
      if (hasHardwareAuth && isEnrolledAuth && !isAuthorized) {
        const respond: LocalAuthentication.LocalAuthenticationResult = await LocalAuthentication.authenticateAsync();
        if (respond.success) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
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

  async function onUnauthorized(): Promise<void> {
    try {
      setIsAuthorized(false)
    } catch (error) {
    }
  }

  return {
    onAuthorized,
    onUnauthorized,
  }
}
