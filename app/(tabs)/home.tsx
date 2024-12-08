import {
  View,
  Text,
  FlatList,
  RefreshControl,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, { ReactElement, useCallback, useState } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import TransactionItem, {
  TransactionItemProps,
} from '../components/TransactionItem';
import { TransactionType } from '../components/models';
import mockData from '../data/mockData.json';
import useAuthorization from '../hooks/useAuthorization';
import { generateTransactionData } from '../utils/utils'

export default function Home(): ReactElement {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const { isAuthorized, onToggleAuthorization } = useAuthorization();
  const [data, setData] = useState<TransactionItemProps[]>(
    mockData as TransactionItemProps[]
  );

  const onRefresh = useCallback((): void => {
    setIsRefreshing(true);
    setTimeout(() => {
      // mock fetching new data, then add it to the top of the list
      let mockNewData = generateTransactionData();
      setData((prevData) => [mockNewData, ...prevData]);
      // mimic a loading time of 2 seconds
      setIsRefreshing(false);
    }, 2000);
  }, []);

  return (
    <>
      <View className="px-2 py-6 bg-white">
        <Text className="font-robotoBold text-4xl">Welcome back!</Text>
        <Text className="font-robotoRegular text-xl">
          You can view your transaction history below.
        </Text>
        <View className="flex-row items-start mt-2">
          <Text>
            Toggle to mask/unmask sensitive data: 
          </Text>
          <TouchableOpacity className="p-1" onPress={onToggleAuthorization}>
            {isAuthorized ? (
              <FontAwesome5
                name="eye"
                size={24}
                color="gray"
                onPress={() => onToggleAuthorization()}
              />
            ) : (
              <FontAwesome5
                name="eye-slash"
                size={24}
                color="gray"
                onPress={() => onToggleAuthorization()}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(transaction) => (
          <TransactionItem
            id={transaction.item.id}
            amount={transaction.item.amount}
            date={transaction.item.date}
            description={transaction.item.description}
            type={transaction.item.type as TransactionType}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      />
    </>
  );
}
