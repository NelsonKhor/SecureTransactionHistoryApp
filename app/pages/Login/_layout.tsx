import { Stack } from 'expo-router';
import React from 'react';

export default function LoginLayout(): React.ReactElement {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    ></Stack>
  );
}
