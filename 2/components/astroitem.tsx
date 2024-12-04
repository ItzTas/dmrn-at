import React from 'react';
import { Text, Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Item } from '../types/nasa.astro';
import { extractImagePreviewFromItem } from '../utils';

interface Props {
    item: Item;
    onClick: () => void;
}

export default function ItemDisplay({ item, onClick }: Props) {
    const data = item.data[0];
    const imageUrls = extractImagePreviewFromItem(item);

    if (imageUrls.length === 0) {
        return <></>;
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onClick}>
            <Text style={styles.imageName}>{data.title}</Text>
            <View>
                {imageUrls.map((url, i) => (
                    <Image
                        source={{ uri: url }}
                        style={styles.image}
                        key={`${url}${i}`}
                    />
                ))}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    imageName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 8,
    },
});
