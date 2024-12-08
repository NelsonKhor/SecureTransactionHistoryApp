import {
    View,
    Text,
    Image,
    ImageSourcePropType,
    BackHandler,
  } from 'react-native';
  import React, { ReactElement, useCallback } from 'react';
  import { Tabs, useFocusEffect } from 'expo-router';
  import icons from '../../assets/icons/icons';
  import useStore from '../store/useStore';
  
  export interface TabIconProps {
    icon: string | ImageSourcePropType;
    color: string;
    name: string;
    isFocused: boolean;
  }
  
  function TabIcon({ icon, color, name, isFocused }: TabIconProps) {
    const source = typeof icon === 'string' ? { uri: icon } : icon;
  
    return (
      <View className="items-center justify-center gap-2">
        <Image
          source={source}
          resizeMode="contain"
          tintColor={color}
          className="h-6 w-6"
        />
        <Text
          className={`${isFocused ? 'font-robotoBold' : 'font-robotoRegular'} w-20 text-center`}
        >
          {name}
        </Text>
      </View>
    );
  }
  
  export default function TabsLayout(): ReactElement {
    const isLoggedIn = useStore((state) => state.isLoggedIn);
  
    // Prevent back button from logging out
    useFocusEffect(
      useCallback(() => {
        const onBackPress = () => {
          if (isLoggedIn) {
            return true;
          }
          // If not on home screen, allow back button to work
          return false;
        };
  
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      }, [isLoggedIn])
    );
  
    return (
      <>
        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
              height: 70,
              paddingTop: 15,
            },
            headerShown: false
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
              ),
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
              ),
            }}
          />
        </Tabs>
      </>
    );
  }
  