import { useUserStore } from "./useUserStore";
import { getRoutePermissions, isAdminRoute } from "../config/routePermissions";

/**
 * Custom hook for permission checking
 */
export const usePermissions = () => {
  const { hasPermission, isAdmin, permissions } = useUserStore();

  /**
   * Check if user has access to a specific route
   */
  const hasRouteAccess = (path: string): boolean => {
    // Admin users have access to all admin routes
    if (isAdminRoute(path)) {
      return isAdmin();
    }

    const routeConfig = getRoutePermissions(path);
    
    // If route is not configured, allow access (public routes within dashboard)
    if (!routeConfig) return true;

    // Check if it's admin-only route
    if (routeConfig.isAdminOnly) {
      return isAdmin();
    }

    // If no specific permissions required, allow access
    if (!routeConfig.permissions || routeConfig.permissions.length === 0) {
      return true;
    }

    // Check if user has any of the required permissions
    return routeConfig.permissions.some((permission) => hasPermission(permission));
  };

  /**
   * Check if user has a specific permission by name
   */
  const checkPermission = (permissionName: string): boolean => {
    return hasPermission(permissionName);
  };

  /**
   * Check if user has any of the specified permissions
   */
  const hasAnyPermission = (permissionNames: string[]): boolean => {
    return permissionNames.some((name) => hasPermission(name));
  };

  /**
   * Check if user has all of the specified permissions
   */
  const hasAllPermissions = (permissionNames: string[]): boolean => {
    return permissionNames.every((name) => hasPermission(name));
  };

  return {
    hasRouteAccess,
    checkPermission,
    hasAnyPermission,
    hasAllPermissions,
    isAdmin: isAdmin(),
    permissions,
  };
};

