import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useUsername } from "../contexts/username.context";

const socket = io("http://localhost:3000", {
  auth: {
    token: localStorage.getItem("access_token"),
  },
  // reconnection: true,
  // reconnectionAttempts: 5,
  // reconnectionDelay: 1000,
});

export default function WaitingRoom() {
  const { username, setUsername } = useUsername();
  const [isReady, setIsReady] = useState(false);

  // fetch question untuk dapet tema quiz
  // real time user yang ready
  // klik button user sendiri -> status user sendiri jadi ready
  // kalo semua udah ready -> isReady =  true -> mulai countdown

  function countdown(seconds) {
    try {
      let counter = seconds;
      const interval = setInterval(() => {
        console.log(counter);
        counter--;
        if (counter < 0) {
          clearInterval(interval);
          console.log("Game start!");
        }
      }, 1000);
    } catch (error) {
      console.log("🐄 - countdown - error:", error);
    }
  }

  useEffect(() => {
    socket.on("say hello", (params) => {
      console.log(params, "<<< message dari server");
    });

    socket.emit("say hello", { message: `Hello from ${username}` });


    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSayHello = () => {
    // Emit "say hello" event to the server
    socket.emit("say hello", { message: "Hello from client" });
  };

  return (
    <section className="chalkboard">
      <a href="/" className="btn btn-success border-b-4 absolute top-4 left-4">
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
        {isReady ? (
          countdown(5)
        ) : (
          <span className="loading loading-spinner text-accent"></span>
        )}
        <p>Waiting for other users...</p>
        <div className="flex flex-row gap-4 items-center justify-items-center">
          <button className="btn btn-accent" title="Ready to play">
            user1
          </button>
          <button className="btn btn-neutral" title="Not ready" onClick={handleSayHello}>
            user2
          </button>
          <button className="btn btn-accent" title="Ready to play">
            user3
          </button>
        </div>
      </div>
    </section>
  );
}
