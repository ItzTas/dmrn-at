interface Transaction {
    description: string;
    value: number;
    date: Date;
    hour: string;
    category: string;
    type: 'expense' | 'income';
    coin: string;
}

export { Transaction };
