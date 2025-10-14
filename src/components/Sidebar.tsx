import { Link } from "react-router-dom";
import { useState } from "react";

import spotifyLogo from "../assets/spotify-logo.svg";
import homeIcon from "../assets/home-icon.svg";
import discIcon from "../assets/disc-icon.svg";
import playIcon from "../assets/play-icon.svg";
import userIcon from "../assets/user-icon.svg";

import "./Sidebar.css";
import InstallPWAButton from "./InstallPWAButton";

export default function Sidebar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <div className="mobile-header">
                <button className="hamburger-btn" onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <img src={spotifyLogo} className="mobile-logo" alt="Spotify logo" />
            </div>

            {isMenuOpen && <div className="sidebar-overlay" onClick={closeMenu}></div>}

            <nav className={`sidebar ${isMenuOpen ? 'sidebar-open' : ''}`}>
                <div className="nav-logo">
                    <img src={spotifyLogo} className="logo" alt="Spotify logo" width={164} height={49.06} />
                </div>

                <div className="nav-main">
                    <Link to="/home" onClick={closeMenu}>
                        <div className="nav-option">
                            <img src={homeIcon} alt="Início" />
                            <p>Home</p>
                        </div>
                    </Link>

                    <Link to="/artists" onClick={closeMenu}>
                        <div className="nav-option">
                            <img src={discIcon} alt="Artistas" />
                            <p>Artistas</p>
                        </div>
                    </Link>

                    <Link to="/playlists" onClick={closeMenu}>
                        <div className="nav-option">
                            <img src={playIcon} alt="Playlists" />
                            <p>Playlists</p>
                        </div>
                    </Link>

                    <Link to="/profile" onClick={closeMenu}>
                        <div className="nav-option">
                            <img src={userIcon} alt="Perfil" />
                            <p>Perfil</p>
                        </div>
                    </Link>
                </div>

                <div className="nav-bottom">
                    <div className="nav-option">
                        <InstallPWAButton />
                    </div>
                </div>
            </nav>
        </>
    );
}