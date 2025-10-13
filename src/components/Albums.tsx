import { useState } from "react";
import { Link } from "react-router-dom";

import arrowLeftIcon from "../assets/arrow-left-icon.svg";

import "./Albums.css";

export default function Albums() {
    const [albums] = useState<any>([
        {
            id: "1",
            name: "Album 1",
            release_date: "2024-01-01",
            images: [{ url: "https://i.scdn.co/image/ab6761610000e5ebb19cf97aea0a0c0ff1543172" }]
        },
        {
            id: "2",
            name: "Album 2",
            release_date: "2023-12-15",
            images: [{ url: "https://i.scdn.co/image/ab6761610000e5ebb19cf97aea0a0c0ff1543172" }]
        }
    ]);

    return (
        <div>
            <div className="albums-page-header">
                <div className="left-content">
                    <Link to="/artistas">
                        <img src={arrowLeftIcon} alt="Voltar" />
                    </Link>
                    <span>Nome do Artista</span>
                </div>
                <img className="rounded" src="https://i.scdn.co/image/ab6761610000e5ebb19cf97aea0a0c0ff1543172" alt="Foto do Artista" />
            </div>

            <div className="albums-page-container">
                {albums && albums.length > 0 ? albums.map((album: any, index: number) => (
                    <div key={index} className="album-card">
                        <img src={album.images[0]?.url} alt={album.name} />
                        <div>
                            <h3>{album.name}</h3>
                            <p>{album.release_date}</p>
                        </div>
                    </div>
                )) : <div>Nenhum álbum encontrado</div>}
            </div>
        </div>
    );
}   