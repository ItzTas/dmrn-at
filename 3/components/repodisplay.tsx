import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Linking,
    Alert,
} from 'react-native';
import { APIRepo } from '../types/api.repo';

interface Props {
    repo: APIRepo;
}

export default function RepoDisplay({ repo }: Props): React.JSX.Element {
    async function openRepo(url: string) {
        try {
            await Linking.openURL(url);
        } catch (err: any) {
            Alert.alert('Error', 'Failed to open URL:' + err.message);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: repo.owner.avatar_url }} style={styles.avatar} />
                <View style={styles.info}>
                    <Text style={styles.repoName}>{repo.full_name}</Text>
                    <Text style={styles.ownerName}>Owner: {repo.owner.login}</Text>
                </View>
            </View>
            <Text style={styles.description}>
                {repo.description ? repo.description : 'No description available.'}
            </Text>
            <View style={styles.footer}>
                <Text style={styles.language}>Language: {repo.language || 'N/A'}</Text>
                <TouchableOpacity onPress={() => openRepo(repo.html_url)}>
                    <Text style={styles.link}>View on GitHub</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 8,
    },
    info: {
        flexDirection: 'column',
    },
    repoName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    ownerName: {
        fontSize: 14,
        color: '#555',
    },
    description: {
        fontSize: 14,
        color: '#333',
        marginBottom: 8,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    language: {
        fontSize: 14,
        color: '#555',
    },
    link: {
        fontSize: 14,
        color: '#007bff',
        textDecorationLine: 'underline',
    },
});
