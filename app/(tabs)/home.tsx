import { View, Text, FlatList } from 'react-native'
import React, { ReactElement } from 'react'
import TransactionItem from '../components/TransactionItem'
import { TransactionType } from '../components/models'
import mockData from '../data/mockData.json'
import { TransactionItemProps } from "../components/TransactionItem"


export default function Home() {
  return (
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
    />
    // <View>
    //   <Text>Home</Text>
    //   {
    //     mockData.map((transaction) => (
    //       <TransactionItem 
    //         id={transaction.id} 
    //         amount={transaction.amount} 
    //         date={transaction.date} 
    //         description={transaction.description} 
    //         type={transaction.type as TransactionType}
    //       />
    //     ))
    //   }
    // </View>
  )
}
