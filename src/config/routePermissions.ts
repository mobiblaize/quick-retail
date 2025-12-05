import { ROUTES } from "../constants/routes";

/**
 * Route-to-Permission Mapping Configuration
 * 
 * Maps each route to the required permissions. Multiple permissions mean ANY of them grants access.
 * Routes not listed here are accessible to all authenticated users.
 * Admin routes are automatically accessible to users with 'admin' role.
 */

export interface RoutePermission {
  path: string;
  permissions: string[];
  isAdminOnly?: boolean;
}

export const routePermissions: RoutePermission[] = [
  // Dashboard
  {
    path: ROUTES.dashboard,
    permissions: ["view_dashboard"],
  },

  // Product Management
  {
    path: ROUTES.productManagement,
    permissions: ["view_products"],
  },
  {
    path: ROUTES.addNewProduct,
    permissions: ["edit_products"],
  },
  {
    path: ROUTES.addBulkProduct,
    permissions: ["edit_products"],
  },
  {
    path: ROUTES.editProduct,
    permissions: ["edit_products"],
  },
  {
    path: ROUTES.viewProduct,
    permissions: ["view_products"],
  },
  {
    path: ROUTES.inventoryDetails,
    permissions: ["view_products"],
  },

  // Sales
  {
    path: ROUTES.sales,
    permissions: ["view_sales"],
  },
  {
    path: ROUTES.createOrder,
    permissions: ["edit_sales"],
  },
  {
    path: ROUTES.viewOrder,
    permissions: ["view_sales"],
  },
  {
    path: ROUTES.viewOrderdraft,
    permissions: ["view_sales"],
  },
  {
    path: ROUTES.previewdownload,
    permissions: ["view_sales"],
  },

  // Inventory
  {
    path: ROUTES.inventory,
    permissions: ["view_inventory"],
  },
  {
    path: ROUTES.updateInventory,
    permissions: ["edit_inventory"],
  },
  {
    path: ROUTES.triggerOrder,
    permissions: ["edit_inventory"],
  },

  // Categories
  {
    path: ROUTES.category,
    permissions: ["view_category"],
  },
  {
    path: ROUTES.subCategory,
    permissions: ["view_category"],
  },
  {
    path: ROUTES.categoryCollection,
    permissions: ["view_category"],
  },

  // Returns
  {
    path: ROUTES.returns,
    permissions: ["view_returns"],
  },
  {
    path: ROUTES.logReturns,
    permissions: ["edit_returns"],
  },
  {
    path: ROUTES.viewReturns,
    permissions: ["view_returns"],
  },

  // Customers
  {
    path: ROUTES.customer,
    permissions: ["view_customers"],
  },

  // Discounts (Happy Time)
  {
    path: ROUTES.happyTime,
    permissions: ["view_discounts"],
  },
  {
    path: ROUTES.createDiscounts,
    permissions: ["edit_discounts"],
  },
  {
    path: ROUTES.happyDiscountAnalytics,
    permissions: ["view_discounts"],
  },
  {
    path: ROUTES.happyGiftCard,
    permissions: ["view_discounts"],
  },

  // Transactions
  {
    path: ROUTES.transaction,
    permissions: ["view_transactions"],
  },
  {
    path: ROUTES.viewTransaction,
    permissions: ["view_transactions"],
  },
  {
    path: ROUTES.viewPendingTransaction,
    permissions: ["view_transactions"],
  },
  {
    path: ROUTES.previewTransaction,
    permissions: ["view_transactions"],
  },

  // Stores
  {
    path: ROUTES.stores,
    permissions: ["view_stores"],
  },
  {
    path: ROUTES.viewStore,
    permissions: ["view_stores"],
  },
  {
    path: ROUTES.storeTarget,
    permissions: ["view_stores"],
  },
  {
    path: ROUTES.storeBillingInformation,
    permissions: ["edit_stores"],
  },
  {
    path: ROUTES.viewStoreProduct,
    permissions: ["view_stores"],
  },
  {
    path: ROUTES.aboutProduct,
    permissions: ["view_stores"],
  },

  // Reports
  {
    path: ROUTES.report,
    permissions: ["view_reports"],
  },
  {
    path: ROUTES.reportDateSelect,
    permissions: ["view_reports"],
  },
  {
    path: ROUTES.salesProcessing,
    permissions: ["view_reports"],
  },
  {
    path: ROUTES.productManagementReport,
    permissions: ["view_reports"],
  },
  {
    path: ROUTES.returnsRefundsReport,
    permissions: ["view_reports"],
  },
  {
    path: ROUTES.discountReport,
    permissions: ["view_reports"],
  },

  // Admin Routes - All require admin role
  {
    path: ROUTES.adminDashboard,
    permissions: [],
    isAdminOnly: true,
  },
  {
    path: ROUTES.userManagement,
    permissions: [],
    isAdminOnly: true,
  },
  {
    path: ROUTES.addNewRole,
    permissions: [],
    isAdminOnly: true,
  },
  {
    path: ROUTES.helpPage,
    permissions: [],
    isAdminOnly: true,
  },
  {
    path: ROUTES.vendorpage,
    permissions: [],
    isAdminOnly: true,
  },
  {
    path: ROUTES.history,
    permissions: [],
    isAdminOnly: true,
  },
  {
    path: ROUTES.subplan,
    permissions: [],
    isAdminOnly: true,
  },
  {
    path: ROUTES.changeplan,
    permissions: [],
    isAdminOnly: true,
  },
  {
    path: ROUTES.auditTrail,
    permissions: [],
    isAdminOnly: true,
  },
  {
    path: ROUTES.viewTrail,
    permissions: [],
    isAdminOnly: true,
  },
  {
    path: ROUTES.adminSettings,
    permissions: [],
    isAdminOnly: true,
  },
  {
    path: ROUTES.notificationPage,
    permissions: [],
    isAdminOnly: true,
  },
];

/**
 * Check if a route requires specific permissions
 */
export const getRoutePermissions = (path: string): RoutePermission | undefined => {
  // Handle dynamic routes (with parameters like :id)
  return routePermissions.find((route) => {
    // Exact match
    if (route.path === path) return true;
    
    // Dynamic route match (replace :param with regex)
    const routePattern = route.path.replace(/:[^/]+/g, "[^/]+");
    const regex = new RegExp(`^${routePattern}$`);
    return regex.test(path);
  });
};

/**
 * Check if a path is an admin route
 */
export const isAdminRoute = (path: string): boolean => {
  return path.startsWith("/dashboard/admin");
};

