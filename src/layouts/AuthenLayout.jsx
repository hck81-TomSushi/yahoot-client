import { Outlet, useNavigate } from "react-router";
import { yahootServer } from "../../helpers/http-client";
import { useEffect, useState } from "react";

export default function AuthenLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) {
        navigate("/login");
        return;
      }
      try {
        const { data } = await yahootServer.get("/username", {
          headers: { Authorization: access_token },
        });
        if (data.username) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("access_token");
          navigate("/login");
        }
      } catch (error) {
        console.log("🐄 - checkAuthentication - error:", error);
        localStorage.removeItem("access_token");
        navigate("/login");
      }
    };
    checkAuthentication();
  }, [navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return <Outlet />;
}
