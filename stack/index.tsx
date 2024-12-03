import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TransacaoListScreen from '../screens/transacaolistscrenn';
import { Transaction } from '../types';

const Stack = createNativeStackNavigator();

export default function RootStack(): React.JSX.Element {
  const transactions: Transaction[] = [
    {
      description: 'Compra no mercado',
      value: 120.5,
      date: new Date(),
      hour: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      category: 'Alimentação',
      type: 'expense',
      coin: 'BRL',
    },
    {
      description: 'Salário',
      value: 3000,
      date: new Date(),
      hour: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      category: 'Renda',
      type: 'income',
      coin: 'BRL',
    },
  ];

  const TransacaoListScreenComponent = () => (
    <TransacaoListScreen transactions={transactions} />
  );

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={TransacaoListScreenComponent}
        options={{ orientation: 'all' }}
      />
    </Stack.Navigator>
  );
}
