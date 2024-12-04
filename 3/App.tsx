import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import RootStack from './stack';

export default function App() {
    return (
        <View style={styles.container}>
            <NavigationContainer>
                <RootStack />
            </NavigationContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
