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

export { Transaction, Orientation };
