import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    FlatList,
} from 'react-native';

interface Props {
    astros: string[];
    onSearch: (astro: string) => void;
}

export default function SearchBar({ astros, onSearch }: Props) {
    const [selectedAstro, setSelectedAstro] = useState<string>(astros[0]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const handleSelectAstro = (astro: string) => {
        setSelectedAstro(astro);
        onSearch(astro);
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Escolha um astro:</Text>
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.picker}
            >
                <Text>
                    {selectedAstro.charAt(0).toUpperCase() + selectedAstro.slice(1)}
                </Text>
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType='slide'
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={astros}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => handleSelectAstro(item)}
                                    style={styles.modalItem}
                                >
                                    <Text>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    picker: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        width: '80%',
        borderRadius: 10,
        padding: 20,
    },
    modalItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});
