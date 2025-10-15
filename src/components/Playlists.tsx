import { useEffect, useState } from "react";
import missingPhoto from "../assets/missing-photo.svg";
import "./Playlists.css";

import Pagination from "./Pagination";

import SpotifyService from "../services/SpotifyService";
const spotifyService = new SpotifyService();

import type { Playlists, Playlist } from "../types/types";

export default function Playlists() {
    const [playlists, setPlaylists] = useState<Playlists>({} as Playlists);
    const [showModal, setShowModal] = useState(false);
    const [playlistName, setPlaylistName] = useState("");

    const loadPlaylists = (offset: number = 0) => {
        const token = localStorage.getItem("token") || "";

        spotifyService.fetchPlaylists(token, 5, offset)
            .then(playlistsInfo => {
                setPlaylists(playlistsInfo);
            })
            .catch(error => {
                console.error("Erro ao buscar informações das playlists:", error);
            });
    };

    const handlePageChange = (newOffset: number) => {
        loadPlaylists(newOffset);
    };

    const renderPlaylistItem = (playlist: Playlist, index: number) => (
        <div key={index} className="playlist-card">
            <img src={playlist?.images?.length > 0 ? playlist.images[0]?.url : missingPhoto} alt={playlist.name} className="playlist-image" />
            <div className="playlist-info">
                <h3>{playlist.name}</h3>
                <p>{playlist.description}</p>
            </div>
        </div>
    );

    useEffect(() => {
        loadPlaylists(0);
    }, []);

    const handleCreatePlaylist = () => {
        setShowModal(true);
    }

    const handleModalClose = () => {
        setShowModal(false);
        setPlaylistName("");
    }

    const handleCreateNewPlaylist = async () => {
        if (playlistName.trim()) {
            try {
                const token = localStorage.getItem("token") || "";
                const userProfile = localStorage.getItem("userProfile");
                const userId = userProfile ? JSON.parse(userProfile).id : "";

                spotifyService.createPlaylist(token, userId, playlistName, "")
                    .then(() => {
                        spotifyService.fetchPlaylists(token)
                            .then(playlistsInfo => {
                                setPlaylists(playlistsInfo);
                            })
                            .catch(error => {
                                console.error("Erro ao buscar informações das playlists:", error);
                            });
                    })
                    .catch(error => {
                        console.error("Erro ao criar playlist:", error);
                    });

                handleModalClose();
            } catch (error) {
                console.error("Erro ao criar playlist:", error);
            }
        }
    }

    return (
        <>
            <div className="playlists-page-header">
                <div className="left-content">
                    <h3>Minhas Playlists</h3>
                    <p>Sua coleção pessoal de playlists</p>
                </div>
                <button onClick={handleCreatePlaylist}>Criar playlist</button>
            </div>

            {playlists && playlists?.items?.length > 0 ? (
                <Pagination
                    items={playlists.items}
                    total={playlists.total}
                    limit={playlists.limit}
                    offset={playlists.offset}
                    onPageChange={handlePageChange}
                    renderItem={renderPlaylistItem}
                    className="playlists-page-container"
                />
            ) : (
                <div>Nenhuma playlist encontrada</div>
            )}

            {showModal && (
                <div className="modal-overlay" onClick={handleModalClose}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={handleModalClose}>×</button>
                        <div className="modal-body">
                            <h3>Dê um nome a sua playlist</h3>
                            <input
                                type="text"
                                value={playlistName}
                                onChange={(e) => setPlaylistName(e.target.value)}
                                placeholder="Minha playlist #1"
                                autoFocus
                            />
                            <button onClick={handleCreateNewPlaylist} className="create-button">Criar</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}