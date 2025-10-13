import { useEffect, useState } from "react";
import missingPhoto from "../assets/missing-photo.svg";
import "./Playlists.css";

import SpotifyService from "../services/SpotifyService";
const spotifyService = new SpotifyService();

export default function Playlists() {
    const [playlists, setPlaylists] = useState<any>({});
    const [showModal, setShowModal] = useState(false);
    const [playlistName, setPlaylistName] = useState("");

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
                                localStorage.setItem("playlists", JSON.stringify(playlistsInfo));
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