import { useState } from "react";

export default function WaitingRoom() {
  const [isReady, setIsReady] = useState(false);

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

  return (
    <div className="h-screen flex flex-col items-center justify-evenly">
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
        <button className="btn btn-neutral" title="Not ready">
          user2
        </button>
        <button className="btn btn-accent" title="Ready to play">
          user3
        </button>
      </div>
    </div>
  );
}
