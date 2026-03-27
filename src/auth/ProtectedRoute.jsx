import { Navigate } from "react-router";

export default function ProtectedRoute({ children, allowedRoles }) {
  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" />; // or /unauthorized
  }

  return children;
}
