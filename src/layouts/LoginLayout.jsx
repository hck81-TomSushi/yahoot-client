import { Navigate, Outlet } from "react-router";

export default function LoginLayout() {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}
