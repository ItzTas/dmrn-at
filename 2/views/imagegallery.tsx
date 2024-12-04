import React, { useEffect, useState } from 'react';
import {
    FlatList,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import SearchBar from '../components/searchbar';
import { Item } from '../types/nasa.astro';
import { getNasaAstroData } from '../api';
import { ProgressBar } from 'react-native-paper';
import ItemDisplay from '../components/astroitem';

const astros = ['earth', 'moon', 'sun', 'mars', 'jupiter'];

export default function ImageGallery(): React.JSX.Element {
    const initialItems: Item[] = [];
    const [items, setItems] = useState < Item[] > (initialItems);
    const [selectedAstro, setSelectedAstro] = useState < string > (astros[0]);
    const [page, setPage] = useState < number > (1);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [totalItems, setTotalItems] = useState < number > (0);

    useEffect(() => {
        loadItems(selectedAstro, page);
    }, [selectedAstro, page]);

    async function loadItems(astro: string, page: number) {
        setLoading(true);
        const res = await getNasaAstroData({ astro: astro, page: page });
        setLoading(false);
        setItems(res.items);
        setTotalItems(res.items.length);
    }

    function handleSearch(astro: string) {
        setSelectedAstro(astro);
        setItems([]);
        setPage(1);
        loadItems(astro, 1);
    }

    function nextPage() {
        setPage((prevPage) => prevPage + 1);
    }

    function prevPage() {
        setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
    }

    async function onRefresh() {
        setRefreshing(true);
        setPage(1);
        setItems([]);
        const res = await getNasaAstroData({ astro: selectedAstro, page: 1 });
        setItems(res.items);
        setTotalItems(res.items.length);
        setRefreshing(false);
    }

    const progress = totalItems ? items.length / totalItems : 0;

    return (
        <View style={{ flex: 1, width: '100%' }}>
            <SearchBar onSearch={handleSearch} astros={astros} />

            <View style={styles.paginationContainer}>
                {page > 1 && (
                    <TouchableOpacity style={styles.pageButton} onPress={prevPage}>
                        <Text style={styles.pageButtonText}>Anterior</Text>
                    </TouchableOpacity>
                )}

                <Text style={styles.pageNumber}>Página {page}</Text>

                <TouchableOpacity style={styles.pageButton} onPress={nextPage}>
                    <Text style={styles.pageButtonText}>Próxima</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.progressContainer}>
                {loading ? (
                    <ActivityIndicator size='large' color='#007BFF' />
                ) : (
                    <ProgressBar
                        progress={progress}
                        color='#007BFF'
                        style={styles.progressBar}
                    />
                )}
            </View>

            <FlatList
                data={items}
                renderItem={({ item }) => <ItemDisplay item={item} />}
                keyExtractor={(item: Item, index) => `${item.href}${index.toString()}`}
                ListFooterComponent={<View style={{ padding: 20 }} />}
                initialNumToRender={10}
                maxToRenderPerBatch={20}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    progressContainer: {
        marginVertical: 10,
        paddingHorizontal: 16,
    },
    progressBar: {
        height: 10,
        borderRadius: 5,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 16,
    },
    pageButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginHorizontal: 8,
        borderRadius: 4,
    },
    pageButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    pageNumber: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
