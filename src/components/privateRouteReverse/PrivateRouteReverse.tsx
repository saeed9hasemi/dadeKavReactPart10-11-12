import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function PrivateRouteReverse() {
  const { isLogin } = useAuth();
  return <>{isLogin ? <Navigate to={"/"} /> : <Outlet />}</>;
}

export default PrivateRouteReverse;
