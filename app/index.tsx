import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';
import * as LocalAuthentication from "expo-local-authentication"
import { useEffect, useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

export default function App() {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  async function loginAuth() {
    const getEnrolledAuth = await LocalAuthentication.getEnrolledLevelAsync()
    const hasHardwareAuth = await LocalAuthentication.hasHardwareAsync()
    const isEnrolledAuth = await LocalAuthentication.isEnrolledAsync()
    const supportedAuth = await LocalAuthentication.supportedAuthenticationTypesAsync()

    console.log('Supported: ', supportedAuth)
    console.log({getEnrolledAuth, hasHardwareAuth, isEnrolledAuth})
  }

  useEffect(() => {
    loginAuth();
  })

  return (
    <>
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-2xl font-robotoRegular">Login with Biometric</Text>
        <StatusBar style="auto"></StatusBar>
        <Link href="/home" style={{ color: 'blue' }}>
          Login to Home
        </Link>
        <FontAwesome5 name="fingerprint" size={36} color="black" className="pt-5" />
      </View>
    </>
  );
}
