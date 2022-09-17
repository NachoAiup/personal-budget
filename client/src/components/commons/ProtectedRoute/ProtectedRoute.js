import { Navigate } from "react-router-dom";
import { useUserState } from "../../../providers/UserProvider";
import { USER_ROUTES } from "../../../routes/user/constants";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useUserState();

  if (!isLoggedIn) {
    return <Navigate to={USER_ROUTES.LOGIN} replace />;
  }
  return children;
}
