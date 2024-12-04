export interface RootNasaAstro {
    collection: NasaAstroCollection;
}

export interface NasaAstroCollection {
    version: string;
    href: string;
    items: Item[];
    metadata: Metadata;
    links: Link2[];
}

export interface Item {
    href: string;
    data: Daum[];
    links?: Link[];
}

export interface Daum {
    center: string;
    title: string;
    keywords?: string[];
    nasa_id: string;
    date_created: string;
    media_type: string;
    description: string;
    album?: string[];
    location?: string | null;
    description_508?: string | null;
    secondary_creator?: string | null;
    photographer?: string | null;
}

export interface Link {
    href: string;
    rel: string;
    render?: string | null;
}

export interface Metadata {
    total_hits: number;
}

export interface Link2 {
    rel: string;
    prompt: string;
    href: string;
}
