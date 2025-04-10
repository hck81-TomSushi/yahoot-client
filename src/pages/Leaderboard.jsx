import { useEffect, useRef } from "react";
import SFX from "../assets/leaderboard.mp3";
import BGM from "../assets/main_bgm.mp3";
import HomeButton from "../components/HomeButton";

export default function Leaderboard() {
  const audioRef = useRef(null);

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
              <tr>
                <th>1</th>
                <td>sonangga</td>
                <td>1000</td>
              </tr>
              <tr>
                <th>2</th>
                <td>marhanura</td>
                <td>900</td>
              </tr>
              <tr>
                <th>3</th>
                <td>YanbiPanjaitan</td>
                <td>800</td>
              </tr>
              <tr>
                <th>4</th>
                <td>hilmidh</td>
                <td>700</td>
              </tr>
              <tr>
                <th>5</th>
                <td>DikiNovtrianda</td>
                <td>600</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
