import React from "react";
import {
  InActiveDashboardIcon,
  ActiveDashboardIcon,
  InActiveProductIcon,
  ActiveProductIcon,
  InActiveSalesIcon,
  ActiveSalesIcon,
  InActiveInventory,
  ActiveInventory,
  InActiveCategory,
  ActiveCategory,
  InActiveReturns,
  ActiveReturns,
  InActiveHappyTime,
  ActiveHappyTime,
  InActiveCustomer,
  ActiveCustomer,
  InActiveTransaction,
  ActiveTransaction,
  InActiveStores,
  ActiveStores,
  InActiveReport,
  ActiveReport,
  Logout,
} from "../assets/svg";
import { ROUTES } from "../constants/routes";

interface NavItem {
  label: string;
  href: string;
  inactiveIcon?: React.ElementType;
  activeIcon?: React.ElementType;
  hasChildren?: boolean;
  children?: { label: string; href: string }[];
}
export const PointOfSale: NavItem[] = [
  {
    label: "Dashboard",
    href: ROUTES.dashboard,
    inactiveIcon: InActiveDashboardIcon,
    activeIcon: ActiveDashboardIcon,
  },
  {
    label: "Product Management",
    href: ROUTES.productManagement,
    inactiveIcon: InActiveProductIcon,
    activeIcon: ActiveProductIcon,
  },
  {
    label: "Sale Processing",
    href: ROUTES.sales,
    inactiveIcon: InActiveSalesIcon,
    activeIcon: ActiveSalesIcon,
  },
  {
    label: "Categories",
    href: ROUTES.category,
    inactiveIcon: InActiveCategory,
    activeIcon: ActiveCategory,
  },
  {
    label: "Inventory",
    href: ROUTES.inventory,
    inactiveIcon: InActiveInventory,
    activeIcon: ActiveInventory,
  },
  {
    label: "Returns and Refunds",
    href: ROUTES.returns,
    inactiveIcon: InActiveReturns,
    activeIcon: ActiveReturns,
  },
  {
    label: "Customer",
    href: ROUTES.customer,
    inactiveIcon: InActiveCustomer,
    activeIcon: ActiveCustomer,
  },
  {
    label: "Happy Time",
    href: ROUTES.happyTime,
    inactiveIcon: InActiveHappyTime,
    activeIcon: ActiveHappyTime,
    hasChildren: true,
    children: [
      { label: "Discounts", href: `${ROUTES.happyTime}` },
      { label: "Gift cards", href: `${ROUTES.happyGiftCard}` },
    ],
  },
  {
    label: "Transaction",
    href: ROUTES.transaction,
    inactiveIcon: InActiveTransaction,
    activeIcon: ActiveTransaction,
  },
  {
    label: "Stores",
    href: ROUTES.stores,
    inactiveIcon: InActiveStores,
    activeIcon: ActiveStores,
  },
  {
    label: "Report",
    href: ROUTES.report,
    inactiveIcon: InActiveReport,
    activeIcon: ActiveReport,
  },
];

export const FinancialManagement: NavItem[] = [
  {
    label: "Dashboard",
    href: ROUTES.dashboard,
    inactiveIcon: InActiveDashboardIcon,
    activeIcon: ActiveDashboardIcon,
  },
  {
    label: "Customer",
    href: ROUTES.productManagement,
    inactiveIcon: InActiveReturns,
    activeIcon: ActiveReturns,
  },
];

export const Reports: NavItem[] = [
  {
    label: "Customer",
    href: ROUTES.test,
    inactiveIcon: InActiveReturns,
    activeIcon: ActiveReturns,
  },
];

export const Admin: NavItem[] = [
  {
    label: "Customer",
    href: ROUTES.test,
    inactiveIcon: InActiveReturns,
    activeIcon: ActiveReturns,
  },
];

export const otherMenu = [
  { label: "Log Out", href: ROUTES.test, icon: Logout },
];
