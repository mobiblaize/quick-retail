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
  Settings,
  NotificationIcon,
  InActivePurchaseOrderIcon,
  InActiveVendorManagementIcon,
  InActiveShipmentIcon,
  procurementInActiveIcon,
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
    href: ROUTES.storeTarget,
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
    href: ROUTES.financialDashboard,
    inactiveIcon: InActiveDashboardIcon,
    activeIcon: ActiveDashboardIcon,
  },
  {
    label: "Sales Management",
    href: ROUTES.customerPage,
    inactiveIcon: InActiveReturns,
    activeIcon: ActiveReturns,
    hasChildren: true,
    children: [
      { label: "Customer", href: `${ROUTES.customerPage}` },
      { label: "Receipt", href: `${ROUTES.createReceipt}` },
      { label: "Receipt Allocation", href: `${ROUTES.generateReport}` },
      { label: "Sales Invoice", href: `${ROUTES.invoiceOverview}` },
      { label: "Sales Returns", href: `${ROUTES.orderReceipt}` },
      { label: "Credit Note", href: `${ROUTES.issueCreditNote}` },
    ],
  },
  {
    label: "Purchase",
    href: ROUTES.selectVendor,
    inactiveIcon: InActivePurchaseOrderIcon,
    activeIcon: ActiveProductIcon,
    hasChildren: true,
    children: [
      { label: "Vendor", href: `${ROUTES.selectVendor}` },
      { label: "Purchase Order", href: `${ROUTES.allPurchaseOrder}` },
      { label: "Purchase Invoice", href: `${ROUTES.allPurchaseInvoice}` },
      { label: "Non-inventory Purchase", href: `${ROUTES.nonInventory}` },
      { label: "Remittance Advice", href: `${ROUTES.createRemittance}` },
      { label: "Purchase Returns", href: `${ROUTES.allPurchaseReturns}` },
      { label: "Debit Note", href: `${ROUTES.allDebitNote}` },
      { label: "Add New Payment", href: `${ROUTES.addPayment}` },
    ],
  },
  {
    label: "Inventory",
    href: ROUTES.inventoryWarehouse,
    inactiveIcon: InActiveDashboardIcon,
    activeIcon: ActiveDashboardIcon,
  },
  {
    label: "Banking",
    href: ROUTES.selectVendor,
    inactiveIcon: InActivePurchaseOrderIcon,
    activeIcon: ActiveProductIcon,
    hasChildren: true,
    children: [
      { label: "Card", href: `${ROUTES.addCard}` },
      { label: "Bank", href: `${ROUTES.addBank}` },
      { label: "Transactions", href: `${ROUTES.allPurchaseOrder}` },
      { label: "Transfer", href: `${ROUTES.allPurchaseInvoice}` },
      { label: "Account Reconciliation", href: `${ROUTES.createRemittance}` },
      
    ],
  },
  {
    label: "Accounting",
    href: ROUTES.accountChart,
    inactiveIcon: InActiveDashboardIcon,
    activeIcon: ActiveDashboardIcon,
    hasChildren: true,
    children: [
      { label: "Chart of Account", href: `${ROUTES.accountChart}` },
      { label: "Journal Entry", href: `${ROUTES.allJournal}` },
    ],
  },
  {
    label: "Payment",
    href: ROUTES.initiatePayment,
    inactiveIcon: InActiveDashboardIcon,
    activeIcon: ActiveDashboardIcon,
  },
];

export const Procurement: NavItem[] = [
  {
    label: "Dashboard",
    href: ROUTES.procurementDashboard,
    inactiveIcon: InActiveDashboardIcon,
    activeIcon: ActiveDashboardIcon,
  },
  {
    label: "Purchase Orders",
    href: ROUTES.purchaseOrder,
    inactiveIcon: InActivePurchaseOrderIcon,
    activeIcon: ActiveProductIcon,
  },
  {
    label: "Vendor Management",
    href: ROUTES.vendorManagement,
    inactiveIcon: InActiveVendorManagementIcon,
    activeIcon: InActiveVendorManagementIcon,
  },
  {
    label: "Requests",
    href: ROUTES.requestDashboard,
    inactiveIcon: InActiveInventory,
    activeIcon: ActiveInventory,
  },
  {
    label: "Shipments",
    href: ROUTES.shipments,
    inactiveIcon: InActiveShipmentIcon,
    activeIcon: InActiveShipmentIcon,
  },
  {
    label: "Purchase Returns",
    href: ROUTES.purchaseReturns,
    inactiveIcon: InActiveReturns,
    activeIcon: ActiveReturns,
  },
  {
    label: "Goods Receive Note (G.R.N)",
    href: ROUTES.goodsReceived,
    inactiveIcon: InActiveCustomer,
    activeIcon: ActiveCustomer,
  },
];

export const AssetManagement: NavItem[] = [
  {
    label: "Dashboard",
    href: ROUTES.assetDashboard,
    inactiveIcon: InActiveDashboardIcon,
    activeIcon: ActiveDashboardIcon,
  },
  {
    label: "Asset Request",
    href: ROUTES.assetRequestPage,
    inactiveIcon: InActiveProductIcon,
    activeIcon: ActiveProductIcon,
  },
  {
    label: "Asset Register",
    href: ROUTES.assetRegisterPage,
    inactiveIcon: InActiveVendorManagementIcon,
    activeIcon: InActiveVendorManagementIcon,
  },
  {
    label: "Depreciation",
    href: ROUTES.depreciationPage,
    inactiveIcon: InActiveInventory,
    activeIcon: ActiveInventory,
  },
  {
    label: "Procurement",
    href: ROUTES.procurementPage,
    inactiveIcon: procurementInActiveIcon,
    activeIcon: procurementInActiveIcon,
  },
  {
    label: "Report",
    href: ROUTES.reportPage,
    inactiveIcon: InActiveDashboardIcon,
    activeIcon: ActiveDashboardIcon,
  },
  {
    label: "Setting",
    href: ROUTES.settingPage,
    inactiveIcon: Settings,
    activeIcon: Settings,
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

export const mobileOtherMenu = [
  { label: "Norification", href: ROUTES.test, icon: NotificationIcon },
  { label: "Settings", icon: Settings, href: ROUTES.test },
];
