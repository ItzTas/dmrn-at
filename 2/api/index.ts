import { NasaAstroCollection, RootNasaAstro } from '../types/nasa.astro';

interface GetNasaAstroDataProps {
    astro?: string;
    page?: number;
}

async function getNasaAstroData(
    { astro = 'earth', page = 1 }: GetNasaAstroDataProps = {
        astro: 'earth',
        page: 1,
    },
): Promise<NasaAstroCollection> {
    const res = await fetch(
        `https://images-api.nasa.gov/search?q=${astro}&page=${page}`,
    );
    if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }

    const json: NasaAstroCollection = ((await res.json()) as RootNasaAstro)
        .collection;

    return json;
}

export { getNasaAstroData };
