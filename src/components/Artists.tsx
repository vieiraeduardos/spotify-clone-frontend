import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Artists.css";
import Pagination from "./Pagination";

import SpotifyService from "../services/SpotifyService";
const spotifyService = new SpotifyService();

export default function Artists() {
    const [artists, setArtists] = useState<any>({});

    const loadArtists = (offset: number = 0) => {
        const token = localStorage.getItem("token") || "";

        spotifyService.fetchTopArtists(token, 5, offset)
            .then(artistsInfo => {
                setArtists(artistsInfo);

                if (offset === 0) {
                    localStorage.setItem("topArtists", JSON.stringify(artistsInfo));
                }
            })
            .catch(error => {
                console.error("Erro ao buscar informações do top artistas:", error);
            });
    };

    const handlePageChange = (newOffset: number) => {
        loadArtists(newOffset);
    };

    const renderArtistItem = (artist: any, index: number) => (
        <Link to={`/artists/${artist.id}`} key={index}>
            <div className="artist-card">
                <img src={artist.images[0]?.url} alt={artist.name} />
                <h3>{artist.name}</h3>
            </div>
        </Link>
    );

    useEffect(() => {
        const topArtists = localStorage.getItem("topArtists");
        if (topArtists) {
            setArtists(JSON.parse(topArtists));
        } else {
            loadArtists(0);
        }
    }, []);

    return (
        <>
            <div className="artists-page-header">
                <h1>Top Artistas</h1>
                <p>Aqui você encontra seus artistas preferidos.</p>
            </div>

            {artists && artists?.items?.length > 0 ? (
                <Pagination
                    items={artists.items}
                    total={artists.total || artists.items.length}
                    limit={artists.limit || 20}
                    offset={artists.offset || 0}
                    onPageChange={handlePageChange}
                    renderItem={renderArtistItem}
                    className="artists-page-container"
                />
            ) : (
                <p>Nenhum artista encontrado</p>
            )}
        </>
    );
}