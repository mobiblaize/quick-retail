# Permission-Based Access Control (PBAC) System

## Overview

This application now implements a comprehensive Permission-Based Access Control (PBAC) system that manages user access to routes, pages, and UI elements based on their permissions and roles.

## Key Features

✅ **Route Protection**: All dashboard routes are protected based on user permissions  
✅ **Admin Role**: Users with the "admin" role have full access to all features  
✅ **Dynamic UI**: Menu items and navigation tabs are filtered based on permissions  
✅ **Unauthorized View**: Clean UI for when users try to access restricted pages  
✅ **Persistent Storage**: Permissions are stored in session storage and persist across page refreshes

---

## How It Works

### 1. **Login & Permission Storage**

When a user logs in, the system:
- Receives user data, roles, and permissions from the API (`apiResponse.data`)
- Stores user information using `setUser()`
- Stores permissions using `setPermissions()`
- Saves data to session storage for persistence

**Modified File**: `src/pages/auth/Login.tsx`

```typescript
const { accessToken, user, permissions } = res.data;
setUser(user);
setPermissions(permissions);
sessionStorage.setItem("permissions", JSON.stringify(permissions || []));
```

### 2. **User Store with Permission Management**

The user store now includes:
- User data with roles
- Permission list
- Helper methods: `hasPermission()`, `isAdmin()`

**Modified File**: `src/hooks/useUserStore.ts`

```typescript
interface UserStore {
  user: User | null;
  permissions: Permission[];
  hasPermission: (permissionName: string) => boolean;
  isAdmin: () => boolean;
}
```

### 3. **Route-to-Permission Mapping**

All routes are mapped to required permissions in a centralized configuration.

**File**: `src/config/routePermissions.ts`

Example:
```typescript
{
  path: ROUTES.productManagement,
  permissions: ["view_products"],
},
{
  path: ROUTES.addNewProduct,
  permissions: ["edit_products"],
},
{
  path: ROUTES.adminDashboard,
  permissions: [],
  isAdminOnly: true,
}
```

### 4. **Protected Route Wrapper**

All routes are wrapped with the `<ProtectedRoute>` component that:
- Checks if the user has required permissions
- Shows the page if authorized
- Shows `<Unauthorized />` view if not authorized

**File**: `src/components/common/ProtectedRoute.tsx`

Usage in App.tsx:
```typescript
<Route 
  path={ROUTES.productManagement} 
  element={<ProtectedRoute><ProductManagementPage /></ProtectedRoute>}
/>

// Admin-only route
<Route 
  path={ROUTES.userManagement} 
  element={<ProtectedRoute adminOnly><UserManagement /></ProtectedRoute>}
/>
```

### 5. **Dynamic Navigation**

#### Dashboard Header
The Admin tab only appears for admin users.

**Modified File**: `src/components/dashboard/layout/dashboardHeader.tsx`

#### Sidebar Menu
Menu items are filtered based on user permissions.

**Modified File**: `src/components/dashboard/layout/dashboardSidebar.tsx`

---

## Permission Names Reference

Based on the API response, here are all available permissions:

### Dashboard
- `view_dashboard` - View Dashboard

### Products
- `view_products` - View Products
- `edit_products` - Manage Products

### Sales
- `view_sales` - View Sales Data
- `edit_sales` - Manage Sales Order

### Inventory
- `view_inventory` - View Inventory
- `edit_inventory` - Manage Inventory

### Categories
- `view_category` - View Categories
- `edit_category` - Manage Categories

### Returns and Refunds
- `view_returns` - View Returns
- `edit_returns` - Log Returns
- `manage_returns` - Resolve or Decline Returns

### Customers
- `view_customers` - View Customers
- `edit_customers` - Manage Customers

### Discounts
- `view_discounts` - View Discounts
- `edit_discounts` - Create Discounts
- `manage_discounts` - Activate/Deactivate Discounts

### Transactions
- `view_transactions` - View Transactions

### Stores
- `view_stores` - View Store
- `edit_stores` - Manage Stores
- `manage_stores` - Activate/Deactivate Stores

### User and Role Management
- `view_users_roles` - View Users and Roles
- `edit_users_roles` - Manage Users and Roles
- `manage_users_roles` - Activate/Deactivate Users and Roles

### Reports
- `view_reports` - View Reports
- `edit_reports` - Manage Reports
- `generate_reports` - Generate Reports

---

## Admin Role

Users with the **"admin"** role:
- Have access to ALL routes and features automatically
- See the "Admin" tab in the dashboard header
- Can access all admin routes:
  - User Management
  - Vendor Profile
  - Audit Trail
  - Help Pages
  - Settings
  - Notifications

