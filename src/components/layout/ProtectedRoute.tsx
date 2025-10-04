import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hook";
import { Navigate } from "react-router-dom";
import { selectCurrentToken } from "../../redux/store";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  //NOTE General way to take the token
  // const token = useAppSelector((state) => state.auth.token);

  const token = useAppSelector(selectCurrentToken);
  // const user = useAppSelector(selectCurrentUser);
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
