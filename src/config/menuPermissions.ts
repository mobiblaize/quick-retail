/**
 * Menu Item to Permission Mapping Configuration
 * 
 * Maps sidebar menu items to required permissions.
 * Items not listed here are visible to all authenticated users.
 */

export interface MenuPermission {
  label: string;
  permissions: string[];
  requireAll?: boolean; // If true, all permissions required. If false, any permission is enough (default)
}

export const menuPermissions: MenuPermission[] = [
  // Point of Sales Menu Items
  {
    label: "Dashboard",
    permissions: ["view_dashboard"],
  },
  {
    label: "Products",
    permissions: ["view_products"],
  },
  {
    label: "Sales",
    permissions: ["view_sales"],
  },
  {
    label: "Inventory",
    permissions: ["view_inventory"],
  },
  {
    label: "Categories",
    permissions: ["view_category"],
  },
  {
    label: "Returns and Refunds",
    permissions: ["view_returns"],
  },
  {
    label: "Customers",
    permissions: ["view_customers"],
  },
  {
    label: "Discounts",
    permissions: ["view_discounts"],
  },
  {
    label: "Transaction",
    permissions: ["view_transactions"],
  },
  {
    label: "Stores",
    permissions: ["view_stores"],
  },
  {
    label: "Reports",
    permissions: ["view_reports"],
  },
];

/**
 * Check if a menu item should be visible based on user permissions
 */
export const getMenuPermissions = (label: string): string[] => {
  const menuItem = menuPermissions.find((item) => item.label === label);
  return menuItem?.permissions || [];
};

/**
 * Check if all permissions are required for a menu item
 */
export const requiresAllPermissions = (label: string): boolean => {
  const menuItem = menuPermissions.find((item) => item.label === label);
  return menuItem?.requireAll || false;
};

