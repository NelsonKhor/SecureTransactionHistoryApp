import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Link } from "expo-router";


export default function RootLayout() {
  return (
    <>
        <View style={style.container}>
            <Text>Welcome Back!</Text>
            <StatusBar style="auto"></StatusBar>
            <Link href="/homescreen" style={{ color: 'blue' }}>
                Login to HomeScreen
            </Link>
        </View>
    </>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
