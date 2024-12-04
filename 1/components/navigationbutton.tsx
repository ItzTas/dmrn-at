import React from 'react';
import { Button } from '@react-navigation/elements';
import { StyleSheet, ViewStyle } from 'react-native';

interface Props {
    route: string;
    name?: string | null;
    style?: ViewStyle | {};
}

export default function NavigationButton({
    route,
    name = null,
    style = {},
}: Props): React.JSX.Element {
    if (!name) {
        name = route;
    }

    return (
        <Button
            action={{
                type: 'NAVIGATE',
                payload: { name: route },
            }}
            style={{ ...styles.button, ...style }}
            color='#fff'
            variant='tinted'
        >
            {name}
        </Button>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: '#6200ea',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
});
