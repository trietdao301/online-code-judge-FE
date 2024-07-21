import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

type Role = "Admin" | "ProblemSetter" | "Contestant";

interface PrivateRouteProps {
  allowedRoles: Role[];
  children?: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  allowedRoles,
  children,
}) => {
  const { user, role } = useAuth();

  if (!user || !role) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;
