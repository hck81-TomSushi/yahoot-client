export default function AnswerCard({ onClick, data, choice }) {
  return (
    <>
      <div
        className="card border-b-4 bg-primary w-100 answer-card hover:scale-[1.02] transition"
        onClick={onClick}
      >
        <div className="card-body items-center text-center">
          <h2 className="card-title">{choice}</h2>
          <p>{data}</p>
        </div>
      </div>
    </>
  );
}
