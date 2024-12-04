import React, { useEffect, useState } from 'react';
import {
    View,
    TextInput,
    Text,
    Button,
    StyleSheet,
    Platform,
    TouchableOpacity,
    Alert,
    ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BCBCoinOverview, Transaction } from '../types';
import NavigationButton from '../components/navigationbutton';
import { getCoinFromBC } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddTransactionScreen(): React.JSX.Element {
    const initialTransaction: Transaction = {
        description: '',
        value: 0,
        date: new Date(),
        hour: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        }),
        category: '',
        type: 'expense',
        coin: 'BRL',
    };

    const initialCoins: BCBCoinOverview[] = [
        {
            simbolo: '',
            tipoMoeda: '',
            nomeFormatado: '',
        },
    ];
    const [coins, setCoins] = useState<BCBCoinOverview[]>(initialCoins);

    const [transaction, setTransaction] =
        useState<Transaction>(initialTransaction);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    async function getCoinsFromBC() {
        try {
            const res: BCBCoinOverview[] =
                (await getCoinFromBC()) as BCBCoinOverview[];
            setCoins(res);
        } catch (err: any) {
            Alert.alert('Error', err.message);
        }
    }

    useEffect(() => {
        getCoinsFromBC();
    }, [coins]);

    function handleInputChange(field: keyof Transaction, value: string) {
        setTransaction((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    function handleValueChange(newValue: string) {
        const n = Number(newValue);
        if (isNaN(n)) {
            return;
        }
        setTransaction((prev) => ({
            ...prev,
            value: Number(newValue),
        }));
    }

    function handleDateChange(_: any, selectedDate?: Date) {
        setShowDatePicker(false);
        if (selectedDate) {
            setTransaction((prev) => ({
                ...prev,
                date: selectedDate,
            }));
        }
    }

    function handleTimeChange(_: any, selectedTime?: Date) {
        setShowTimePicker(false);
        if (selectedTime) {
            setTransaction((prev) => ({
                ...prev,
                hour: selectedTime.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                }),
            }));
        }
    }

    function validateFields(): boolean {
        if (
            transaction.description.trim() === '' ||
            transaction.category.trim() === '' ||
            transaction.value <= 0
        ) {
            Alert.alert(
                'Campos Inválidos',
                'Por favor, preencha todos os campos obrigatórios corretamente.',
            );
            return false;
        }
        return true;
    }

    async function handleSubmit() {
        if (!validateFields()) {
            return;
        }
        const oldTransactions =
            (await AsyncStorage.getItem('@transactions')) || '[]';
        const parsedTransactions = JSON.parse(oldTransactions) as Transaction[];
        const newTransactions = [...parsedTransactions, transaction];
        await AsyncStorage.setItem(
            '@transactions',
            JSON.stringify(newTransactions),
        );
        setTransaction(initialTransaction);
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
            <Text style={styles.label}>Descrição</Text>
            <TextInput
                style={styles.input}
                value={transaction.description}
                onChangeText={(text) => handleInputChange('description', text)}
                placeholder='Descrição da transação'
            />
            <Text style={styles.label}>Valor</Text>
            <TextInput
                style={styles.input}
                value={transaction.value.toString()}
                onChangeText={(text) => handleValueChange(text)}
                keyboardType='numeric'
                placeholder='Valor da transação'
            />
            <Text style={styles.label}>Categoria</Text>
            <TextInput
                style={styles.input}
                value={transaction.category}
                onChangeText={(text) => handleInputChange('category', text)}
                placeholder='Categoria da transação'
            />
            <Text style={styles.label}>Data</Text>
            <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={styles.dateButton}
            >
                <Text>{transaction.date.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    value={transaction.date}
                    mode='date'
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleDateChange}
                />
            )}
            <Text style={styles.label}>Hora</Text>
            <TouchableOpacity
                onPress={() => setShowTimePicker(true)}
                style={styles.dateButton}
            >
                <Text>{transaction.hour}</Text>
            </TouchableOpacity>
            {showTimePicker && (
                <DateTimePicker
                    value={transaction.date}
                    mode='time'
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleTimeChange}
                />
            )}
            <Text style={styles.label}>Tipo</Text>
            <Picker
                selectedValue={transaction.type}
                onValueChange={(itemValue: any) => handleInputChange('type', itemValue)}
                style={styles.picker}
            >
                <Picker.Item label='Despesa' value='expense' />
                <Picker.Item label='Receita' value='income' />
            </Picker>
            <Text style={styles.label}>Moeda</Text>
            <Picker
                selectedValue={transaction.coin}
                onValueChange={(itemValue: any) => handleInputChange('coin', itemValue)}
                style={styles.picker}
            >
                {coins.length > 0 &&
                    coins.map((coin) => (
                        <Picker.Item
                            key={coin.simbolo}
                            label={`${coin.nomeFormatado} (${coin.simbolo})`}
                            value={coin.simbolo}
                        />
                    ))}
            </Picker>
            <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
                <Text style={styles.addButtonText}>Adicionar Transação</Text>
            </TouchableOpacity>
            <View style={styles.homeButtonContainer}>
                <NavigationButton
                    route='Home'
                    name='Overview'
                    style={styles.homeButton}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    homeButton: {
        margin: 'auto',
    },
    homeButtonContainer: {
        flex: 1,
    },
    addButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    scroll: {
        justifyContent: 'center',
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    picker: {
        marginBottom: 16,
    },
    dateButton: {
        padding: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginBottom: 16,
        justifyContent: 'center',
    },
});
