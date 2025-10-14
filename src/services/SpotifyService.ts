export default class SpotifyService {
    private SPOTIFY_CLIENT_ID: string;
    private REDIRECT_URI: string;

    public constructor() {
        this.SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
        this.REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
    }

    public async redirectToAuthCodeFlow() {
        const verifier = this.generateCodeVerifier(128);
        const challenge = await this.generateCodeChallenge(verifier);

        localStorage.setItem("verifier", verifier);

        const params = new URLSearchParams();
        params.append("client_id", this.SPOTIFY_CLIENT_ID);
        params.append("response_type", "code");
        params.append("redirect_uri", this.REDIRECT_URI);
        params.append("scope", "user-read-private user-read-email user-top-read playlist-read-private user-library-read playlist-modify-public playlist-modify-private");
        params.append("code_challenge_method", "S256");
        params.append("code_challenge", challenge);

        document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
    }

    public async getAccessToken(code: string) {
        const verifier = localStorage.getItem("verifier");

        const params = new URLSearchParams();
        params.append("client_id", this.SPOTIFY_CLIENT_ID);
        params.append("grant_type", "authorization_code");
        params.append("code", code);
        params.append("redirect_uri", this.REDIRECT_URI);
        params.append("code_verifier", verifier!);

        const result = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params
        });

        if (!result.ok) {
            throw new Error("Failed to get access token: " + result.statusText);
        }

        const { access_token } = await result.json();
        return access_token;
    }

    private generateCodeVerifier(length: number) {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    private async generateCodeChallenge(codeVerifier: string) {
        const data = new TextEncoder().encode(codeVerifier);
        const digest = await window.crypto.subtle.digest("SHA-256", data);
        return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");
    }

    public async fetchProfileInfos(token: string) {
        const result = await fetch("https://api.spotify.com/v1/me", {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        });

        if (!result.ok) {
            throw new Error("Failed to fetch profile info: " + result.statusText);
        }

        return await result.json();
    }

    public async fetchTopArtists(token: string, limit: number = 20, offset: number = 0) {
        const result = await fetch(`https://api.spotify.com/v1/me/top/artists?limit=${limit}&offset=${offset}`, {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        });

        if (!result.ok) {
            throw new Error("Failed to fetch top artists: " + result.statusText);
        }

        return await result.json();
    }

    public async fetchAlbumsByArtist(token: string, artistId: string) {
        const result = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        });

        if (!result.ok) {
            throw new Error("Failed to fetch albums by artist: " + result.statusText);
        }

        return await result.json();
    }

    public async fetchArtistById(token: string, artistId: string) {
        const result = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        });

        if (!result.ok) {
            throw new Error("Failed to fetch artist by ID: " + result.statusText);
        }

        return await result.json();
    }

    public async fetchPlaylists(token: string, limit: number = 20, offset: number = 0) {
        const result = await fetch(`https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`, {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        });

        if (!result.ok) {
            throw new Error("Failed to fetch playlists: " + result.statusText);
        }

        return await result.json();
    }

    public async createPlaylist(token: string, userId: string, name: string, description: string) {
        const result = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({ name: name, description: description, public: false })
        });

        if (!result.ok) {
            throw new Error("Failed to create playlist: " + result.statusText);
        }

        return await result.json();
    }
}