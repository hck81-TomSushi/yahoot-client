import {useNavigate} from "react-router";
import YahootLogo from "../assets/yahoot_white.png";
import Swal from "sweetalert2";
import {useUsername} from "../contexts/username.context";
import {useState} from "react";

export default function MainPage() {
  const {username, setUsername} = useUsername();
  const [formName, setFormName] = useState("");
  const navigate = useNavigate();

  const inputUsername = async () => {
    try {
      if (!formName.trim()) {
        throw new Error("Username jangan kosong!");
      }
      if (formName.trim().length < 3) {
        throw new Error("Username terlalu pendek");
      }
      setUsername(formName);
      navigate("/");
    } catch (error) {
      console.log("🐄 - inputUsername - error:", error);
      Swal.fire({
        icon: "error",
        title: "Namanya ga bener!",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <section className="chalkboard">
      <a href="/" className="btn btn-success border-b-4 absolute top-4 left-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      </a>

      <div className="flex flex-col items-center justify-evenly h-full">
        <img src={YahootLogo} alt="Yahoot Logo" className="h-15" />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            inputUsername();
          }}>
          <label className="input validator my-4">
            <input
              type="text"
              className="text-center text-accent text-xl"
              required
              placeholder="Enter your username"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
            />
          </label>
          <button
            className="btn btn-accent btn-lg text-3lg w-80 h-15"
            type="button"
            onClick={() => inputUsername()}>
            I want this name!
          </button>
        </form>
      </div>
    </section>
  );
}
