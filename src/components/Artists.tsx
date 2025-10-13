import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Artists.css";

import SpotifyService from "../services/SpotifyService";
const spotifyService = new SpotifyService();

export default function Artists() {
    const [artists, setArtists] = useState<any>([]);

    useEffect(() => {
        const topArtists = localStorage.getItem("topArtists");
        if (topArtists) {
            setArtists(JSON.parse(topArtists));
        } else {
            const token = localStorage.getItem("token") || "";

            spotifyService.fetchTopArtists(token)
                .then(artistsInfo => {
                    setArtists(artistsInfo);
                })
                .catch(error => {
                    console.error("Erro ao buscar informações do top artistas:", error);
                });
        }
    }, []);

    return (
        <>
            <div className="artists-page-header">
                <h1>Top Artistas</h1>
                <p>Aqui você encontra seus artistas preferidos.</p>
            </div>

            <div className="artists-page-container">
                {artists?.items.map((artist: any) => (
                    <Link to={`/artists/${artist.id}`} key={artist.id}>
                        <div className="artist-card">
                            <img src={artist.images[0]?.url} alt={artist.name} />
                            <h3>{artist.name}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}