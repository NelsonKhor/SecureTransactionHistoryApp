import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Link } from 'expo-router';

export default function App() {
  return (
    <>
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-2xl font-robotoRegular">Welcome Back!!!</Text>
        <StatusBar style="auto"></StatusBar>
        <Link href="/homescreen" style={{ color: 'blue' }}>
          Login to HomeScreen
        </Link>
      </View>
    </>
  );
}
