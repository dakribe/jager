import { useAuth } from "@/auth";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();

  return isLoggedIn === true ? children : <Navigate to="/signin" />;
}
