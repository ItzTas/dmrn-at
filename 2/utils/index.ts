import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Item } from '../types/nasa.astro';
import { RootStackParams } from '../types/stack';

function extractImagePreviewFromItem(item: Item): string[] {
    if (!item.links || item?.links?.length === 0) {
        return [];
    }

    const linksWithImages = item.links.filter(
        (link) => link.rel === 'preview' && link.render === 'image',
    );

    return linksWithImages.map((link) => link.href);
}

export default function useStackNavigation(): NavigationProp<RootStackParams> {
    const result = useNavigation < NavigationProp < RootStackParams >> ();
    return result;
}

export { extractImagePreviewFromItem, useStackNavigation };
