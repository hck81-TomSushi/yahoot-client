import { createContext, useContext, useState, useEffect } from "react";
import { yahootServer } from "../../helpers/http-client";
import { useNavigate } from "react-router";

export const UsernameContext = createContext({
  username: "",
  userCode: "",
  setUserCode: () => {},
  setUsername: () => {},
});

export const UsernameProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [userCode, setUserCode] = useState("");
  const navigate = useNavigate();

  const checkUsername = async () => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      try {
        const { data } = await yahootServer.get("/username", {
          headers: { Authorization: access_token },
        });
        setUsername(data.username);
        setUserCode(data.userCode);
      } catch (error) {
        console.log("Error checking username:", error);
        localStorage.removeItem("access_token");
        navigate("/login");
      }
    }
  };

  const createTokenFromUsername = async (newUsername) => {
    try {
      const { data } = await yahootServer.post("/login", { username: newUsername });
      localStorage.setItem("access_token", "Bearer " + data.access_token);
      setUsername(data.username);
      setUserCode(data.userCode);
      navigate("/");
    } catch (error) {
      console.log("Error creating token:", error);
    }
  };

  useEffect(() => {
    checkUsername();
  }, []);

  return (
    <UsernameContext.Provider
      value={{
        username,
        userCode,
        setUsername: createTokenFromUsername,
      }}
    >
      {children}
    </UsernameContext.Provider>
  );
};

export const useUsername = () => {
  return useContext(UsernameContext);
};
