import { useState } from "react";
import YahootLogo from "../assets/yahoot_white.png";
import { useNavigate } from "react-router";

export default function WaitingRoom() {
  const [countdown, setCountdown] = useState(-1);
  const navigate = useNavigate();

  // real time user yang ready
  // klik button user sendiri -> status user sendiri jadi ready
  // kalo semua udah ready -> isReady =  true -> mulai countdown

  async function startCountdown(seconds) {
    try {
      let counter = seconds;
      const interval = setInterval(() => {
        setCountdown(counter);
        counter--;
        if (counter < 0) {
          clearInterval(interval);
          navigate("/game");
        }
      }, 1000);
    } catch (error) {
      console.log("🐄 - countdown - error:", error);
    }
  }

  return (
    <section className="chalkboard">
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
        <img src={YahootLogo} alt="Yahoot Logo" className="h-15" />
        <h1 className="text-2xl">Kuis akan segera dimulai...</h1>
        {countdown > 0 ? (
          <span className="countdown font-mono text-6xl text-accent">
            <span style={{ "--value": countdown }} aria-live="polite">
              countdown
            </span>
          </span>
        ) : (
          <>
            <span className="loading loading-spinner text-accent"></span>
            <p>Menunggu pemain lain...</p>
          </>
        )}
        <button
          className="btn btn-success btn-xl"
          // harusnya ubah status jadi ready => kalo semua user udah ready baru startCountdown jalan
          onClick={() => startCountdown(5)}
        >
          Aku siap!
        </button>
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
    </section>
  );
}
