export default function WaitingRoom() {
  return (
    <div className="h-screen flex flex-col items-center justify-evenly">
      <p>Theme: Pengetahuan Umum</p>
      <span className="loading loading-spinner text-accent"></span>
      <h1>Waiting for other users...</h1>
    </div>
  );
}
