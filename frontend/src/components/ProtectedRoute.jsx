import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute
 * ─────────────────────────────────────────────────────
 * Props:
 *   allowedRoles  string[]  — roles that may access this route
 *   children      ReactNode — the page to render if authorised
 *
 * Behaviour:
 *   • Not logged in           → /login        (with ?redirect=<path>)
 *   • Logged in, wrong role   → /unauthorized
 *   • Logged in, correct role → renders children
 */
const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const { user, authLoading } = useAuth();
  const location = useLocation();

  if (authLoading) {
    return null;
  }

  // 1. Must be authenticated
  if (!user) {
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(`${location.pathname}${location.search}`)}`}
        replace
      />
    );
  }

  // 2. Must have an allowed role
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
