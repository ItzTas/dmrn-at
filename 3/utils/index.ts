import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Orientation, RootStackParamList } from '../types';
import { Alert, Dimensions, StyleProp, ViewStyle } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function useOrientation(): 'portrait' | 'landscape' {
    const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
        Dimensions.get('window').height > Dimensions.get('window').width
            ? 'portrait'
            : 'landscape',
    );

    useEffect(() => {
        const updateOrientation = () => {
            const { width, height } = Dimensions.get('window');
            setOrientation(height > width ? 'portrait' : 'landscape');
        };

        const subscription = Dimensions.addEventListener(
            'change',
            updateOrientation,
        );

        return () => subscription.remove();
    }, []);

    return orientation;
}

function selectByOrientation({
    portrait = {},
    landscape = {},
}: Orientation): StyleProp<ViewStyle> {
    const orientation = useOrientation();
    return orientation === 'portrait' ? portrait : landscape;
}

function useStackNavigation(): NavigationProp<RootStackParamList> {
    const result = useNavigation<NavigationProp<RootStackParamList>>();
    return result;
}

async function getUserToken(): Promise<string> {
    const token = await AsyncStorage.getItem('@token');
    if (!token) {
        sendToAutenticationScreenAndClearToken();
        return '';
    }
    return token;
}

async function sendToAutenticationScreenAndClearToken() {
    const navigation = useStackNavigation();
    navigation.reset({
        index: 0,
        routes: [{ name: 'Autentication' }],
    });
    Alert.alert('Token exirado!');
    await AsyncStorage.removeItem('@token');
}

export {
    useStackNavigation,
    useOrientation,
    selectByOrientation,
    getUserToken,
    sendToAutenticationScreenAndClearToken,
};
