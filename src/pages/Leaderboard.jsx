import { useEffect, useRef } from "react";
import SFX from "../assets/leaderboard.mp3";
import BGM from "../assets/main_bgm.mp3";
import { useLocation } from "react-router";

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

      <a href="/" className="btn btn-success border-b-4 absolute top-4 left-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      </a>

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
