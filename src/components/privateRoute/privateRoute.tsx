import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function PrivateRoute() {
  const { isLogin } = useAuth();
  return <>{isLogin ? <Outlet /> : <Navigate to={"/"} />}</>;
}

export default PrivateRoute;
