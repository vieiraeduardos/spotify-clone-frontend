import "./Profile.css";

export default function Profile() {
    return (
        <>
            <div className="profile-page-container">
                <img className="rounded" src="https://i.scdn.co/image/ab6761610000e5ebb19cf97aea0a0c0ff1543172" alt="Foto do Usuário" />
                <h2>Eduardo Vieira</h2>

                <button>Sair</button>
            </div>
        </>
    );
}