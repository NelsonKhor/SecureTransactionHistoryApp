import { Stack, useLocalSearchParams } from 'expo-router';

export default function TransactionDetailLayout() {
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
