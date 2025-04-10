import {useNavigate} from "react-router";
import YahootLogo from "../assets/yahoot_white.png";
import Swal from "sweetalert2";
import { useUsername } from "../contexts/username.context";
import { useState, useRef, useEffect } from "react";
import HomeButton from "../components/HomeButton";
import BGM from "../assets/main_bgm.mp3";

export default function MainPage() {
  const {username, setUsername} = useUsername();
  const [formName, setFormName] = useState("");
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

  const inputUsername = async () => {
    try {
      if (!formName.trim()) {
        throw new Error("Username jangan kosong!");
      }
      if (formName.trim().length < 3) {
        throw new Error("Username terlalu pendek");
      }
      if (!/^[a-zA-Z0-9]+$/.test(formName.trim())) {
        throw new Error("Username hanya boleh mengandung huruf dan angka!");
      }
      setUsername(formName);
      navigate("/");
    } catch (error) {
      console.log("🐄 - inputUsername - error:", error);
      Swal.fire({
        icon: "error",
        title: "Namanya ga bener!",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <section className="chalkboard">
      <audio ref={audioRef} src={BGM} loop autoPlay />
      <HomeButton />
      <div className="flex flex-col items-center justify-evenly h-full">
        <img src={YahootLogo} alt="Yahoot Logo" className="h-15" />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            inputUsername();
          }}
        >
          <label className="input validator my-4">
            <input
              type="text"
              className="text-center text-accent text-xl"
              required
              placeholder="Enter your username"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
            />
          </label>
          <button
            className="btn btn-accent btn-lg text-3lg w-80 h-15"
            type="button"
            onClick={() => inputUsername()}>
            I want this name!
          </button>
        </form>
      </div>
    </section>
  );
}
