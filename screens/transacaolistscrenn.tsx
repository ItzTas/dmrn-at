import React from 'react';
import { Transaction } from '../types';
import { FlatList, StyleSheet, View } from 'react-native';
import TransacaoItemList from '../components/transacaoitemlist';
import { Button } from '@react-navigation/elements';

interface Props {
  transactions: Transaction[];
}

export default function TransacaoListScreen({
  transactions,
}: Props): React.JSX.Element {
  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <TransacaoItemList transaction={item} />}
        contentContainerStyle={styles.listContent}
      />

      <Button action={{ type: 'NAVIGATE', payload: { name: 'Home' } }}>
        Home
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
  listContent: {
    gap: 10,
  },
});
