import "./App.css";
import { BrowserRouter, Routes } from "react-router";
import { Route } from "react-router";
import MainPage from "./pages/Main.page";
import WaitingRoom from "./pages/WaitingRoom.page";
import GamePage from "./pages/Game.page";
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/waiting-room" element={<WaitingRoom />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/result" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
