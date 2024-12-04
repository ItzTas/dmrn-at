import React, { useState, useEffect } from 'react';
import { Alert, FlatList, StyleSheet, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Transaction } from '../types';
import TransacaoItemList from '../components/transacaoitemlist';
import NavigationButton from '../components/navigationButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TransacaoListScreen(): React.JSX.Element {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [filter, setFilter] = useState('');
    const [sortKey, setSortKey] = useState<keyof Transaction | null>(null);
    const [filteredTransactions, setFilteredTransactions] = useState<
        Transaction[]
    >([]);

    async function getTransactions() {
        try {
            const storedTransactions = await AsyncStorage.getItem('@transactions');
            const parsedTransactions = storedTransactions
                ? JSON.parse(storedTransactions)
                : [];
            setTransactions(parsedTransactions);
        } catch (err: any) {
            Alert.alert('Error', err.message);
        }
    }

    useEffect(() => {
        getTransactions();
    }, []);

    useEffect(() => {
        let result = [...transactions];

        if (filter) {
            result = result.filter((transaction) =>
                transaction.description.toLowerCase().includes(filter.toLowerCase()),
            );
        }

        if (sortKey) {
            result.sort((a, b) => {
                const aValue = a[sortKey];
                const bValue = b[sortKey];

                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    return aValue.localeCompare(bValue);
                }

                if (typeof aValue === 'number' && typeof bValue === 'number') {
                    return aValue - bValue;
                }

                if (aValue instanceof Date && bValue instanceof Date) {
                    return aValue.getTime() - bValue.getTime();
                }

                return 0;
            });
        }

        setFilteredTransactions(result);
    }, [filter, sortKey, transactions]);

    const renderHeader = () => (
        <View style={styles.header}>
            <TextInput
                style={styles.input}
                placeholder='Filtrar transações'
                value={filter}
                onChangeText={setFilter}
            />
            <Picker
                selectedValue={sortKey}
                onValueCha // Padding to avoid cutoff of last itemge={(itemValue) => setSortKey(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label='Ordenar por...' value={null} />
                <Picker.Item label='Descrição' value='description' />
                <Picker.Item label='Valor' value='value' />
                <Picker.Item label='Data' value='date' />
                <Picker.Item label='Hora' value='hour' />
                <Picker.Item label='Categoria' value='category' />
                <Picker.Item label='Tipo' value='type' />
                <Picker.Item label='Moeda' value='coin' />
            </Picker>
        </View>
    );

    return (
        <FlatList
            ListHeaderComponent={renderHeader}
            data={filteredTransactions}
            keyExtractor={(item, index) => `${item.description}-${index}`}
            renderItem={({ item }) => <TransacaoItemList transaction={item} />}
            contentContainerStyle={styles.listContent}
        />
    );
}

const styles = StyleSheet.create({
    header: {
        padding: 10,
        backgroundColor: '#f9f9f9',
    },
    container: {
        flex: 1,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    picker: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginBottom: 16,
    },
    listContent: {
        paddingBottom: 20,
    },
});
