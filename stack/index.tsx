import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TransacaoListScreen from '../screens/transacaolistscrenn';
import AutenticationScreen from '../screens/autenticationscreen';
import OverviewScreen from '../screens/overviewscreen';
import { useStackNavigation } from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddTransactionScreen from '../screens/addtransactionscreen';
import { Alert } from 'react-native';

const Stack = createNativeStackNavigator();

export default function RootStack(): React.JSX.Element {
    const navigation = useStackNavigation();

    useEffect(() => {
        async function checkUser() {
            try {
                const user = await AsyncStorage.getItem('@user');
                if (!user) {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Autentication' }],
                    });
                }
            } catch (err: any) {
                Alert.alert('Error fetching user data:', err);
            }
        }

        checkUser();
    }, [navigation]);

    return (
        <Stack.Navigator screenOptions={{ orientation: 'all' }}>
            <Stack.Screen
                name='Home'
                component={OverviewScreen}
                options={{ title: 'Overview', orientation: 'all' }}
            />
            <Stack.Screen
                name='Autentication'
                component={AutenticationScreen}
                options={{
                    headerLeft: () => null,
                    gestureEnabled: false,
                    orientation: 'all',
                }}
            />
            <Stack.Screen
                name='Transactions'
                component={TransacaoListScreen}
                options={{ title: 'Transactions', orientation: 'all' }}
            />
            <Stack.Screen
                name='AddTransaction'
                component={AddTransactionScreen}
                options={{ title: 'Add Transaction', orientation: 'all' }}
            />
        </Stack.Navigator>
    );
}
