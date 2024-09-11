import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import UseAdmin from "../Hook/UseAdmin";
const AdminRoute = ({ children }: any) => {
  const { user, loading }: any = useContext(AuthContext);
  const [isAdmin, isAdminLoading] =UseAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return <progress className="progress w-56"></progress>;
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;