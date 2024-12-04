import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Linking,
    TouchableOpacity,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParams } from '../types/stack';
import { extractImagePreviewFromItem } from '../utils';

interface Props {
    route: RouteProp<RootStackParams, 'Details'>;
}

export default function ImageDetails({ route }: Props): React.JSX.Element {
    const { item } = route.params;
    const data = item.data[0];
    const imageUrls = extractImagePreviewFromItem(item);

    const openLink = (url: string) => {
        Linking.openURL(url);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{data.title}</Text>

            {imageUrls.length > 0 ? (
                imageUrls.map((url, index) => (
                    <Image key={index} source={{ uri: url }} style={styles.image} />
                ))
            ) : (
                <Text style={styles.noImageText}>Nenhuma imagem disponível</Text>
            )}

            <Text style={styles.subtitle}>Descrição</Text>
            <Text style={styles.description}>{data.description}</Text>

            {data.location && (
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Localização:</Text>
                    <Text style={styles.infoText}>{data.location}</Text>
                </View>
            )}

            <View style={styles.infoContainer}>
                <Text style={styles.label}>Data de Criação:</Text>
                <Text style={styles.infoText}>{data.date_created}</Text>
            </View>

            {data.photographer && (
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Fotógrafo:</Text>
                    <Text style={styles.infoText}>{data.photographer}</Text>
                </View>
            )}

            {item.links?.[0]?.href && (
                <TouchableOpacity
                    style={styles.linkButton}
                    onPress={() => {
                        if (item.links) {
                            openLink(item?.links[0]?.href);
                        }
                    }}
                >
                        <Text style={styles.linkText}>Ver imagem</Text>
                </TouchableOpacity>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 8,
        marginBottom: 16,
        resizeMode: 'cover',
    },
    noImageText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#888',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 22,
        fontWeight: '600',
        marginTop: 16,
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        marginBottom: 16,
        lineHeight: 24,
    },
    infoContainer: {
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
    },
    infoText: {
        fontSize: 16,
        marginTop: 4,
        color: '#555',
    },
    linkButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 20,
    },
    linkText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
});
