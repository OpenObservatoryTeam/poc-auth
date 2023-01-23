import { CircularProgress } from "@mui/material";
import { Navigate } from "@tanstack/react-location";
import { useUserContext } from "../../contexts/UserContext";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { loading, userId } = useUserContext();
  if (loading) return <CircularProgress />;
  return userId ? <>{children}</> : <Navigate to="/login" />;
}
