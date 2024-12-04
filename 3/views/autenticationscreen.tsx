import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useStackNavigation } from '../utils';
import { getUserWithToken } from '../api';

export default function LoginScreen() {
    const [token, setToken] = useState<string>('');

    const navigation = useStackNavigation();

    async function handleLogin() {
        if (!token.trim()) {
            Alert.alert('Erro', 'Por favor, insira um token de autenticação.');
            return;
        }

        try {
            await AsyncStorage.setItem('@token', JSON.stringify(token.trim()));

            // also throws error when token is invalid
            await getUserWithToken(token.trim());

            await AsyncStorage.setItem('@token', token.trim());
        } catch (err: any) {
            Alert.alert('Erro', `Não foi possível salvar o token. \n ${err.message}`);
            return;
        }
        Alert.alert('Sucesso', 'Token autenticado com sucesso!');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Autenticação GitHub</Text>
            <TextInput
                style={styles.input}
                placeholder='Digite seu token do GitHub'
                value={token}
                onChangeText={(text) => {
                    setToken(text.trim());
                }}
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
