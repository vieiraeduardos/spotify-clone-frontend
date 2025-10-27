import { useEffect } from "react";

export default function Callback() {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (token) {
            localStorage.setItem("token", token);
            window.location.href = "/home";
        }
    }, []);

    return (
        <></>
    );
}