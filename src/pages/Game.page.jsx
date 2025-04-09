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
      // if answer is correct
      Swal.fire({
        icon: "success",
        title: "Correct answer",
        confirmButtonText: "Next",
      });
      // if answer is wrong
      // Swal.fire({
      //   icon: "error",
      //   title: "Wrong answer",
      //   confirmButtonText: "Next",
      // });
      // go to the next question
      setQuestion(question.id + 1);
      // gatau ges masih kasar pokoknya gitulah
    } catch (error) {
      console.log("🐄 - chooseAnswer - error:", error);
    }
  }
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
        <h1 className="text-3xl">Quiz Science</h1>
        <p className="text-xl text-center">
          Siapa yang menemukan teori relativitas?
        </p>
        <div>
          <button
            className="btn btn-success border-b-4"
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
            className="card border-b-4 bg-primary w-100 answer-card"
            onClick={chooseAnswer}
          >
            <div className="card-body items-center text-center">
              <h2 className="card-title">A.</h2>
              <p>Albert Einstein</p>
            </div>
          </div>
          <div
            className="card border-b-4 bg-secondary w-100 answer-card"
            onClick={chooseAnswer}
          >
            <div className="card-body items-center text-center">
              <h2 className="card-title">B.</h2>
              <p>Isaac Newton</p>
            </div>
          </div>
          <div
            className="card border-b-4 bg-accent w-100 answer-card"
            onClick={chooseAnswer}
          >
            <div className="card-body items-center text-center">
              <h2 className="card-title">C.</h2>
              <p>Galileo Galilei</p>
            </div>
          </div>
          <div
            className="card border-b-4 bg-neutral w-100 answer-card"
            onClick={chooseAnswer}
          >
            <div className="card-body items-center text-center">
              <h2 className="card-title">D.</h2>
              <p>Nikola Tesla</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
