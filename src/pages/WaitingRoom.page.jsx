import { useEffect, useRef, useState } from "react";
import { useUsername } from "../contexts/username.context";
import { socket } from "../../helpers/socket";
import { useNavigate } from "react-router";
import YahootLogo from "../assets/yahoot_white.png";
import CountdownSound from "../assets/countdown_tick.mp3";
import HomeButton from "../components/HomeButton";

export default function WaitingRoom() {
  const { username, userCode, setUsername } = useUsername();
  const [countdown, setCountdown] = useState(20);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const audioRef = useRef(null);

  useEffect(() => {
    socket.on("user queue", (roomData) => {
      setUsers(roomData);
      console.log("Updated room data:", roomData);
    });

    socket.emit("game queue", { username, userCode });

    socket.on("countdown", (time) => {
      setCountdown(time);
    });

    socket.on("start game", (data) => {
      console.log("Navigating to:", data.path);
      navigate(data.path);
    });

    return () => {
      socket.off("game queue");
    };
  }, []);

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
      <audio ref={audioRef} src={CountdownSound} loop autoPlay />
      <HomeButton />
      <div className="h-full flex flex-col items-center justify-evenly">
        <img src={YahootLogo} alt="Yahoot Logo" className="h-15" />
        <h1 className="text-2xl">
          Quiz Theme:
          <br />
          Pengetahuan Umum
        </h1>

        <p>Countdown : {countdown} detik</p>
        <div className="flex flex-row gap-4 items-center justify-items-center">
          {users.map((user, index) => (
            <button className="btn btn-accent" title="Ready to play">
              {user.username}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
