# Smart Post-Login Redirect System

## Overview

The application now implements an intelligent post-login redirect system that automatically routes users to the first page they have access to based on their permissions, rather than blindly redirecting everyone to the dashboard.

---

## How It Works

### Login Flow

1. **User logs in** → API returns user data, roles, and permissions
2. **System stores** user data and permissions
3. **Smart redirect logic** determines the best landing page:
   - Checks menu items in priority order
   - Finds the first route the user has permission to access
   - Redirects to that route
   - Falls back to dashboard if no specific permissions found
4. **ProtectedRoute** handles final authorization check

### Priority Order

The system checks routes in this order:

1. Dashboard (`/dashboard`)
2. Products (`/dashboard/product-management`)
3. Sales (`/dashboard/sales`)
4. Inventory (`/dashboard/inventory`)
5. Categories (`/dashboard/categories`)
6. Returns (`/dashboard/returns`)
7. Customers (`/dashboard/customer`)
8. Discounts (`/dashboard/happy-time`)
9. Transactions (`/dashboard/transaction`)
10. Stores (`/dashboard/stores/store_target`)
11. Reports (`/dashboard/reports`)

**Fallback**: If no accessible routes found → Dashboard (ProtectedRoute will show "Access Denied" if needed)

---

## Implementation Details

### New File: `src/utils/routeUtils.ts`

This utility file contains:

#### `getFirstAccessibleRoute(permissions, roles)`
Main function that determines the redirect route.

**Parameters:**
- `permissions: Permission[]` - User's permission list
- `roles: Array<{ name: string }>` - User's roles

**Returns:** `string` - The first accessible route path

**Logic:**
```typescript
// Admin users → Dashboard (they have access to everything)
if (isAdmin) return ROUTES.dashboard;

// Check each route in priority order
for (const route of MENU_ROUTES_PRIORITY) {
  if (hasAccessToRoute(route.path, permissions, isAdmin)) {
    return route.path; // First match!
  }
}

// Fallback
return ROUTES.dashboard;
```

#### `hasAccessToRoute(path, permissions, isAdmin)`
Helper function to check if user can access a specific route.

**Logic:**
- Admin users → `true` (always)
- Checks route configuration from `routePermissions.ts`
- Verifies user has at least one required permission
- Returns `true` if accessible, `false` otherwise

---

## Updated Login Component

### Changes in `src/pages/auth/Login.tsx`

**Before:**
```typescript
// Always redirect to dashboard
window.location.replace("/dashboard");
```

**After:**
```typescript
// Smart redirect: Find the first accessible route
const firstAccessibleRoute = getFirstAccessibleRoute(
  permissions || [],
  user.roles || []
);

console.log("Redirecting to:", firstAccessibleRoute);
window.location.replace(firstAccessibleRoute);
```

---

## Test Scenarios

### Scenario 1: Admin User
**Given:** User with admin role  
**Expected:** Redirected to `/dashboard`  
**Reason:** Admin users have access to everything, dashboard is default

### Scenario 2: User with Only Product Permissions
**Given:** User with `view_products` permission  
**When:** User does NOT have `view_dashboard` permission  
**Expected:** Redirected to `/dashboard/product-management`  
**Reason:** First accessible route in priority list

### Scenario 3: User with Only Sales Permissions
**Given:** User with `view_sales` permission  
**When:** User does NOT have `view_dashboard` or `view_products`  
**Expected:** Redirected to `/dashboard/sales`  
**Reason:** First accessible route in priority list

### Scenario 4: User with Multiple Permissions
**Given:** User with `view_inventory`, `view_customers`, `view_reports`  
**When:** User does NOT have `view_dashboard`, `view_products`, `view_sales`, `view_category`, `view_returns`  
**Expected:** Redirected to `/dashboard/inventory`  
**Reason:** First accessible route in priority list (inventory comes before customers and reports)

### Scenario 5: User with Dashboard Permission
**Given:** User with `view_dashboard` permission  
**Expected:** Redirected to `/dashboard`  
**Reason:** Dashboard is first in priority list

### Scenario 6: User with No Permissions (Edge Case)
**Given:** User with empty permissions array  
**Expected:** Redirected to `/dashboard`  
**Reason:** Fallback behavior, ProtectedRoute will show "Access Denied"

### Scenario 7: User with Only Report Permissions
**Given:** User with only `view_reports` permission  
**When:** User does NOT have access to any other pages  
**Expected:** Redirected to `/dashboard/reports`  
**Reason:** First (and only) accessible route

---

## Benefits

### Better User Experience
✅ Users land on a page they can actually use  
✅ No confusion from seeing "Access Denied" immediately after login  
✅ More intuitive navigation flow

### Logical Priority
✅ Dashboard first (main overview)  
✅ Core functions next (Products, Sales)  
✅ Support functions later (Reports, Settings)

