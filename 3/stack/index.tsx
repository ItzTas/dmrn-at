import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useStackNavigation } from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { RootStackParamList } from '../types';
import ReposScreen from '../views/reposscreen';
const AutenticationScreen = React.lazy(
    () => import('../views/autenticationscreen'),
);

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack(): React.JSX.Element {
    const navigation = useStackNavigation();

    useEffect(() => {
        async function checkUser() {
            try {
                const token = await AsyncStorage.getItem('@token');
                if (!token) {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Autentication' }],
                    });
                }
            } catch (err: any) {
                Alert.alert('Error fetching token data:', err);
            }
        }

        checkUser();
    }, [navigation]);

    return (
        <Stack.Navigator screenOptions={{ orientation: 'all' }}>
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
                name='Home'
                component={ReposScreen}
                options={{ title: 'Repos', orientation: 'all' }}
            />
        </Stack.Navigator>
    );
}
