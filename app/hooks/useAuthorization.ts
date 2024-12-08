import { useCallback } from 'react';
import { Alert } from 'react-native';
import useStore from '../store/useStore';
import * as LocalAuthentication from 'expo-local-authentication';

export default function useAuthorization() {
  const isAuthorized = useStore((state) => state.isAuthorized);
  const setIsAuthorized = useStore((state) => state.setIsAuthorized);

  const toggleAuthorization = useCallback(async (): Promise<void> => {
    try {
      if (isAuthorized) {
        setIsAuthorized(false);
        return;
      }

      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
        Alert.alert(
          'Authentication Error',
          'Biometric authentication is not supported or enrolled on this device.',
          [{ text: 'OK' }]
        );
        return;
      }

      const result: LocalAuthentication.LocalAuthenticationResult =
        await LocalAuthentication.authenticateAsync();

        if (result.success) {
          setIsAuthorized(true);
        } else {
          Alert.alert(
            'Authentication Failed',
            'Biometric authentication failed. Please try again.',
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
    }, [isAuthorized, setIsAuthorized]);
  
  return { isAuthorized, toggleAuthorization };
}
  