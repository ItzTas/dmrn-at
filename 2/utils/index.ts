import { Item } from '../types/nasa.astro';

function extractImagePreviewFromItem(item: Item): string[] {
    if (!item.links || item?.links?.length === 0) {
        return [];
    }

    const linksWithImages = item.links.filter(
        (link) => link.rel === 'preview' && link.render === 'image',
    );

    return linksWithImages.map((link) => link.href);
}

export { extractImagePreviewFromItem };
