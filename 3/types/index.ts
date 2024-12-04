import { ParamListBase } from '@react-navigation/native';
import { StyleProp, ViewStyle } from 'react-native';

interface RootStackParamList extends ParamListBase {
    Home: undefined;
    Autentication: undefined;
}

interface Orientation {
    portrait?: StyleProp<ViewStyle>;
    landscape?: StyleProp<ViewStyle>;
}

export { RootStackParamList, Orientation };
