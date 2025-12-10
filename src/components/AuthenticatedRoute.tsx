import { useContext, type ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

interface AuthenticatedRouteProps {
  children: ReactNode;
}

export default function AuthenticatedRoute({ children }:AuthenticatedRouteProps) {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? children : <Navigate to="/login" />;
}
