import React, { ReactElement, useEffect } from 'react';
import { Button, Text, View, Image } from 'react-native';
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
    <View className="flex-1 items-center justify-evenly bg-white p-4">
      <Image
        source={require('../../../assets/images/ytl_sea_digital_bank_project_logo.jpeg')}
      />
      <Text className="text-3xl font-robotoRegular text-center">
        Press the icon to login with Biometric Fingerprint
      </Text>
      <FontAwesome5
        name="fingerprint"
        size={64}
        color="black"
        className="mb-5"
        onPress={onLogin}
      />
      {!isBiometricSupported && (
        <View className="w-full my-10">
          <Button
            title="Or login here for web browser"
            onPress={navigateToHome}
          />
        </View>
      )}
    </View>
  );
}
