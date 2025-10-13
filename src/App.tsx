import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Artists from "./components/Artists";
import Playlists from "./components/Playlists";
import Albums from "./components/Albums";
import Profile from "./components/Profile";
import Sidebar from "./components/Sidebar";

function App() {

  return (
    <>
      <div className="container">

        <BrowserRouter>
          <Sidebar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/playlists" element={<Playlists />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/artists/:id" element={<Albums />} />
            </Routes>
          </main>
        </BrowserRouter>
      </div >
    </>
  )
}

export default App;
