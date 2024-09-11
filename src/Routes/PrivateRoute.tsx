
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const PrivateRoute = ({ children }: any) => {
  const { user, loading }: any = useContext(AuthContext)
  const location = useLocation();
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return (
    <div>
      <Navigate to={"/login"} state={{ from: location }} replace></Navigate>
    </div>
  );
};

export default PrivateRoute;