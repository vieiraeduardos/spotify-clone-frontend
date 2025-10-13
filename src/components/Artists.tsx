import { useState } from "react";
import { Link } from "react-router-dom";

import "./Artists.css";

export default function Artists() {
    const [artists] = useState<any>({
        items: [
            {
                id: "1",
                name: "Artista 1",
                images: [{ url: "https://i.scdn.co/image/ab6761610000e5ebb19cf97aea0a0c0ff1543172" }]
            },
            {
                id: "2",
                name: "Artista 2",
                images: [{ url: "https://i.scdn.co/image/ab6761610000e5ebb19cf97aea0a0c0ff1543172" }]
            }
        ]
    });


    return (
        <>
            <div className="artists-page-header">
                <h1>Top Artistas</h1>
                <p>Aqui você encontra seus artistas preferidos.</p>
            </div>

            <div className="artists-page-container">
                {artists?.items.map((artist: any) => (
                    <Link to={`/artists/${artist.id}`} key={artist.id}>
                        <div className="artist-card">
                            <img src={artist.images[0]?.url} alt={artist.name} />
                            <h3>{artist.name}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}