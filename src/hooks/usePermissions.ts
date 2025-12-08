import { useCallback } from "react";
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
  const hasRouteAccess = useCallback((path: string): boolean => {
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
  }, [hasPermission, isAdmin]);

  /**
   * Check if user has a specific permission by name
   */
  const checkPermission = useCallback((permissionName: string): boolean => {
    return hasPermission(permissionName);
  }, [hasPermission]);

  /**
   * Check if user has any of the specified permissions
   */
  const hasAnyPermission = useCallback((permissionNames: string[]): boolean => {
    return permissionNames.some((name) => hasPermission(name));
  }, [hasPermission]);

  /**
   * Check if user has all of the specified permissions
   */
  const hasAllPermissions = useCallback((permissionNames: string[]): boolean => {
    return permissionNames.every((name) => hasPermission(name));
  }, [hasPermission]);

  return {
    hasRouteAccess,
    checkPermission,
    hasAnyPermission,
    hasAllPermissions,
    isAdmin: isAdmin(),
    permissions,
  };
};

