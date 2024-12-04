import React from 'react';
import { View } from 'react-native';
import NavigationButton from '../components/navigationbutton';

export default function Overview(): React.JSX.Element {
    return (
        <View style={{ gap: 20, marginTop: 20 }}>
            <NavigationButton route='Transactions' />
            <NavigationButton route='AddTransaction' name='Add Transaction' />
        </View>
    );
}
