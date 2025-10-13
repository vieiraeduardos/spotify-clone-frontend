import { useEffect, useState } from "react";
import missingPhoto from "../assets/missing-photo.svg";
import "./Playlists.css";

import SpotifyService from "../services/SpotifyService";
const spotifyService = new SpotifyService();

export default function Playlists() {
    const [playlists, setPlaylists] = useState<any>({});

    useEffect(() => {
        const playlists = localStorage.getItem("playlists");
        
        if (playlists) {
            setPlaylists(JSON.parse(playlists));
        } else {
            const token = localStorage.getItem("token") || "";
            spotifyService.fetchPlaylists(token)
                .then(playlistsInfo => {
                    setPlaylists(playlistsInfo);
                    localStorage.setItem("playlists", JSON.stringify(playlistsInfo));
                })
                .catch(error => {
                    console.error("Erro ao buscar informações das playlists:", error);
                });
        }
    }, []);

    return (
        <>
            <div className="playlists-page-header">
                <div className="left-content">
                    <h3>Minhas Playlists</h3>
                    <p>Sua coleção pessoal de playlists</p>
                </div>
                <button>Criar playlist</button>
            </div>

            <div className="playlists-page-container">
                {playlists && playlists?.items?.length > 0 ? playlists.items.map((playlist: any, index: number) => (
                    <div key={index} className="playlist-card">
                        <img src={playlist?.images?.length > 0 ? playlist.images[0]?.url : missingPhoto} alt={playlist.name} className="playlist-image" />
                        <div className="playlist-info">
                            <h3>{playlist.name}</h3>
                            <p>{playlist.description}</p>
                        </div>
                    </div>
                )) : <div>Nenhuma playlist encontrada</div>}
            </div>
        </>
    );
}