import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParams } from '../types/stack';

const Stack = createNativeStackNavigator<RootStackParams>();

export default function RootStack(): React.JSX.Element {
    const ImageGallery = React.lazy(() => import('../views/imagegallery'));
    const ImageDetails = React.lazy(() => import('../views/imagedetails'));

    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Home'
                component={ImageGallery}
                options={{ title: 'Galeria' }}
            />
            <Stack.Screen
                name='Details'
                component={ImageDetails}
                options={{ title: 'Detalhes' }}
            />
        </Stack.Navigator>
    );
}