The system checks: `user.roles.some(role => role.name === "admin")`

---

## Using Permissions in Your Code

### Check Route Access
```typescript
import { usePermissions } from "../hooks/usePermissions";

const { hasRouteAccess } = usePermissions();

if (hasRouteAccess("/dashboard/products")) {
  // User can access products page
}
```

### Check Specific Permission
```typescript
const { checkPermission, isAdmin } = usePermissions();

if (checkPermission("edit_products")) {
  // Show edit button
}

if (isAdmin) {
  // Show admin-only features
}
```

### Check Multiple Permissions
```typescript
const { hasAnyPermission, hasAllPermissions } = usePermissions();

// User needs ANY of these permissions
if (hasAnyPermission(["view_products", "edit_products"])) {
  // Show products section
}

// User needs ALL of these permissions
if (hasAllPermissions(["view_reports", "generate_reports"])) {
  // Show advanced reporting
}
```

### Protect Components
```typescript
import ProtectedRoute from "../components/common/ProtectedRoute";

// Protect by permission
<ProtectedRoute requiredPermissions={["edit_products"]}>
  <EditProductButton />
</ProtectedRoute>

// Admin only
<ProtectedRoute adminOnly>
  <AdminPanel />
</ProtectedRoute>
```

---

## Files Created/Modified

### New Files
1. `src/config/routePermissions.ts` - Route-to-permission mapping
2. `src/config/menuPermissions.ts` - Menu item permission mapping
3. `src/hooks/usePermissions.ts` - Permission checking hooks
4. `src/components/common/ProtectedRoute.tsx` - Route protection wrapper
5. `src/components/common/Unauthorized.tsx` - Unauthorized access view

### Modified Files
1. `src/hooks/useUserStore.ts` - Added permission management
2. `src/pages/auth/Login.tsx` - Store permissions on login
3. `src/components/dashboard/layout/dashboardHeader.tsx` - Hide admin tab for non-admins
4. `src/components/dashboard/layout/dashboardSidebar.tsx` - Filter menu by permissions
5. `src/App.tsx` - Wrap routes with ProtectedRoute

---

## Testing

### Test as Admin User
1. Login with an admin account
2. Verify all menu items are visible
3. Verify "Admin" tab appears in header
4. Access any route - should all work

### Test as Non-Admin User
1. Login with a user that has limited permissions
2. Verify only authorized menu items appear
3. Verify "Admin" tab is hidden
4. Try to manually navigate to restricted route (e.g., `/dashboard/admin/user-management`)
5. Should see "Access Denied" page

### Test Permission-Based Access
1. Login with a user that has `view_products` but NOT `edit_products`
2. Navigate to product management page - should work
3. Try to access add product page - should show "Access Denied"

---

## Adding New Protected Routes

When adding new routes:

1. **Add route to `routePermissions.ts`**:
```typescript
{
  path: ROUTES.newFeature,
  permissions: ["view_feature", "edit_feature"],
}
```

2. **Wrap route in App.tsx**:
```typescript
<Route 
  path={ROUTES.newFeature} 
  element={<ProtectedRoute><NewFeaturePage /></ProtectedRoute>}
/>
```

3. **Add menu permission if needed** in `menuPermissions.ts`:
```typescript
{
  label: "New Feature",
  permissions: ["view_feature"],
}
```

---

## API Integration Notes

The login API should return:
```json
{
  "data": {
    "user": {
      "roles": [
        {
          "name": "admin",
          "permissions": [...]
        }
      ]
    },
    "permissions": [
      {
        "id": 1,
        "name": "view_dashboard",
        "display_name": "View Dashboard",
        "group": "Dashboard",
        "module": "Point of Sales"
      }
    ]
  }
}
```

The system uses the flat `permissions` array from the root of the response data.

---

## Troubleshooting

### User can't see any menu items
- Check that permissions are being stored correctly in session storage
- Verify the permission names match exactly (case-sensitive)

### Admin user sees "Access Denied"
- Check that the user's role name is exactly "admin" (lowercase)
- Verify `isAdmin()` function is working correctly

### Permissions not persisting after refresh
- Check session storage is working
- Verify the Zustand persist middleware is configured correctly

---

## Security Notes

⚠️ **Important**: This is client-side protection only. Always validate permissions on the server-side as well. Client-side checks improve UX but don't replace server-side security.

---

## Support

For issues or questions about the permission system:
1. Check the browser console for errors
2. Inspect session storage to verify permissions are stored
3. Review the route configuration in `routePermissions.ts`
4. Check the API response structure matches expected format

