
export default class SpotifyService {
    private SPOTIFY_GATEWAY_BACKEND: string;

    public constructor() {
        this.SPOTIFY_GATEWAY_BACKEND = import.meta.env.VITE_SPOTIFY_GATEWAY_BACKEND;
    }

    public async fetchProfileInfos(token: string) {
        const result = await fetch(`${this.SPOTIFY_GATEWAY_BACKEND}/api/spotify/me`, {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        });

        if (!result.ok) {
            throw new Error("Failed to fetch profile info: " + result.statusText);
        }

        return await result.json();
    }

    public async fetchTopArtists(token: string, limit: number = 20, offset: number = 0) {
        const result = await fetch(`${this.SPOTIFY_GATEWAY_BACKEND}/api/spotify/top-artists?limit=${limit}&offset=${offset}`, {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        });

        if (!result.ok) {
            throw new Error("Failed to fetch top artists: " + result.statusText);
        }

        return await result.json();
    }

    public async fetchAlbumsByArtist(token: string, artistId: string, limit: number = 20, offset: number = 0) {
        const result = await fetch(`${this.SPOTIFY_GATEWAY_BACKEND}/api/spotify/artist/${artistId}/albums?limit=${limit}&offset=${offset}`, {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        });

        if (!result.ok) {
            throw new Error("Failed to fetch albums by artist: " + result.statusText);
        }

        return await result.json();
    }

    public async fetchArtistById(token: string, artistId: string) {
        const result = await fetch(`${this.SPOTIFY_GATEWAY_BACKEND}/api/spotify/artist/${artistId}`, {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        });

        if (!result.ok) {
            throw new Error("Failed to fetch artist by ID: " + result.statusText);
        }

        return await result.json();
    }

    public async fetchPlaylists(token: string, limit: number = 20, offset: number = 0) {
        const result = await fetch(`${this.SPOTIFY_GATEWAY_BACKEND}/api/spotify/playlists?limit=${limit}&offset=${offset}`, {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        });

        if (!result.ok) {
            throw new Error("Failed to fetch playlists: " + result.statusText);
        }

        return await result.json();
    }

    public async createPlaylist(token: string, userId: string, name: string, description: string) {
        const result = await fetch(`${this.SPOTIFY_GATEWAY_BACKEND}/api/spotify/playlist`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({ name: name, description: description, public: false, userId: userId })
        });

        if (!result.ok) {
            throw new Error("Failed to create playlist: " + result.statusText);
        }

        return await result.json();
    }
}