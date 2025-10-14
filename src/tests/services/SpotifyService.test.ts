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
});