import { StyleSheet, SafeAreaView } from 'react-native';
import { Transaction } from './types';
import RootStack from './stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text } from '@react-navigation/elements';

export default function App() {
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

  return (
    <SafeAreaView style={{ ...styles.container }}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
