import { describe, it, expect, vi, beforeEach } from "vitest";
import SpotifyService from "../../services/SpotifyService";

Object.defineProperty(import.meta, "env", {
    value: {
        VITE_SPOTIFY_CLIENT_ID: "SPOTIFY_CLIENT_ID",
        VITE_REDIRECT_URI: "http://localhost:8080/callback"
    },
    configurable: true
});

describe("SpotifyService", () => {
    let spotifyService: SpotifyService;

    beforeEach(() => {
        vi.clearAllMocks();
        spotifyService = new SpotifyService();
    });

    describe("getAccessToken", () => {
        it("Deveria obter o token de acesso com sucesso", async () => {
            Object.defineProperty(global, "localStorage", {
                value: {
                    getItem: vi.fn().mockReturnValue("VERIFIER")
                },
                writable: true
            });

            global.fetch = vi.fn().mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({ access_token: "ACCESS_TOKEN" })
            });

            const token = await spotifyService.getAccessToken("CODE");

            expect(token).toBe("ACCESS_TOKEN");
            expect(fetch).toHaveBeenCalledWith(
                "https://accounts.spotify.com/api/token",
                expect.objectContaining({
                    method: "POST"
                })
            );
        });

        it("Deveria lançar exceção quando a leitura falha", async () => {
            Object.defineProperty(global, "localStorage", {
                value: {
                    getItem: vi.fn().mockReturnValue("VERIFIER")
                },
                writable: true
            });

            global.fetch = vi.fn().mockResolvedValue({
                ok: false,
                statusText: "Unauthorized"
            });

            await expect(spotifyService.getAccessToken("CODE"))
                .rejects.toThrow("Failed to get access token: Unauthorized");
        });
    });

    describe("fetchProfileInfos", () => {
        it("Deveria obter as informações do usuário com sucesso", async () => {
            const mockProfile = { id: "1", display_name: "Eduardo" };

            global.fetch = vi.fn().mockResolvedValue({
                ok: true,
                json: () => Promise.resolve(mockProfile)
            });

            const profile = await spotifyService.fetchProfileInfos("ACCESS_TOKEN");

            expect(profile).toEqual(mockProfile);
            expect(fetch).toHaveBeenCalledWith(
                "https://api.spotify.com/v1/me",
                expect.objectContaining({
                    method: "GET",
                    headers: { Authorization: "Bearer ACCESS_TOKEN" }
                })
            );
        });
    });

    describe("fetchTopArtists", () => {
        it("Deveria obter os top artistas com sucesso", async () => {
            const mockArtists = {
                items: [{ id: "1", name: "Vintage Culture", images: [{ url: "" }] }],
                total: 1,
                limit: 20,
                offset: 0
            };

            global.fetch = vi.fn().mockResolvedValue({
                ok: true,
                json: () => Promise.resolve(mockArtists)
            });

            const artists = await spotifyService.fetchTopArtists("ACCESS_TOKEN");

            expect(artists).toEqual(mockArtists);
            expect(fetch).toHaveBeenCalledWith(
                "https://api.spotify.com/v1/me/top/artists?limit=20&offset=0",
                expect.any(Object)
            );
        });

        it("Deveria obter os top artistas com parâmetros personalizados", async () => {
            const mockArtists = {
                items: [{ id: "1", name: "Vintage Culture", images: [{ url: "" }] }],
                total: 1,
                limit: 10,
                offset: 5
            };

            global.fetch = vi.fn().mockResolvedValue({
                ok: true,
                json: () => Promise.resolve(mockArtists)
            });

            await spotifyService.fetchTopArtists("ACCESS_TOKEN", 10, 5);

            expect(fetch).toHaveBeenCalledWith(
                "https://api.spotify.com/v1/me/top/artists?limit=10&offset=5",
                expect.any(Object)
            );
        });
    });

    describe("fetchPlaylists", () => {
        it("Deveria obter as playlists com sucesso", async () => {
            const mockPlaylists = {
                items: [{ id: "MC Pipokinha", name: "Música Popular Brasileira", images: [{ url: "" }] }],
                total: 1,
                limit: 20,
                offset: 0
            };

            global.fetch = vi.fn().mockResolvedValue({
                ok: true,
                json: () => Promise.resolve(mockPlaylists)
            });

            const playlists = await spotifyService.fetchPlaylists("ACCESS_TOKEN");

            expect(playlists).toEqual(mockPlaylists);
            expect(fetch).toHaveBeenCalledWith(
                "https://api.spotify.com/v1/me/playlists?limit=20&offset=0",
                expect.any(Object)
            );
        });
    });

    describe("fetchAlbumsByArtist", () => {
        it("Deveria obter os álbuns do artista com sucesso", async () => {
            const mockAlbums = {
                items: [{ id: "1", name: "Nothing but the beat" }],
                total: 1,
                limit: 20,
                offset: 0
            };

            global.fetch = vi.fn().mockResolvedValue({
                ok: true,
                json: () => Promise.resolve(mockAlbums)
            });

            const albums = await spotifyService.fetchAlbumsByArtist("ACCESS_TOKEN", "1");

            expect(albums).toEqual(mockAlbums);
            expect(fetch).toHaveBeenCalledWith(
                "https://api.spotify.com/v1/artists/1/albums?limit=20&offset=0",
                expect.any(Object)
            );
        });
    });

    describe("fetchArtistById", () => {
        it("Deveria obter o artista pelo ID com sucesso", async () => {
            const mockArtist = { id: "1", name: "Vintage Culture" };

            global.fetch = vi.fn().mockResolvedValue({
                ok: true,
                json: () => Promise.resolve(mockArtist)
            });

            const artist = await spotifyService.fetchArtistById("ACCESS_TOKEN", "artist123");

            expect(artist).toEqual(mockArtist);
            expect(fetch).toHaveBeenCalledWith(
                "https://api.spotify.com/v1/artists/1",
                expect.any(Object)
            );
        });
    });
});