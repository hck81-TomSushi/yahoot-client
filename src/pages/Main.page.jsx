import { useState } from "react";

export default function MainPage() {
  const username = localStorage.getItem("username");
  const [name, setName] = useState(username || "");

  async function inputUsername(e) {
    e.preventDefault();
    try {
      localStorage.setItem("username", name);
    } catch (error) {
      console.log("🐄 - inputUsername - error:", error);
    }
  }

  return (
    <section>
      <div className="flex flex-col items-center justify-evenly h-100">
        {username ? (
          <h1>Hello, {username}!</h1>
        ) : (
          <form onSubmit={inputUsername}>
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
                type="input"
                required
                placeholder="Enter your username"
                minLength="3"
                maxLength="30"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </form>
        )}
        <a className="btn btn-accent btn-xl w-100 h-50" href="/waiting-room">
          Start Playing!
        </a>
      </div>
    </section>
  );
}
