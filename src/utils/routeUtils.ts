import { Permission } from "../hooks/useUserStore";
import { ROUTES } from "../constants/routes";
import { getRoutePermissions } from "../config/routePermissions";

/**
 * Menu items in priority order
 * The system will redirect to the first accessible item in this list
 */
export const MENU_ROUTES_PRIORITY = [
  { path: ROUTES.dashboard, label: "Dashboard" },
  { path: ROUTES.productManagement, label: "Products" },
  { path: ROUTES.sales, label: "Sales" },
  { path: ROUTES.inventory, label: "Inventory" },
  { path: ROUTES.category, label: "Categories" },
  { path: ROUTES.returns, label: "Returns" },
  { path: ROUTES.customer, label: "Customers" },
  { path: ROUTES.happyTime, label: "Discounts" },
  { path: ROUTES.transaction, label: "Transactions" },
  { path: ROUTES.storeTarget, label: "Stores" },
  { path: ROUTES.report, label: "Reports" },
];

/**
 * Check if a user has permission to access a specific route
 */
const hasAccessToRoute = (
  path: string,
  permissions: Permission[],
  isAdmin: boolean
): boolean => {
  // Admin users have access to everything
  if (isAdmin) return true;

  const routeConfig = getRoutePermissions(path);

  // If route is not configured, allow access (will be handled by ProtectedRoute)
  if (!routeConfig) return true;

  // Admin-only routes
  if (routeConfig.isAdminOnly) return false;

  // If no specific permissions required, allow access
  if (!routeConfig.permissions || routeConfig.permissions.length === 0) {
    return true;
  }

  // Check if user has any of the required permissions
  return routeConfig.permissions.some((requiredPermission) =>
    permissions.some((p) => p.name === requiredPermission)
  );
};

/**
 * Get the first accessible route for a user based on their permissions
 * Returns the dashboard route as fallback
 */
export const getFirstAccessibleRoute = (
  permissions: Permission[],
  roles: Array<{ name: string }> = []
): string => {
  const isAdmin = roles.some((role) => role.name === "admin");

  // Admin users always go to dashboard (or they could go to admin page)
  if (isAdmin) {
    return ROUTES.dashboard;
  }

  // Find the first route the user has access to
  for (const route of MENU_ROUTES_PRIORITY) {
    if (hasAccessToRoute(route.path, permissions, isAdmin)) {
      return route.path;
    }
  }

  // Fallback to dashboard (ProtectedRoute will handle if user doesn't have access)
  return ROUTES.dashboard;
};

/**
 * Get the menu label for a given route path
 * Returns the label if found, otherwise "Page"
 */
export const getRouteLabel = (path: string): string => {
  const route = MENU_ROUTES_PRIORITY.find((r) => r.path === path);
  return route?.label || "Page";
};

/**
 * Alternative: Get first accessible admin route for admin users
 */
export const getFirstAdminRoute = (): string => {
  return ROUTES.vendorpage; // Default admin landing page
};

