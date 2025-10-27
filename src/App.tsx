import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./components/Home";
import Artists from "./components/Artists";
import Playlists from "./components/Playlists";
import Albums from "./components/Albums";
import Profile from "./components/Profile";
import Sidebar from "./components/Sidebar";
import Callback from "./components/Callback";
import { useEffect } from "react";

function AppContent() {
  const location = useLocation();
  const isCallbackRoute = location.pathname === "/callback";

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token && !isCallbackRoute) {
      window.location.href = "https://spotify-gateway.onrender.com/api/login";
    }
  }, [location.pathname, isCallbackRoute]);

  if (isCallbackRoute) {
    return (
      <Routes>
        <Route path="/callback" element={<Callback />} />
      </Routes>
    );
  }

  return (
    <>
      <div className="container">
        <Sidebar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/artists/:id" element={<Albums />} />
          </Routes>
        </main>
      </div>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App;
