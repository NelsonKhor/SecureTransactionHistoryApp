import React, { ReactElement, useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import useAuthentication from '../../hooks/useAuthentication';

export default function Login(): ReactElement {
  const { isBiometricSupported, onLogin } = useAuthentication();

  const navigateToHome = () => {
    router.push('/home');
  };

  useEffect(() => {
    onLogin();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-robotoRegular w-4/5 text-center">
        Press the icon to login with Biometric Fingerprint
      </Text>
      <FontAwesome5
        name="fingerprint"
        size={36}
        color="black"
        className="m-5"
        onPress={onLogin}
      />
      {!isBiometricSupported && (
        <Button
          title="Or login here for web browser"
          onPress={navigateToHome}
        />
      )}
    </View>
  );
}
