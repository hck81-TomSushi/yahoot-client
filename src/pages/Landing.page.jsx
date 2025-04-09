import YahootLogo from "../assets/yahoot_white.png";

export default function LandingPage() {
  return (
    <section className="chalkboard">
      <div className="flex flex-col items-center justify-evenly h-full">
        <img src={YahootLogo} alt="Yahoot Logo" className="h-15" />
        <h1>Welcome to Yahoot!</h1>
      </div>
    </section>
  );
}
