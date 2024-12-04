import React from 'react';
import { Transaction } from '../types';
import { StyleSheet, View, Text } from 'react-native';
import { useOrientation } from '../utils';

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

    transaction.date = new Date(transaction.date);

    const formattedDate = transaction.date.toLocaleDateString();
    const formattedTime = transaction.hour;
    const orientation = useOrientation();

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
                {orientation === 'portrait' && (
                    <Text style={styles.date}>Data: {formattedDate}</Text>
                )}
                {orientation === 'landscape' && (
                    <>
                        <Text style={styles.type}>
                            {transaction.type === 'expense' ? 'Despesa' : 'Receita'}
                        </Text>
                        <Text style={styles.date}>Data: {formattedDate}</Text>
                        <Text style={styles.time}>Hora: {formattedTime}</Text>
                        <Text style={styles.category}>
                            Categoria: {transaction.category}
                        </Text>
                        <Text style={styles.coin}>Moeda: {transaction.coin}</Text>
                    </>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderRadius: 12,
        backgroundColor: '#f8f8f8',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        marginBottom: 15,
    },
    description: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    value: {
        fontSize: 20,
        fontWeight: '700',
        marginVertical: 12,
    },
    detailsContainer: {
        marginTop: 10,
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    type: {
        fontSize: 14,
        fontWeight: '500',
        marginVertical: 4,
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
        fontSize: 14,
        color: '#555',
    },
    coin: {
        fontSize: 14,
        color: '#555',
    },
    colorExpense: {
        color: '#e74c3c', // Red for expense
    },
    colorIncome: {
        color: '#2ecc71', // Green for income
    },
});
