import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layout/layout";
import ProductManagementPage from "./pages/pointOfSales/productManagement/productManagementPage";
import SalesProcessingPage from "./pages/pointOfSales/saleProcessing/salesProcessingPage";
import CategoriesPage from "./pages/pointOfSales/categories/categoriesPage";
import StoresPage from "./pages/pointOfSales/stores/storesPage";
import ReportsPage from "./pages/pointOfSales/report/reportsPage";
import CustomerPage from "./pages/pointOfSales/customer/customerPage";
import CreateOrderPage from "./pages/pointOfSales/saleProcessing/createOrderPage";
import { ROUTES } from "./constants/routes";
import AddNewProduct from "./pages/pointOfSales/productManagement/addNewProduct";
import AddBulkProduct from "./pages/pointOfSales/productManagement/addBulkProduct";
import ReturnsPage from "./pages/pointOfSales/returns/returnsPage";
import ViewReturnsPage from "./pages/pointOfSales/returns/viewReturnsPage";
import InventoryManagementPage from "./pages/pointOfSales/inventory/inventoryManagementPage";
import UpdateInventory from "./pages/pointOfSales/inventory/updateInventory";
import TriggerOrder from "./pages/pointOfSales/inventory/triggerOrder";
import TransactionPage from "./pages/pointOfSales/transaction/transactionPage";
import HappyTimePage from "./pages/pointOfSales/happyTime/happyTimePage";
import DiscountAnalysisPage from "./pages/pointOfSales/happyTime/discountAnalysisPage";
import GiftCardPage from "./pages/pointOfSales/happyTime/giftCardPage";
import ReportDateSelect from "./components/dashboard/pointOfSales/reportsPages/reportDateSelect";
import SalesProcessingReportPage from "./pages/pointOfSales/report/salesProcessingReportPage";
import View from "./pages/pointOfSales/stores/view";
import RetunsRefundsReportPage from "./pages/pointOfSales/report/returnsRefundsReportPage";
import StoreTarget from "./pages/pointOfSales/stores/storeTarget";
import SubCategories from "./pages/pointOfSales/categories/subCategories";
import ViewCollection from "./pages/pointOfSales/categories/viewCollection";
import BillingInformation from "./pages/pointOfSales/stores/billingInformation";
import AboutProduct from "./pages/pointOfSales/stores/aboutProduct";
import ViewOrderPage from "./pages/pointOfSales/saleProcessing/viewOrderPage";
import LandingPage from "./pages/landingPage";
import DashboardPage from "./pages/pointOfSales/dashboard/dashboardPage";
import ProductReportPage from "./pages/pointOfSales/report/productReportPage";
import ProcurementDashboard from "./pages/procurement/procurementDashboard/procurementDashboard";
import NewRequestPage from "./pages/procurement/procurementDashboard/newRequestPage";
import CreatedRequestPage from "./pages/procurement/procurementDashboard/createdRequestPage";
import ViewApproveRequestPage from "./pages/procurement/procurementDashboard/viewApproveRequestPage";
import ViewPendingRequestPage from "./pages/procurement/procurementDashboard/viewPendingRequestPage";
import ViewCancelledRequestPage from "./pages/procurement/procurementDashboard/viewCancelledRequestPage";
import PurchaseOrderPage from "./pages/procurement/purchaseOrder/purchaseOrderPage";
import CreatePurchaseOrderPage from "./pages/procurement/purchaseOrder/createPurchaseOrderPage";
import PurchaseInvoicePage from "./pages/procurement/purchaseOrder/purchaseInvoicePage";
import ViewPurchaseOrderInvoicePage from "./pages/procurement/purchaseOrder/viewPurchaseOrder&InvoicePage";
import VendorManagement from "./pages/procurement/vendorManagement/vendorManagement";
import RequestDashboard from "./pages/procurement/requestDashboard/requestDashboard";
import ShipmentsDashboard from "./pages/procurement/shipments/shipmentsDashboard";
import PurchaseReturns from "./pages/procurement/purchaseReturns/purchaseReturns";
import GoodsReceiveNote from "./pages/procurement/goodsReceiveNote/goodsReceiveNote";
import RequestSummaryPage from "./pages/procurement/requestDashboard/requestSummaryPage";
import ViewBudgetPage from "./pages/procurement/requestDashboard/viewBudgetPage";
import PendingNoteDetails from "./pages/procurement/goodsReceiveNote/pendingNoteDetails";
import RejectedNoteDetails from "./pages/procurement/goodsReceiveNote/rejectedNoteDetails";
import ApprovedNoteDetails from "./pages/procurement/goodsReceiveNote/approvedNoteDetails";
import ShipmentSummaryPage from "./pages/procurement/shipments/shipmentSummaryPage";
import CreateShipment from "./pages/procurement/shipments/createShipment";
import ApproveReturnPurchase from "./pages/procurement/purchaseReturns/approveReturnPurchase";
import IssuePurchasePage from "./pages/procurement/purchaseReturns/issuePurchasePage";
import TierTwoVendorDetails from "./pages/procurement/vendorManagement/tierTwoVendorDetails";
import CreateTierOne from "./pages/procurement/vendorManagement/createTierOne";
import CreateTierTwo from "./pages/procurement/vendorManagement/createTierTwo";
import EditVendor from "./pages/procurement/vendorManagement/editVendor";
import TierOneVendorDetails from "./pages/procurement/vendorManagement/tierOneVendorDetails";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
               
                {/* POINT OF SALES ROUTES */}

          <Route index element={<DashboardPage />} />
          <Route
            path={ROUTES.productManagement}
            element={<ProductManagementPage />}
          />
          <Route path={ROUTES.addNewProduct} element={<AddNewProduct />} />
          <Route path={ROUTES.addBulkProduct} element={<AddBulkProduct />} />
          <Route path={ROUTES.sales} element={<SalesProcessingPage />} />
          <Route path={ROUTES.viewOrder} element={<ViewOrderPage />} />
          <Route path={ROUTES.createOrder} element={<CreateOrderPage />} />
          <Route
            path={ROUTES.inventory}
            element={<InventoryManagementPage />}
          />
          <Route path={ROUTES.updateInventory} element={<UpdateInventory />} />
          <Route path={ROUTES.triggerOrder} element={<TriggerOrder />} />
          <Route path={ROUTES.category} element={<CategoriesPage />} />
          <Route path={ROUTES.subCategory} element={<SubCategories />} />
          <Route
            path={ROUTES.categoryCollection}
            element={<ViewCollection />}
          />
          <Route
            path={ROUTES.storeBillingInformation}
            element={<BillingInformation />}
          />
          <Route path={ROUTES.aboutProduct} element={<AboutProduct />} />
          <Route path={ROUTES.returns} element={<ReturnsPage />} />
          <Route path={ROUTES.viewReturns} element={<ViewReturnsPage />} />
          <Route path={ROUTES.customer} element={<CustomerPage />} />
          <Route path={ROUTES.happyTime} element={<HappyTimePage />} />
          <Route
            path={ROUTES.happyDiscountAnalytics}
            element={<DiscountAnalysisPage />}
          />
          <Route path={ROUTES.happyGiftCard} element={<GiftCardPage />} />
          <Route path={ROUTES.transaction} element={<TransactionPage />} />

          <Route path={ROUTES.stores} element={<StoresPage />} />
          <Route path={ROUTES.viewStore} element={<View />} />
          <Route path={ROUTES.storeTarget} element={<StoreTarget />} />
          <Route path={ROUTES.report} element={<ReportsPage />} />
          <Route
            path={ROUTES.reportDateSelect}
            element={<ReportDateSelect />}
          />
          <Route
            path={ROUTES.salesProcessing}
            element={<SalesProcessingReportPage />}
          />
          <Route
            path={ROUTES.productManagementReport}
            element={<ProductReportPage />}
          />
          <Route
            path={ROUTES.returnsRefundsReport}
            element={<RetunsRefundsReportPage />}
          />

            {/* PROCUREMENT ROUTES */}

            <Route path={ROUTES.procurementDashboard} element={<ProcurementDashboard />} />
            <Route path={ROUTES.newRequest} element={<NewRequestPage />} />
            <Route path={ROUTES.createdRequest} element={<CreatedRequestPage />} />
            <Route path={ROUTES.viewApproveRequest} element={<ViewApproveRequestPage />} />
            <Route path={ROUTES.viewPendingRequest} element={<ViewPendingRequestPage />} />
            <Route path={ROUTES.viewCancelledRequest} element={<ViewCancelledRequestPage />} />
            <Route path={ROUTES.purchaseOrder} element={<PurchaseOrderPage />} />
            <Route path={ROUTES.createPurchaseOrder} element={<CreatePurchaseOrderPage />} />
            <Route path={ROUTES.purchaseInvoicePage} element={<PurchaseInvoicePage />} />
            <Route path={ROUTES.viewPurchaseOrderInvoicePage} element={<ViewPurchaseOrderInvoicePage />} />
            <Route path={ROUTES.vendorManagement} element={<VendorManagement />} />
            <Route path={ROUTES.tierOneVendors} element={<TierOneVendorDetails/>} />
            <Route path={ROUTES.tierTwoVendors} element={<TierTwoVendorDetails/>} />
            <Route path={ROUTES.createTierOne} element={<CreateTierOne/>} />
            <Route path={ROUTES.createTierTwo} element={<CreateTierTwo/>} />
            <Route path={ROUTES.editVendor} element={<EditVendor/>} />
            <Route path={ROUTES.requestDashboard} element={<RequestDashboard />} />
            <Route path={ROUTES.requestSummaryPage} element={<RequestSummaryPage />} />
            <Route path={ROUTES.viewBudgetPage} element={<ViewBudgetPage />} />
            <Route path={ROUTES.shipments} element={<ShipmentsDashboard />} />
            <Route path={ROUTES.shipmentsSummary} element={<ShipmentSummaryPage/>} />
            <Route path={ROUTES.createShipment} element={<CreateShipment/>} />
            <Route path={ROUTES.purchaseReturns} element={<PurchaseReturns />} />
            <Route path={ROUTES.approveReturns} element={<ApproveReturnPurchase />} />
            <Route path={ROUTES.issuePurchase} element={<IssuePurchasePage />} />
            <Route path={ROUTES.goodsReceived} element={<GoodsReceiveNote />} />
            <Route path={ROUTES.pendingNoteDetails} element={<PendingNoteDetails />} />
            <Route path={ROUTES.rejectedNoteDetails} element={<RejectedNoteDetails />} />
            <Route path={ROUTES.approvedNoteDetails} element={<ApprovedNoteDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}
