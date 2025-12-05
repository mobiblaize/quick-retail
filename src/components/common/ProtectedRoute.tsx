import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { usePermissions } from "../../hooks/usePermissions";
import Unauthorized from "./Unauthorized";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredPermissions?: string[];
  requireAll?: boolean; // If true, user must have all permissions. If false, any permission is enough
  adminOnly?: boolean;
}

/**
 * Protected Route Wrapper Component
 * Wraps routes to enforce permission-based access control
 * 
 * @param children - The component to render if authorized
 * @param requiredPermissions - Array of permission names required to access the route
 * @param requireAll - If true, all permissions are required. If false, any one is enough (default: false)
 * @param adminOnly - If true, only admin users can access (default: false)
 */
const ProtectedRoute = ({
  children,
  requiredPermissions = [],
  requireAll = false,
  adminOnly = false,
}: ProtectedRouteProps) => {
  const location = useLocation();
  const { hasRouteAccess, hasAnyPermission, hasAllPermissions, isAdmin } = usePermissions();

  // Check admin-only access
  if (adminOnly && !isAdmin) {
    return (
      <Unauthorized message="This page is only accessible to administrators" />
    );
  }

  // Check route-based access (using route configuration)
  if (!hasRouteAccess(location.pathname)) {
    return <Unauthorized />;
  }

  // Check explicit permission requirements if provided
  if (requiredPermissions.length > 0) {
    const hasAccess = requireAll
      ? hasAllPermissions(requiredPermissions)
      : hasAnyPermission(requiredPermissions);

    if (!hasAccess && !isAdmin) {
      return <Unauthorized />;
    }
  }

  // User is authorized, render the children
  return <>{children}</>;
};

export default ProtectedRoute;

