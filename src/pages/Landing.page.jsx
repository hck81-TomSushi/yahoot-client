import { useNavigate } from "react-router";
import { yahootServer } from "../../helpers/http-client";
import YahootLogo from "../assets/yahoot_white.png";
import { useEffect, useState, useRef } from "react";
import BGM from "../assets/main_bgm.mp3";

export default function LandingPage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
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

  const checkUsername = async () => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      try {
        const { data } = await yahootServer.get("/username", {
          headers: { Authorization: localStorage.getItem("access_token") },
        });
        setUsername(data.username);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteUsername = () => {
    localStorage.removeItem("access_token");
    setUsername("");
    navigate("/login");
  };

  useEffect(() => {
    checkUsername();
  }, []);

  return (
    <section className="chalkboard">
      <audio ref={audioRef} src={BGM} loop autoPlay />
      <div className="flex flex-col items-center justify-evenly h-full">
        <img src={YahootLogo} alt="Yahoot Logo" className="h-15" />
        <h1 className="text-3xl">Halo, {username}!</h1>
        {username && (
          <>
            <button
              className="btn btn-accent btn-lg text-2lg w-80 h-15"
              type="button"
              onClick={() => deleteUsername()}
            >
              Ganti nama saya!
            </button>
            <button
              className="btn btn-accent btn-xl text-3xl w-100 h-30"
              onClick={() => navigate("/waiting-room")}
            >
              Mulai Bermain!
            </button>
          </>
        )}
      </div>
    </section>
  );
}
