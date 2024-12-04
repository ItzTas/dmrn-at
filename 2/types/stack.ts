import { ParamListBase } from '@react-navigation/native';
import { Item } from './nasa.astro';

export interface RootStackParams extends ParamListBase {
    Home: undefined;
    Details: { item: Item };
}
