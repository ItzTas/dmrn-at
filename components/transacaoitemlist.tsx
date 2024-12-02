import React from 'react';
import { Transaction } from '../types';
import { StyleSheet, View, Text } from 'react-native';

interface Props {
    transaction: Transaction;
}

export default function TransacaoItemList({
    transaction,
}: Props): React.JSX.Element {
    const formattedValue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: transaction.coin,
    }).format(transaction.value);

    const formattedDate = transaction.date.toLocaleDateString();
    const formattedTime = transaction.hour;

    return (
        <View style={styles.container}>
            <Text style={styles.description}>{transaction.description}</Text>
            <Text
                style={[
                    styles.value,
                    transaction.type === 'expense'
                        ? styles.colorExpense
                        : styles.colorIncome,
                ]}
            >
                {formattedValue}
            </Text>
            <View style={styles.detailsContainer}>
                <Text style={styles.type}>
                    {transaction.type === 'expense' ? 'Despesa' : 'Receita'}
                </Text>
                <Text style={styles.date}>Data: {formattedDate}</Text>
                <Text style={styles.time}>Hora: {formattedTime}</Text>
                <Text style={styles.category}>Categoria: {transaction.category}</Text>
                <Text style={styles.coin}>Moeda: {transaction.coin}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 6,
    },
    description: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
    },
    value: {
        fontSize: 18,
        fontWeight: '700',
        marginVertical: 10,
    },
    detailsContainer: {
        marginTop: 12,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    type: {
        fontSize: 16,
        fontWeight: '600',
    },
    date: {
        fontSize: 14,
        color: '#888',
    },
    time: {
        fontSize: 14,
        color: '#888',
    },
    category: {
        fontSize: 16,
        color: '#444',
    },
    coin: {
        fontSize: 16,
        color: '#444',
    },
    colorExpense: {
        color: '#ff4d4d',
    },
    colorIncome: {
        color: '#28a745',
    },
});
