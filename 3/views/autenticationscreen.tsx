// src/screens/LoginScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function LoginScreen() {
    const [token, setToken] = useState<string>('');

    function handleLogin() {
        if (!token) {
            Alert.alert('Erro', 'Por favor, insira um token de autenticação.');
            return;
        }

        Alert.alert('Sucesso', 'Token autenticado com sucesso!');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Autenticação GitHub</Text>
            <TextInput
                style={styles.input}
                placeholder='Digite seu token do GitHub'
                value={token}
                onChangeText={setToken}
                secureTextEntry
            />
            <Button title='Entrar' onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 4,
    },
});
