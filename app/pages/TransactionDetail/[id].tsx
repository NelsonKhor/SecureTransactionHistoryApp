import { useRouter, useLocalSearchParams } from 'expo-router';
import { Text, View, TouchableOpacity } from 'react-native';
import React, { ReactElement } from 'react';
import useStore from '../../store/useStore';
import { TransactionType } from '../../components/models';
import useAuthorization from '../../hooks/useAuthorization';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function TransactionDetails(): ReactElement {
  const { id, amount, date, description, type } = useLocalSearchParams();
  const isAuthorized = useStore((state) => state.isAuthorized);
  const { onToggleAuthorization } = useAuthorization();

  return (
    <View className="flex-1 bg-gray-100 p-6">
      <View className="bg-white rounded-lg shadow-md p-4">
        <Text className="font-robotoBold text-2xl mb-2">
          Transaction ID: {id}
        </Text>
        <Text className="font-robotoRegular text-lg text-gray-600 mb-4">
          Date: {date}
        </Text>
        <View className="flex-row items-center justify-center mb-4 h-20">
          <Text className="font-robotoBold text-4xl text-gray-800">
            RM {isAuthorized ? Number(amount).toFixed(2) : '*****'}
          </Text>
          {!isAuthorized && (
            <TouchableOpacity className="p-1" onPress={onToggleAuthorization}>
              <FontAwesome5 name="eye-slash" size={32} color="gray" />
            </TouchableOpacity>
          )}
        </View>
        <Text className="font-robotoRegular text-xl mb-2">
          Description: {description}
        </Text>
        <View className="mt-4">
          <Text
            className={`font-robotoRegular text-2xl ${type === TransactionType.credit ? 'text-green-700' : 'text-red-500'}`}
          >
            {type}
          </Text>
        </View>
      </View>
    </View>
  );
}
