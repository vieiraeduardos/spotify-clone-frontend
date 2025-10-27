import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Callback() {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (token) {
            localStorage.setItem("token", token);
            navigate("/home", { replace: true });
        } else {
            window.location.href = `${import.meta.env.VITE_SPOTIFY_GATEWAY_BACKEND}/api/login`;
        }
    }, [navigate]);

    return (
        <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            height: "100vh",
            flexDirection: "column"
        }}>
            <div>🎵 Processando autenticação...</div>
            <div style={{ marginTop: "10px", fontSize: "14px", color: "#949EA2" }}>
                Aguarde um momento
            </div>
        </div>
    );
}