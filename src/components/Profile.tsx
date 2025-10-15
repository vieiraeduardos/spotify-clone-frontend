import { useEffect, useState } from "react";
import "./Profile.css";

import SpotifyService from "../services/SpotifyService";
const spotifyService = new SpotifyService();

import type { User } from "../types/types";

export default function Profile() {
    const [userProfile, setUserProfile] = useState<User>({} as User);

    useEffect(() => {
        const token = localStorage.getItem("token") || "";

        spotifyService.fetchProfileInfos(token)
            .then(profileInfo => {
                setUserProfile(profileInfo);
            })
            .catch(error => {
                console.error("Erro ao buscar informações do perfil:", error);
            });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userProfile");
        localStorage.removeItem("artist");
        localStorage.removeItem("albums");
        localStorage.removeItem("topArtists");
        localStorage.removeItem("playlists");

        window.location.href = "/";
    }

    return (
        <>
            {userProfile && Object.keys(userProfile).length > 0 ? (
                <div className="profile-page-container">
                    <img className="rounded" src={userProfile.images[0].url} alt="Foto do Usuário" />
                    <h2>{userProfile.display_name}</h2>

                    <button
                        onClick={handleLogout}
                    >
                        Sair
                    </button>
                </div>
            ) : (
                <p>Carregando...</p>
            )}
        </>
    );
}