### Graceful Fallback
✅ If something goes wrong, redirects to dashboard  
✅ ProtectedRoute provides final authorization check  
✅ User sees appropriate "Access Denied" message

### Admin Convenience
✅ Admin users always go to dashboard  
✅ Can access everything from there  
✅ Consistent admin experience

---

## Customization

### Change Priority Order

Edit `MENU_ROUTES_PRIORITY` in `src/utils/routeUtils.ts`:

```typescript
const MENU_ROUTES_PRIORITY = [
  { path: ROUTES.sales, label: "Sales" },        // Now first!
  { path: ROUTES.dashboard, label: "Dashboard" }, // Now second
  { path: ROUTES.productManagement, label: "Products" },
  // ... rest of items
];
```

### Change Admin Landing Page

Option 1: Keep dashboard as default (current)
```typescript
if (isAdmin) return ROUTES.dashboard;
```

Option 2: Redirect admins to admin section
```typescript
if (isAdmin) return ROUTES.vendorpage; // or any admin route
```

### Add Special Handling

```typescript
export const getFirstAccessibleRoute = (
  permissions: Permission[],
  roles: Array<{ name: string }> = []
): string => {
  const isAdmin = roles.some((role) => role.name === "admin");

  // Custom: Super admins go to admin page
  if (roles.some((role) => role.name === "super_admin")) {
    return ROUTES.adminDashboard;
  }

  // Custom: Sales role goes directly to sales
  if (roles.some((role) => role.name === "sales")) {
    return ROUTES.sales;
  }

  // Rest of logic...
};
```

---

## Console Logging

For debugging, a console log has been added:

```typescript
console.log("Redirecting to:", firstAccessibleRoute);
```

You can see in the browser console where each user is being redirected. Remove this in production if desired.

---

## Edge Cases Handled

1. **Empty permissions array** → Fallback to dashboard
2. **User with no accessible routes** → Fallback to dashboard, ProtectedRoute shows denial
3. **Admin with no permissions** → Admin role overrides, full access
4. **Undefined/null permissions** → Defaults to empty array, fallback behavior
5. **Route not in configuration** → Considered accessible (ProtectedRoute handles it)

---

## Files Modified

1. **New File**: `src/utils/routeUtils.ts` - Smart redirect logic
2. **Updated**: `src/pages/auth/Login.tsx` - Uses smart redirect

---

## Example User Journeys

### Journey 1: Product Manager
```
Permissions: view_products, edit_products
Login → Check permissions → "Products" is accessible
Result: Redirected to /dashboard/product-management ✅
```

### Journey 2: Sales Rep
```
Permissions: view_sales, edit_sales, view_customers
Login → Check permissions → "Dashboard" not accessible
        → "Products" not accessible → "Sales" is accessible
Result: Redirected to /dashboard/sales ✅
```

### Journey 3: Store Manager
```
Permissions: view_stores, edit_stores, view_inventory, view_reports
Login → Check permissions → First 5 routes not accessible
        → "Inventory" is accessible
Result: Redirected to /dashboard/inventory ✅
```

### Journey 4: Admin
```
Role: admin
Login → Detect admin role
Result: Redirected to /dashboard (has access to everything) ✅
```

### Journey 5: Restricted User
```
Permissions: [] (empty)
Login → Check all routes → None accessible
Result: Redirected to /dashboard (fallback)
        → ProtectedRoute shows "Access Denied" ✅
```

---

## Testing in Development

### Manual Testing

1. **Test with admin:**
   - Login as admin
   - Should redirect to `/dashboard`
   - Check console: "Redirecting to: /dashboard"

2. **Test with limited user:**
   - Login with user that has only `view_sales`
   - Should redirect to `/dashboard/sales`
   - Check console: "Redirecting to: /dashboard/sales"

3. **Test with no permissions:**
   - Login with user that has empty permissions
   - Should redirect to `/dashboard`
   - Should see "Access Denied" page
   - Check console: "Redirecting to: /dashboard"

### Check Console

Look for the log message:
```
Redirecting to: /dashboard/product-management
```

This confirms which route was chosen.

---

## Production Considerations

### Remove Console Logs

Before deploying, optionally remove:
```typescript
console.log("Redirecting to:", firstAccessibleRoute);
```

### Performance

The redirect logic is O(n) where n is the number of menu items (11 items).
This is negligible and runs once at login.

### Caching

The route check uses the existing permission configuration, no additional API calls needed.

---

## Summary

✅ **Smart redirect implemented**  
✅ **Priority-based route selection**  
✅ **Admin users handled appropriately**  
✅ **Graceful fallback to dashboard**  
✅ **ProtectedRoute provides final check**  
✅ **Fully customizable priority order**

Users now land on the first page they can actually use, providing a much better user experience! 🚀

