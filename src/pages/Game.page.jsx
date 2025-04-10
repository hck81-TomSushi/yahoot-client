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
import AnswerCard from "../components/AnswerCard";
import HomeButton from "../components/HomeButton";

export default function GamePage() {
  const { username, userCode, setUsername } = useUsername();
  const [isWaiting, setIsWaiting] = useState(false);
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
  };

  async function getHint() {
    try {
      const questionn = question.question;
      const answers = JSON.stringify([
        question.answer1,
        question.answer2,
        question.answer3,
        question.rightAnswer,
      ]);
      updateScore(-20);
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
        updateScore(100);
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
      } else if (counter >= 9 && countdown === 0) {
        navigate("/result");
      } else {
        setIsWaiting(true);
      }
    } catch (error) {
      console.log("🐄 - chooseAnswer - error:", error);
    }
  }

  return (
    <section className="chalkboard">
      <audio ref={audioRef} src={BGM} loop autoPlay />
      <HomeButton />
      {isWaiting ? (
        <div className="h-full flex flex-col items-center justify-evenly">
          <p className="text-3xl m-5">{countdown} detik</p>
          <p className="text-xl">Menunggu pemain lain selesai...</p>
        </div>
      ) : (
        <div className="h-full flex flex-col items-center justify-evenly">
          <p className="text-xl">Sisa waktu : {countdown} detik</p>
          <div>
            <h2 className="text-xl">Top Scorer:</h2>
            <ul>
              {Object.entries(scoreboard).map(([username, score], i) =>
                i < 3 ? (
                  <li key={username}>
                    {username}: {score} points
                  </li>
                ) : null
              )}
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
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <AnswerCard
              choice="A"
              data={answers[0]}
              onClick={() => chooseAnswer(answers[0])}
            />
            <AnswerCard
              choice="B"
              data={answers[1]}
              onClick={() => chooseAnswer(answers[1])}
            />
            <AnswerCard
              choice="C"
              data={answers[2]}
              onClick={() => chooseAnswer(answers[2])}
            />
            <AnswerCard
              choice="D"
              data={answers[3]}
              onClick={() => chooseAnswer(answers[3])}
            />
          </div>
        </div>
      )}
    </section>
  );
}
