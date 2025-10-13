import { useEffect, useState } from "react";
import "./Profile.css";

import SpotifyService from "../services/SpotifyService";
const spotifyService = new SpotifyService();

export default function Profile() {
    const [userProfile, setUserProfile] = useState<any>(null);
    useEffect(() => {
        const userProfile = localStorage.getItem("userProfile");
        if (userProfile) {
            setUserProfile(JSON.parse(userProfile));
        } else {
            const token = localStorage.getItem("token") || "";

            spotifyService.fetchProfileInfos(token)
                .then(profileInfo => {
                    setUserProfile(profileInfo);
                })
                .catch(error => {
                    console.error("Erro ao buscar informações do perfil:", error);
                });
        }
    }, []);

    return (
        <>
            {userProfile ? (
                <div className="profile-page-container">
                    <img className="rounded" src={userProfile.images[0].url} alt="Foto do Usuário" />
                    <h2>{userProfile.display_name}</h2>

                    <button>Sair</button>
                </div>
            ) : (
                <p>Carregando...</p>
            )}
        </>
    );
}