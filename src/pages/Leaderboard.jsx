import { useEffect, useRef } from "react";
import SFX from "../assets/leaderboard.mp3";
import BGM from "../assets/main_bgm.mp3";
import { useLocation } from "react-router";
import HomeButton from "../components/HomeButton";

export default function Leaderboard() {
  const audioRef = useRef(null);
  const location = useLocation();
  const scoreboard = location.state?.scoreboard || {}; // Retrieve the scoreboard from state

  useEffect(() => {
    function playAudio() {
      const audio = audioRef.current;
      if (audio) {
        audio.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
    }
    playAudio();
  }, []);

  return (
    <section className="chalkboard">
      <audio ref={audioRef} src={SFX} autoPlay />
      <audio ref={audioRef} src={BGM} loop autoPlay />
      <HomeButton />
      <div className="h-full flex flex-col items-center justify-evenly">
        <h1 className="text-3xl">Papan Juara</h1>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table table-zebra text-accent">
            <thead className="text-center">
              <tr>
                <th>Rank</th>
                <th>Nama</th>
                <th>Skor</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(scoreboard).map(([username, score], i) => (
                <tr key={username}>
                  <th>{i + 1}</th>
                  <td>{username}</td>
                  <td>{score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
