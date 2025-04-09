import { useEffect, useState } from "react";
import { useUsername } from "../contexts/username.context";
import { socket } from "../../helpers/socket";
import { useNavigate } from "react-router";

export default function WaitingRoom() {
  const { username, userCode, setUsername } = useUsername();
  const [countdown, setCountdown] = useState(20);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

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

  return (
    <section className="chalkboard">
      <a onClick={() => navigate('/')} className="btn btn-success border-b-4 absolute top-4 left-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      </a>

      <div className="h-full flex flex-col items-center justify-evenly">
        <h1 className="text-2xl">
          Quiz Theme:
          <br />
          Pengetahuan Umum
        </h1>
        
        <p>Countdown : {countdown} second</p>
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
