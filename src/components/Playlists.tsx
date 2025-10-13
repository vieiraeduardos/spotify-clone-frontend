import { useState } from "react";

import "./Playlists.css";

export default function Playlists() {
    const [playlists] = useState<any>([
        {
            id: "1",
            name: "Minha Playlist Rock",
            description: "As melhores músicas de rock para relaxar",
            images: [{ url: "https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a" }]
        },
        {
            id: "2",
            name: "Playlist Chill",
            description: "Músicas calmas para trabalhar",
            images: [{ url: "https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a" }]
        },
        {
            id: "3",
            name: "Favoritas 2024",
            description: "Minhas músicas favoritas do ano",
            images: [{ url: "https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a" }]
        }
    ]);

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
                {playlists && playlists.length > 0 ? playlists.map((playlist: any, index: number) => (
                    <div key={index} className="playlist-card">
                        <img src={playlist.images[0]?.url} alt={playlist.name} className="playlist-image" />
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