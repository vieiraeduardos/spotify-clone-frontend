export interface Album {
    id: string;
    name: string;
    release_date: string;
    images: { url: string }[];
}

export interface Albums {
    items: Album[];
    total: number;
    limit: number;
    offset: number;
}

export interface Artist {
    id: string;
    name: string;
    images: { url: string }[];
}

export interface Artists {
    items: Artist[];
    total: number;
    limit: number;
    offset: number;
}