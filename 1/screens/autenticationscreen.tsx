import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { useStackNavigation } from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegistrationScreen(): React.JSX.Element {
    const navigation = useStackNavigation();
    const [form, setForm] = useState({ name: '', password: '' });

    function handleChange(field: keyof typeof form, value: string) {
        setForm((prevForm) => ({ ...prevForm, [field]: value }));
    }

    async function handleRegister() {
        if (!form.name || !form.password) {
            Alert.alert('Erro', 'Todos os campos são obrigatórios.');
            return;
        }
        await AsyncStorage.setItem('@user', JSON.stringify(form));
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro</Text>
            <TextInput
                style={styles.input}
                placeholder='Nome'
                value={form.name}
                onChangeText={(text) => handleChange('name', text)}
            />
            <TextInput
                style={styles.input}
                placeholder='Senha'
                secureTextEntry
                value={form.password}
                onChangeText={(text) => handleChange('password', text)}
            />
            <Button title='Cadastrar' onPress={handleRegister} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f7f7f7',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
});
