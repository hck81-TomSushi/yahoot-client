import YahootLogo from "../assets/yahoot.png";

export default function HomePage() {
  return (
    <section>
      <div className="navbar bg-base-100 shadow-sm">
        <a className="btn btn-ghost text-xl" href="/">
          <img src={YahootLogo} width="100px" />
        </a>
      </div>
      <div className="flex flex-col items-center justify-evenly h-screen">
        <div className="join">
          <div>
            <label className="input validator join-item">
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
              <input type="text" placeholder="Enter your username" required />
            </label>
            <div className="validator-hint hidden">Enter your username</div>
          </div>
          <button className="btn btn-neutral join-item">Play!</button>
        </div>
        <button className="btn btn-accent">Start Playing!</button>
      </div>
    </section>
  );
}
