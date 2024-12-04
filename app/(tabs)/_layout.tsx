import { View, Text, Image, ImageSourcePropType, ImageResizeMode } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import icons from '../../assets/icons/icons'

export interface TabIconProps {
    icon: string
    color: string
    name: string
    focused: boolean
}

function TabIcon({ icon, color, name, focused }: TabIconProps) {
    return (
        <View className='items-center justify-center gap-2'>
            <Image
                source={icon as ImageSourcePropType}
                resizeMode='contain'
                tintColor={color}
                className='h-1/2 w-1/2'
            />
            <Text className={`${focused ? 'font-robotoBold' : 'font-robotoRegular'}`}>
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
                            focused={focused}
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
                            focused={focused}
                        />
                    )
                }}
            />
        </Tabs>
    </>
  )
}
