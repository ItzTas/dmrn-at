import React, { useEffect, useState } from 'react';
import {
    Alert,
    View,
    FlatList,
    ActivityIndicator,
    Text,
    Button,
    RefreshControl,
} from 'react-native';
import {
    Modal,
    Portal,
    Provider,
    Button as PaperButton,
    TextInput,
} from 'react-native-paper';
import { APIRepo } from '../types/api.repo';
import { getTotalReposQuantity, getUserRepos } from '../api';
import { getUserToken } from '../utils';
import { ProgressBar } from 'react-native-paper';
const RepoDisplay = React.lazy(() => import('../components/repodisplay'));

export default function ReposScreen(): React.JSX.Element {
    const [repos, setRepos] = useState<APIRepo[]>([]);
    const [totalReposQuantity, setTotalReposQuantity] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [filteredRepos, setFilteredRepos] = useState<APIRepo[]>([]);

    const [sortVisible, setSortVisible] = useState<boolean>(false);
    const [selectedLanguage, setSelectedLanguage] = useState<string>('');
    const [selectedSort, setSelectedSort] = useState<string>('name');

    async function getRepos() {
        try {
            setIsLoading(true);
            const token = await getUserToken();
            const reposData = await getUserRepos(token, page);

            setRepos((prevRepos) => [...prevRepos, ...reposData]);
            setFilteredRepos((prevRepos) => [...prevRepos, ...reposData]);
            setIsLoading(false);
        } catch (err: any) {
            setIsLoading(false);
            Alert.alert('Error fetching repositories: ', err.message);
        }
    }

    async function getTotalReposNum() {
        try {
            const token = await getUserToken();
            const totalReposData = await getTotalReposQuantity(token);
            setTotalReposQuantity(totalReposData);
        } catch (err: any) {
            Alert.alert('Error fetching total repositories: ', err.message);
        }
    }

    useEffect(() => {
        getRepos();
    }, [page]);

    useEffect(() => {
        getTotalReposNum();
    }, []);

    function renderItem({ item }: { item: APIRepo }) {
        return <RepoDisplay repo={item} />;
    }

    function loadMore() {
        if (!isLoading && repos.length < totalReposQuantity) {
            setPage((prevPage) => prevPage + 1);
        }
    }

    async function handleRefresh() {
        setIsRefreshing(true);
        setRepos([]);
        setPage(1);
        await getRepos();
        setIsRefreshing(false);
    }

    function handleFilter() {
        const filtered = repos.filter(
            (repo) =>
                repo.language
                    ?.toLowerCase()
                    .trim()
                    .includes(selectedLanguage.toLowerCase().trim()) || !selectedLanguage,
        );
        setFilteredRepos(filtered);
    }

    function handleSort() {
        const sorted = [...filteredRepos].sort((a, b) => {
            if (selectedSort === 'name') {
                return a.name.localeCompare(b.name);
            }
            if (selectedSort === 'stars') {
                return b.stargazers_count - a.stargazers_count;
            }
            return 0;
        });
        setFilteredRepos(sorted);
    }

    const progress =
        totalReposQuantity > 0
            ? Math.min(Math.max(repos.length / totalReposQuantity, 0), 1)
            : 0;

    const roundedProgress = Math.round(progress * 100) / 100;

    return (
        <Provider>
            <View style={{ flex: 1 }}>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ textAlign: 'center' }}>
                        Carregando {Math.round(roundedProgress * 100)}% dos repositórios
                    </Text>
                    <ProgressBar
                        progress={roundedProgress}
                        color='#0000ff'
                        style={{ marginBottom: 10 }}
                    />
                </View>

                <View style={{ marginVertical: 10, paddingHorizontal: 20 }}>
                    <TextInput
                        label='Filtrar por linguagem'
                        value={selectedLanguage}
                        onChangeText={(text) => {
                            setSelectedLanguage(text);
                            handleFilter();
                        }}
                    />
                </View>

                <View style={{ marginVertical: 10, paddingHorizontal: 20 }}>
                    <Button
                        title='Abrir Ordenação'
                        onPress={() => setSortVisible(true)}
                    />
                </View>

                <Portal>
                    <Modal
                        visible={sortVisible}
                        onDismiss={() => setSortVisible(false)}
                        contentContainerStyle={{
                            backgroundColor: '#333333',
                            padding: 20,
                            borderRadius: 10,
                            elevation: 5,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                marginBottom: 10,
                                color: 'white',
                                fontWeight: 'bold',
                            }}
                        >
                            Ordenação
                        </Text>

                        <PaperButton
                            mode={selectedSort === 'name' ? 'contained' : 'outlined'}
                            onPress={() => setSelectedSort('name')}
                            style={{
                                marginBottom: 10,
                                backgroundColor:
                                    selectedSort === 'name' ? '#6200ea' : '#444444',
                            }}
                        >
                            Nome
                        </PaperButton>

                        <PaperButton
                            mode={selectedSort === 'stars' ? 'contained' : 'outlined'}
                            onPress={() => setSelectedSort('stars')}
                            style={{
                                backgroundColor:
                                    selectedSort === 'stars' ? '#6200ea' : '#444444',
                            }}
                        >
                            Estrelas
                        </PaperButton>

                        <View style={{ marginTop: 20 }}>
                            <Button
                                title='Aplicar'
                                onPress={() => {
                                    handleSort();
                                    setSortVisible(false);
                                }}
                                color='#6200ea'
                            />
                        </View>
                    </Modal>
                </Portal>

                <FlatList
                    data={filteredRepos}
                    renderItem={renderItem}
                    keyExtractor={(item, i) => `${item.id.toString()}-${i}`}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    maxToRenderPerBatch={6}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={
                        isLoading ? (
                            <ActivityIndicator size='large' color='#0000ff' />
                        ) : null
                    }
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={handleRefresh}
                        />
                    }
                />
            </View>
        </Provider>
    );
}
