import { Stack, useLocalSearchParams } from 'expo-router';
import { ReactElement } from 'react';

export default function TransactionDetailLayout(): ReactElement {
  const { id } = useLocalSearchParams();
  return (
    <Stack
      screenOptions={{
        title: `Transaction Detail ID: ${id}`,
        headerShown: true,
      }}
    ></Stack>
  );
}
