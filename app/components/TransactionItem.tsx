import { Text, View } from 'react-native';
import React, { ReactElement } from 'react';
import { TransactionType } from './models';
import useStore from '../store/useStore';
import { Link } from 'expo-router';

export interface TransactionItemProps {
  id: number;
  amount: number;
  date: string;
  description: string;
  type: TransactionType;
}

const cardStyle =
  'border-solid rounded-md bg-primaryBlue mx-2 my-4 shadow-md opacity-1';

export default function TransactionItem({
  id,
  amount,
  date,
  description,
  type,
}: TransactionItemProps): ReactElement {
  const isAuthorized = useStore((state) => state.isAuthorized);

  return (
    <Link
      href={{
        pathname: `../pages/TransactionDetail/${id}`,
        params: { amount, date, description, type },
      }}
      className={cardStyle}
    >
      <View className="container">
        <View className="flex-row justify-between m-2">
          <Text>ID: {id}</Text>
          <Text>{date}</Text>
        </View>
        <View className="align-middle m-2">
          <Text className="font-bold text-lg">
            RM {isAuthorized ? amount.toFixed(2) : '*****'}
          </Text>
        </View>

        <View className="flex-row justify-between m-2">
          <Text>{description}</Text>
          {type === TransactionType.credit ? (
            <Text className="color-green-700">{type}</Text>
          ) : (
            <Text className="color-red-500">{type}</Text>
          )}
        </View>
      </View>
    </Link>
  );
}
