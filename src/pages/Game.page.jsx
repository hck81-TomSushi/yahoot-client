import { useEffect, useState, useRef } from "react";
import { yahootServer } from "../../helpers/http-client";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import BGM from "../assets/quiz_bgm.mp3";
import CorrectSFX from "../assets/correct_answer.mp3";
import WrongSFX from "../assets/wrong_answer.mp3";
import HintSFX from "../assets/hint.mp3";
import { socket } from "../../helpers/socket";
import { useUsername } from "../contexts/username.context";

export default function GamePage() {
  const { username, userCode, setUsername } = useUsername();
  const [counter, setCounter] = useState(0);
  const [question, setQuestion] = useState({});
  const [questions, setQuestions] = useState([]);
  const [rightAnswer, setRightAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const correctSFX = new Audio(CorrectSFX);
  const wrongSFX = new Audio(WrongSFX);
  const hintSFX = new Audio(HintSFX);
  const [countdown, setCountdown] = useState(null); // State to store the countdown timer
  const [scoreboard, setScoreboard] = useState({}); // State to store the scoreboard

  useEffect(() => {
    function playAudio() {
      const audio = audioRef.current;
      if (audio) {
        audio.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
    }
    playAudio();

    socket.emit("started", { username, userCode });
  }, []);

  
  useEffect(() => {
    // Listen for the countdown event
    socket.on("game countdown", (time) => {
      setCountdown(time); // Update the countdown timer
    });

    // Listen for the scoreboard event
    socket.on("scoreboard", (updatedScoreboard) => {
      setScoreboard(updatedScoreboard); // Update the scoreboard
    });

    // Listen for the "move to result" event
    socket.on("move to result", (data) => {
      console.log("Navigating to:", data.path);
      navigate(data.path, { state: { scoreboard: data.scoreboard } }); // Pass the scoreboard to /result
    });

    // Cleanup: Remove listeners when the component unmounts
    return () => {
      socket.off("game countdown");
      socket.off("scoreboard");
      socket.off("move to result");
    };
  }, [navigate]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await yahootServer.get("/questions", {
          headers: { Authorization: localStorage.getItem("access_token") },
        });
        setQuestions(response.data.questions);
        setQuestion(response.data.questions[counter]);
        randomizingAnswers([
          response.data.questions[counter].rightAnswer,
          response.data.questions[counter].answer1,
          response.data.questions[counter].answer2,
          response.data.questions[counter].answer3,
        ]);
      } catch (error) {
        console.log("🐄 - fetchQuestions - error:", error);
        Swal.fire({
          icon: "error",
          title: "Tidak bisa mengakses DB",
          confirmButtonText: "close",
        });
      }
    }
    fetchQuestions();
  }, [counter]);

  const updateScore = (points) => {
    socket.emit("update score", { socketId: socket.id, score: points });
  };

  const randomizingAnswers = (answers) => {
    setRightAnswer(answers[0]);
    const shuffledAnswers = answers.sort(() => Math.random() - 0.5);
    setAnswers(shuffledAnswers);
  }

  async function getHint() {
    try {
      const questionn = question.question;
      const answers = JSON.stringify([
        question.answer1,
        question.answer2,
        question.answer3,
        question.rightAnswer,
      ]);
      updateScore(-20)
      const response = await yahootServer.post(
        "/hint",
        {
          question: questionn,
          answers: answers,
        },
        {
          headers: { Authorization: localStorage.getItem("access_token") },
        }
      );
      hintSFX.play();
      Swal.fire({
        icon: "question",
        title: "Petunjuk",
        text: response.data.hint,
      });
    } catch (error) {
      console.log("🐄 - getHint - error:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal mengakses AI",
        confirmButtonText: "close",
      });
    }
  }

  async function chooseAnswer(answer) {
    try {
      if (answer === rightAnswer) {
        correctSFX.play();
        Swal.fire({
          icon: "success",
          title: "Jawaban benar",
          confirmButtonText: "Selanjutnya",
        });
        updateScore(100)
      } else {
        wrongSFX.play();
        Swal.fire({
          icon: "error",
          title: "Jawaban salah",
          confirmButtonText: "Selanjutnya",
        });
      }
      if (counter < 9) {
        setCounter(counter + 1);
        setQuestion(questions[counter]);
      } else {
        navigate("/result");
      }
    } catch (error) {
      console.log("🐄 - chooseAnswer - error:", error);
    }
  }

  return (
    <section className="chalkboard">
      <audio ref={audioRef} src={BGM} loop autoPlay />

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
        <h1 className="text-3xl">Tema Kuis: Science</h1>
        <h3>timer : {countdown}</h3>
        <div>
          <h2 className="text-xl">Scoreboard:</h2>
          <ul>
            {Object.entries(scoreboard).map(([username, score]) => (
              <li key={username}>
                {username}: {score} points
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xl text-center">{question?.question}</p>
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
            onClick={() => chooseAnswer(answers[0])}
          >
            <div className="card-body items-center text-center">
              <h2 className="card-title">A.</h2>
              <p>{answers[0]}</p>
            </div>
          </div>
          <div
            className="card border-b-4 bg-secondary w-100 answer-card"
            onClick={() => chooseAnswer(answers[1])}
          >
            <div className="card-body items-center text-center">
              <h2 className="card-title">B.</h2>
              <p>{answers[1]}</p>
            </div>
          </div>
          <div
            className="card border-b-4 bg-accent w-100 answer-card"
            onClick={() => chooseAnswer(answers[2])}
          >
            <div className="card-body items-center text-center">
              <h2 className="card-title">C.</h2>
              <p>{answers[2]}</p>
            </div>
          </div>
          <div
            className="card border-b-4 bg-neutral w-100 answer-card"
            onClick={() => chooseAnswer(answers[3])}
          >
            <div className="card-body items-center text-center">
              <h2 className="card-title">D.</h2>
              <p>{answers[3]}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
