import { useEffect } from "react";
import SpotifyService from "../services/SpotifyService";

const spotifyService = new SpotifyService();

export default function Callback() {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (code) {
            spotifyService.getAccessToken(code)
                .then(accessToken => {
                    if (accessToken) {
                        localStorage.setItem("token", accessToken);
                        window.location.href = "/home";
                    }
                })
                .catch(error => {
                    console.error("Erro ao obter access token:", error);
                });
        }
    }, []);

    return (
        <div>
            <p>Processando autenticação...</p>
        </div>
    );
}