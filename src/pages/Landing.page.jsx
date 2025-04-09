import { useNavigate } from "react-router";
import { yahootServer } from "../../helpers/http-client";
import YahootLogo from "../assets/yahoot_white.png";
import { useEffect } from "react";
import { socket } from "../../helpers/socket";
import { useUsername } from "../contexts/username.context";

export default function LandingPage() {
  const { username, userCode, setUsername } = useUsername();
  const navigate = useNavigate();

  const checkUsername = async () => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      try {
        const { data } = await yahootServer.get("/username", {
          headers: { Authorization: localStorage.getItem("access_token") },
        });
        setUsername(data.username);
        socket.connect();
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
    console.log("username", username, " || userCode", userCode);
    
    socket.on("game queue", { username, userCode });
  }, []);

  return (
    <section className="chalkboard">
      <div className="flex flex-col items-center justify-evenly h-full">
        <img src={YahootLogo} alt="Yahoot Logo" className="h-15" />
        <h1 className="text-3xl">Hello, {username}!</h1>
        {username && (
          <>
            <button
              className="btn btn-accent btn-lg text-2lg w-80 h-15"
              type="button"
              onClick={() => deleteUsername()}
            >
              I want to change my name!
            </button>
            <button
              className="btn btn-accent btn-xl text-3xl w-100 h-30"
              onClick={() => navigate("/waiting-room")}
            >
              Start Playing!
            </button>
          </>
        )}
      </div>
    </section>
  );
}
