import { Button } from '@react-navigation/elements';
import React from 'react';
import { View } from 'react-native';

export default function AutenticationScreen(): React.JSX.Element {
  return (
    <View>
      <Button action={{ type: 'NAVIGATE', payload: { name: 'transactions' } }}>
        Ver transações
      </Button>
    </View>
  );
}
