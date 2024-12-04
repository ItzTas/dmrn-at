import { StyleProp, ViewStyle } from 'react-native';

interface Transaction {
    description: string;
    value: number;
    date: Date;
    hour: string;
    category: string;
    type: 'expense' | 'income';
    coin: string;
}

interface Orientation {
    portrait?: StyleProp<ViewStyle>;
    landscape?: StyleProp<ViewStyle>;
}

interface BCBCoinOverview {
    simbolo: string;
    tipoMoeda: string;
    nomeFormatado: string;
}

interface BCBCoinDetails { }

interface RootStackParamList {
    Home: undefined;
    Autentication: undefined;
    AddTransaction: undefined;
    Transactions: undefined;
}

export {
    Transaction,
    Orientation,
    BCBCoinOverview,
    BCBCoinDetails,
    RootStackParamList,
};
