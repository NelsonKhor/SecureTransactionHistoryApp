import { View, Text, FlatList, RefreshControl } from 'react-native'
import React, { ReactElement, useCallback, useState } from 'react'
import TransactionItem from '../components/TransactionItem'
import { TransactionType } from '../components/models'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import mockData from '../data/mockData.json'
import useStore from '../store/useStore';
import useAuthorization from '../hooks/useAuthorization';


export default function Home(): ReactElement {
  const [ isRefreshing, setIsRefreshing ] = useState<boolean>(false)
  const isAuthorized = useStore((state) => state.isAuthorized)
  const { onAuthorized, onUnauthorized } = useAuthorization()

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    // mock fetching data for 2 sec
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }, []);

  return (
    <>
      <View className='mx-2 my-6'>
        <Text className='font-robotoBold text-4xl'>
          Welcome back!
        </Text>
        <Text className='font-robotoRegular text-xl'>
          You can view your transaction history below.
        </Text>
        <View className='m-2'>
        {isAuthorized 
          ? <FontAwesome5 name="eye" size={24} color="black" onPress={onAuthorized} /> 
          : <FontAwesome5 name="eye-slash" size={24} color="black" onPress={onUnauthorized}/> }
        </View>
      </View>
      <FlatList
        data={mockData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(transaction) => 
          <TransactionItem     
            id={transaction.item.id} 
            amount={transaction.item.amount} 
            date={transaction.item.date} 
            description={transaction.item.description}
            type={transaction.item.type as TransactionType}
          />
        }
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh}/>
        }
      />
    </>
  )
}
