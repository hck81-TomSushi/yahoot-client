import "./App.css";
import { BrowserRouter, Routes } from "react-router";
import { Route } from "react-router";
import MainPage from "./pages/Main.page";
import WaitingRoom from "./pages/WaitingRoom.page";
import GamePage from "./pages/Game.page";
import Leaderboard from "./pages/Leaderboard";
import AuthenLayout from "./layouts/AuthenLayout";
import LandingPage from "./pages/Landing.page";
import LoginLayout from "./layouts/LoginLayout";
import { UsernameProvider, useUsername } from "./contexts/username.context";
import { useEffect } from "react";
import { socket } from "../helpers/socket";

function App() {
  const { username, setUsername } = useUsername();
  
  useEffect(() => {
    if (username) {
      socket.connect();
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <BrowserRouter>
      <UsernameProvider>
        <Routes>
          <Route path="/login" element={<LoginLayout />}>
            <Route index element={<MainPage />} />
          </Route>
          <Route path="/" element={<AuthenLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="/waiting-room" element={<WaitingRoom />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/result" element={<Leaderboard />} />
          </Route>
        </Routes>
      </UsernameProvider>
    </BrowserRouter>
  );
}

export default App;
