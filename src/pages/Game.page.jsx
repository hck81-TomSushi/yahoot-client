import { useState } from "react";
import Swal from "sweetalert2";

export default function GamePage() {
  const [question, setQuestion] = useState({});

  async function getHint() {
    try {
      Swal.fire({
        icon: "question",
        title: "Hint",
        text: "Albert Einstein is a physicist known for his theory of relativity.",
      });
    } catch (error) {
      console.log("🐄 - getHint - error:", error);
    }
  }

  async function chooseAnswer() {
    try {
      Swal.fire({
        icon: "success",
        title: "Correct answer",
        confirmButtonText: "Next",
      });
      setQuestion(question.id + 1);
      // gatau ges masih kasar pokoknya gitulah
    } catch (error) {
      console.log("🐄 - chooseAnswer - error:", error);
    }
  }
  return (
    <div className="h-screen flex flex-col items-center justify-evenly">
      <h1 className="text-3xl">Quiz Science</h1>
      <div className="card card-border bg-success text-base-100 w-100vh card-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Pertanyaan</h2>
          <p>Siapa yang menemukan teori relativitas?</p>
        </div>
      </div>
      <div>
        <button
          className="btn btn-base-100"
          onClick={getHint}
          title="Get Hint from AI"
        >
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
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div
          className="card card-border bg-primary text-base-100 w-100"
          onClick={chooseAnswer}
        >
          <div className="card-body items-center text-center">
            <h2 className="card-title">A.</h2>
            <p>Albert Einstein</p>
          </div>
        </div>
        <div
          className="card card-border bg-secondary text-base-100 w-100"
          onClick={chooseAnswer}
        >
          <div className="card-body items-center text-center">
            <h2 className="card-title">B.</h2>
            <p>Isaac Newton</p>
          </div>
        </div>
        <div
          className="card card-border bg-accent text-base-100 w-100"
          onClick={chooseAnswer}
        >
          <div className="card-body items-center text-center">
            <h2 className="card-title">C.</h2>
            <p>Galileo Galilei</p>
          </div>
        </div>
        <div
          className="card card-border bg-neutral text-base-100 w-100"
          onClick={chooseAnswer}
        >
          <div className="card-body items-center text-center">
            <h2 className="card-title">D.</h2>
            <p>Nikola Tesla</p>
          </div>
        </div>
      </div>
    </div>
  );
}
