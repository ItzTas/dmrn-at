import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import ImageGallery from './views/imagegallery';

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='auto' />
            <ImageGallery />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
