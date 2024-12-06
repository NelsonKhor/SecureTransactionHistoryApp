import { View, Text, Image, ImageSourcePropType, ImageResizeMode } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import icons from '../../assets/icons/icons'

export interface TabIconProps {
    icon: string | ImageSourcePropType
    color: string
    name: string
    isFocused: boolean
}

function TabIcon({ icon, color, name, isFocused }: TabIconProps) {
    const source = typeof icon === 'string' ? { uri: icon } : icon

    return (
        <View className='items-center justify-center gap-2'>
            <Image
                source={source}
                resizeMode='contain'
                tintColor={color}
                className='h-6 w-6'
            />
            <Text className={`${isFocused ? 'font-robotoBold' : 'font-robotoRegular'}`}>
                {name}
            </Text>
        </View>
    )
}

export default function TabsLayout() {
  return (
    <>
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 70,
                    paddingTop: 15,
                }
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.home}
                            color={color}
                            name="Home"
                            isFocused={focused}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="setting"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.settings}
                            color={color}
                            name="Settings"
                            isFocused={focused}
                        />
                    )
                }}
            />
        </Tabs>
    </>
  )
}
