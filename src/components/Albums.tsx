import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import arrowLeftIcon from "../assets/arrow-left-icon.svg";

import "./Albums.css";

import Pagination from "./Pagination";

import SpotifyService from "../services/SpotifyService";
const spotifyService = new SpotifyService();

import type { Albums, Album, Artist } from "../types/types";

export default function Albums() {
    const [albums, setAlbums] = useState<Albums>({ items: [], total: 0, limit: 0, offset: 0 });
    const [artist, setArtist] = useState<Artist>({ id: "", name: "", images: [] });

    const loadAlbums = (offset: number = 0) => {
        const token = localStorage.getItem("token") || "";
        const artistId = window.location.pathname.split("/")[2];

        spotifyService.fetchAlbumsByArtist(token, artistId, 5, offset)
            .then(albumsInfo => {
                setAlbums(albumsInfo);
                if (offset === 0) {
                    localStorage.setItem("albums", JSON.stringify(albumsInfo));
                }
            })
            .catch(error => {
                console.error("Erro ao buscar informações dos álbuns:", error);
            });
    };

    const handlePageChange = (newOffset: number) => {
        loadAlbums(newOffset);
    };

    const renderAlbumItem = (album: Album, index: number) => (
        <div key={index} className="album-card">
            <img src={album.images[0]?.url} alt={album.name} />
            <div>
                <h3>{album.name}</h3>
                <p>{album.release_date}</p>
            </div>
        </div>
    );

    useEffect(() => {
        const albums = localStorage.getItem("albums");
        if (albums) {
            setAlbums(JSON.parse(albums));
        } else {
            loadAlbums(0);
        }
    }, []);

    useEffect(() => {
        const artist = localStorage.getItem("artist");
        if (artist) {
            setArtist(JSON.parse(artist));
        } else {
            const artistId = window.location.pathname.split("/")[2];
            const token = localStorage.getItem("token") || "";
            spotifyService.fetchArtistById(token, artistId)
                .then(artistInfo => {
                    setArtist(artistInfo);
                    localStorage.setItem("artist", JSON.stringify(artistInfo));
                })
                .catch(error => {
                    console.error("Erro ao buscar informações do artista:", error);
                });
        }
    }, []);

    return (
        <div>
            {
                artist && artist.id && (
                    <div className="albums-page-header">
                        <div className="left-content">
                            <Link to="/artists">
                                <img src={arrowLeftIcon} alt="Voltar" />
                            </Link>
                            <h3>{artist?.name}</h3>
                        </div>
                        <img className="rounded" src={artist?.images[0]?.url} alt="Foto do Artista" />
                    </div>
                )
            }

            {albums && albums.items.length > 0 ? (
                <Pagination
                    items={albums.items}
                    total={albums.total}
                    limit={albums.limit}
                    offset={albums.offset}
                    onPageChange={handlePageChange}
                    renderItem={renderAlbumItem}
                    className="albums-page-container"
                />
            ) : (
                <div>Nenhum álbum encontrado</div>
            )}
        </div>
    );
}   