import { Link } from "react-router-dom";

import spotifyLogo from "../assets/spotify-logo.svg";
import homeIcon from "../assets/home-icon.svg";
import discIcon from "../assets/disc-icon.svg";
import playIcon from "../assets/play-icon.svg";
import userIcon from "../assets/user-icon.svg";
import installIcon from "../assets/install-icon.svg";

import "./Sidebar.css";

export default function Sidebar() {
    return (
        <nav className="sidebar">

            <div className="nav-logo">
                <img src={spotifyLogo} className="logo" alt="Spotify logo" width={164} height={49.06} />
            </div>

            <Link to="/home">
                <div className="nav-option">
                    <img src={homeIcon} alt="Início" />
                    <p>Home</p>
                </div>
            </Link>

            <Link to="/artistas">
                <div className="nav-option">
                    <img src={discIcon} alt="Artistas" />
                    <p>Artistas</p>
                </div>
            </Link>

            <Link to="/playlists">
                <div className="nav-option">
                    <img src={playIcon} alt="Playlists" />
                    <p>Playlists</p>
                </div>
            </Link>

            <Link to="/profile">
                <div className="nav-option">
                    <img src={userIcon} alt="Perfil" />
                    <p>Perfil</p>
                </div>
            </Link>

            <div className="nav-option">
                <img src={installIcon} alt="Instalar PWA" />
                <p>Instalar PWA</p>
            </div>
        </nav>
    );
}