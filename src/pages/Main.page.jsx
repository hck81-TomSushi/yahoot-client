import { useNavigate } from "react-router";
import { yahootServer } from "../../helpers/http-client";
import YahootLogo from "../assets/yahoot_white.png";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function MainPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const inputUsername = async () => {
    try {
      const { data } = await yahootServer.post("/login", { username: name });
      localStorage.setItem("access_token", "Bearer " + data.access_token);
      setUsername(data.username);
    } catch (error) {
      console.log("🐄 - inputUsername - error:", error);
      Swal.fire({
        icon: "error",
        title: "Namanya ga bener!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

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
  };

  useEffect(() => {
    checkUsername();
  }, []);

  return (
    <section className="chalkboard">
      <div className="flex flex-col items-center justify-evenly h-full">
        <img src={YahootLogo} alt="Yahoot Logo" className="h-15" />
        {username ? (
          <h1 className="text-3xl">Hello, {username}!</h1>
        ) : (
          <form onSubmit={(e) => {
            e.preventDefault();
            inputUsername()
            }}>
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                type="text"
                className="text-center text-accent text-xl"
                required
                placeholder="Enter your username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <button
              className="btn btn-accent btn-lg text-3lg w-80 h-15"
              type="button"
              onClick={() => inputUsername()}
            >
              I want this name!
            </button>
          </form>
        )}
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
