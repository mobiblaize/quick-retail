import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/pointOfSales/landingPage";
import DashboardLayout from "./layout/layout";
import ProductManagementPage from "./pages/pointOfSales/productManagementPage";
import SalesProcessingPage from "./pages/pointOfSales/saleProcessing/salesProcessingPage";
import CategoriesPage from "./pages/pointOfSales/categories/categoriesPage";
import StoresPage from "./pages/pointOfSales/stores/storesPage";
import ReportsPage from "./pages/pointOfSales/reportsPage";
import CustomerPage from "./pages/pointOfSales/customerPage";
import DashboardPage from "./pages/pointOfSales/dashboardPage";
import CreateOrderPage from "./pages/pointOfSales/saleProcessing/createOrderPage";
import { ROUTES } from "./constants/routes";
import AddNewProduct from "./pages/pointOfSales/addNewProduct";
import AddBulkProduct from "./pages/pointOfSales/addBulkProduct";
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
import SalesProcessingReportPage from "./pages/pointOfSales/salesProcessingReportPage";
import ProductReportPage from "./pages/pointOfSales/productReportPage";
import View from "./pages/pointOfSales/stores/view";
import RetunsRefundsReportPage from "./pages/pointOfSales/returnsRefundsReportPage";
import StoreTarget from "./pages/pointOfSales/stores/storeTarget";
import SubCategories from "./pages/pointOfSales/categories/subCategories";
import ViewCollection from "./pages/pointOfSales/categories/viewCollection";
import BillingInformation from "./pages/pointOfSales/stores/billingInformation";
import AboutProduct from "./pages/pointOfSales/stores/aboutProduct";
import ViewOrderPage from "./pages/pointOfSales/saleProcessing/viewOrderPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route
            path={ROUTES.productManagement}
            element={<ProductManagementPage />}
          />
          <Route path={ROUTES.addNewProduct} element={<AddNewProduct />} />
          <Route path={ROUTES.addBulkProduct} element={<AddBulkProduct />} />
          <Route path={ROUTES.sales} element={<SalesProcessingPage />} />
          <Route path={ROUTES.viewOrder} element={<ViewOrderPage />} />
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
        </Route>
      </Routes>
    </Router>
  );
}
