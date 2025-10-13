import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import arrowLeftIcon from "../assets/arrow-left-icon.svg";

import "./Albums.css";

import SpotifyService from "../services/SpotifyService";
const spotifyService = new SpotifyService();

export default function Albums() {
    const [albums, setAlbums] = useState<any>({});
    const [artist, setArtist] = useState<any>({});

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

    useEffect(() => {
        const albums = localStorage.getItem("albums");
        if (albums) {
            setAlbums(JSON.parse(albums));
        } else {
            const token = localStorage.getItem("token") || "";
            const artistId = window.location.pathname.split("/")[2];

            spotifyService.fetchAlbumsByArtist(token, artistId)
                .then(albumsInfo => {
                    setAlbums(albumsInfo);
                    localStorage.setItem("albums", JSON.stringify(albumsInfo));
                })
                .catch(error => {
                    console.error("Erro ao buscar informações dos álbuns:", error);
                });
        }
    }, []);

    return (
        <div>
            {
                artist && Object.keys(artist).length > 0 && (
                    <div className="albums-page-header">
                        <div className="left-content">
                            <Link to="/artists">
                                <img src={arrowLeftIcon} alt="Voltar" />
                            </Link>
                            <span>{artist?.name}</span>
                        </div>
                        <img className="rounded" src={artist?.images[0]?.url} alt="Foto do Artista" />
                    </div>
                )
            }

            <div className="albums-page-container">
                {albums && albums?.items?.length > 0 ?

                    (
                        albums.items.map((album: any, index: number) => (
                            <div key={index} className="album-card">
                                <img src={album.images[0]?.url} alt={album.name} />
                                <div>
                                    <h3>{album.name}</h3>
                                    <p>{album.release_date}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>Nenhum álbum encontrado</div>
                    )
                }
            </div>
        </div>
    );
}   