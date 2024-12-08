import { View, Text, Button } from 'react-native';
import React, { ReactElement } from 'react';
import { useRouter } from 'expo-router';
import useStore from '../store/useStore';

export default function Setting(): ReactElement {
  const router = useRouter();
  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);
  const setIsAuthorized = useStore((state) => state.setIsAuthorized);

  function handleLogout(): void {
    setIsLoggedIn(false);
    setIsAuthorized(false);
    router.replace('/pages/Login');
  }

  return (
    <View className="flex-1 container p-5 justify-between">
      <Text className="font-robotoBold text-3xl mb-6">Settings</Text>
      <View>
        <Button title="Log Out" onPress={handleLogout} />
      </View>
    </View>
  );
}
