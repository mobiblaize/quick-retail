import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Navigate,
} from "react-router-dom";
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
import AssetDashboard from "./pages/assetManagement/assetDashboard/assetDashboard";
import SummaryPage from "./pages/assetManagement/assetDashboard/summaryPage";
import AssetRequestPage from "./pages/assetManagement/assetRequest/assetRequestPage";
import AssetRegisterPage from "./pages/assetManagement/assetRegister/assetRegisterPage";
import DepreciationPage from "./pages/assetManagement/depreciation/depreciationPage";
import ProcurementPage from "./pages/assetManagement/procurement/procurementPage";
import ReportPage from "./pages/assetManagement/report/reportPage";
import SettingPage from "./pages/assetManagement/settingPage/settingPage";
import AddNewAsset from "./pages/assetManagement/assetRegister/addNewAsset";
import ViewAssetState from "./pages/assetManagement/assetRegister/viewAssetState";
import ViewDepreciationState from "./pages/assetManagement/depreciation/viewDepreciationState";
import AddNewDepreciation from "./pages/assetManagement/depreciation/addNewDepreciation";
import ViewProcurementState from "./pages/assetManagement/procurement/viewProcurementState";
import CreateProcurementRequest from "./pages/assetManagement/procurement/createProcurementRequest";
import AssetRequestDetails from "./pages/assetManagement/assetRequest/assetRequestDetails";
import FinancialDashboard from "./pages/financialManagement/financialDashboard/dashboardPage";
import SalesManagement from "./pages/financialManagement/financialDashboard/salesManagement";
import CustomerSalesPage from "./pages/financialManagement/SalesManagement/customer/customerPage";
import ViewCustomer from "./components/finacialManagement/salesManagement/customer/viewCustomer";
import CustomerViewLayout from "./components/finacialManagement/salesManagement/customer/customerViewLayout";
import CustomerOrderPage from "./pages/financialManagement/SalesManagement/customer/customerOrder";
import ReturnedItemPage from "./pages/financialManagement/SalesManagement/customer/returnedItem";
import ViewOrder from "./pages/financialManagement/SalesManagement/customer/viewOrderReceipt";
import PaymentMethodPage from "./pages/financialManagement/SalesManagement/customer/paymentMethod";
import CreateReceiptPage from "./pages/financialManagement/SalesManagement/Receipt/createReceipt";
import ConfirmReceiptPage from "./pages/financialManagement/SalesManagement/Receipt/confirmReceipt";
import InvoiceOverview from "./pages/financialManagement/SalesManagement/SalesInvoice/invoiceOverview";
import CreateInvoicePage from "./pages/financialManagement/SalesManagement/SalesInvoice/createInvoice";
import PreviewInvoicePage from "./pages/financialManagement/SalesManagement/SalesInvoice/previewInvoice";
import AttachInvoicePage from "./pages/financialManagement/SalesManagement/SalesInvoice/attachReceipient";
import AttachReceiptPage from "./pages/financialManagement/SalesManagement/Receipt/attachReceipent";
import PreviewReceiptPage from "./pages/financialManagement/SalesManagement/Receipt/previewReceipt";
import AllReceiptPage from "./pages/financialManagement/SalesManagement/Receipt/allReceiptsView";
import ShareReceiptPage from "./pages/financialManagement/SalesManagement/Receipt/shareReceipt";
import ViewReceiptPage from "./pages/financialManagement/SalesManagement/Receipt/viewReceipt";
import GenerateReportPage from "./pages/financialManagement/SalesManagement/ReceiptAllocation/generateReport";
import AllocateReceiptPage from "./pages/financialManagement/SalesManagement/ReceiptAllocation/allocateReceipt";
import PartiallyPaidReceiptPage from "./pages/financialManagement/SalesManagement/ReceiptAllocation/partialPaidReceipt";
import AdvancedPaidPage from "./pages/financialManagement/SalesManagement/ReceiptAllocation/advancedPaid";
import FilledPartiallyPaidReceiptPage from "./pages/financialManagement/SalesManagement/ReceiptAllocation/filledPartialPaid";
import FilledAdvancedPaidPage from "./pages/financialManagement/SalesManagement/ReceiptAllocation/filledAdvanvcedPaid";
import OrderReceiptPage from "./pages/financialManagement/SalesManagement/SalesReturn/orderReceipt";
import InStorePage from "./pages/financialManagement/SalesManagement/SalesReturn/instoreOverview";
import FinancePage from "./pages/financialManagement/SalesManagement/SalesReturn/financeOverview";
import ViewSalesReturnsPage from "./pages/financialManagement/SalesManagement/SalesReturn/view";
import IssueCreditNotePage from "./pages/financialManagement/SalesManagement/CreditNote/issueCreditNote";
import CreditNotePage from "./pages/financialManagement/SalesManagement/CreditNote/creditNote";
import CreditNotePage2 from "./pages/financialManagement/SalesManagement/CreditNote/creditNote2";
import ViewCreditNotePage from "./pages/financialManagement/SalesManagement/CreditNote/view";
import ViewCreditNoteReceiptPage from "./pages/financialManagement/SalesManagement/CreditNote/view2";
import CreateMobileReceiptPage from "./pages/financialManagement/SalesManagement/Receipt/mobileReceipt";
import SelectVendorPage from "./pages/financialManagement/Purchase/Vendor/selectVendor";
import UnsettledVendorsPage from "./pages/financialManagement/Purchase/Vendor/unsettledVendors";
import UnallocatedPaymentPage from "./pages/financialManagement/Purchase/Vendor/unallocatedPayment";
import FilledUnallocatedPaymentPage from "./pages/financialManagement/Purchase/Vendor/filleunallocatedVendor";
import FilledUnsettledVendorsPage from "./pages/financialManagement/Purchase/Vendor/filledUnsettledVendor";
import AllPurchaseOverviewPage from "./pages/financialManagement/Purchase/PurchaseInvoice/allPurchaseInvoice";
import NonInventoryOverviewPage from "./pages/financialManagement/Purchase/NonInventory/nonInventory";
import ViewPurchaseInvoicePage from "./pages/financialManagement/Purchase/PurchaseInvoice/viewPurchaseInvoice";
import PurchaseHistoryPage from "./pages/financialManagement/Purchase/PurchaseInvoice/versionHistory";
import ConvertGrnToInvoicePage from "./pages/financialManagement/Purchase/PurchaseInvoice/convertInvoice";
import NoFinancialPurchaseInvoicePage from "./pages/financialManagement/Purchase/PurchaseInvoice/noFinancialImplication";
import ViewReceiptPages from "./pages/financialManagement/Purchase/PurchaseInvoice/viewReceipt";
import AllNonInventoryPage from "./pages/financialManagement/Purchase/NonInventory/allNonInventoryInvoice";
import ViewNonInventoryPage from "./pages/financialManagement/Purchase/NonInventory/viewNonInventory";
import ViewNonInventoryPage2 from "./pages/financialManagement/Purchase/NonInventory/viewNonInventory2";
import AllPurchaseReturnsOverviewPage from "./pages/financialManagement/Purchase/PurchaseReturn/allPurchaseReturns";
import ViewPurchaseReturnPage from "./pages/financialManagement/Purchase/PurchaseReturn/viewPurchaseReturn";
import AllDebitNoteOverviewPage from "./pages/financialManagement/Purchase/DebitNote/allDebitNote";
import ViewDebitNotePage from "./pages/financialManagement/Purchase/DebitNote/viewDebitNote";
import PreviewDebitPage from "./pages/financialManagement/Purchase/DebitNote/previewDebitPage";
import SendDebitPage from "./pages/financialManagement/Purchase/DebitNote/sendBebitNote";
import CreateRemittancePage from "./pages/financialManagement/Purchase/RemittanceAdvice/createRemittance";
import SingleRemittancePage from "./pages/financialManagement/Purchase/RemittanceAdvice/singleInvoice";
import AttachRemittancePage from "./pages/financialManagement/Purchase/RemittanceAdvice/attachReceipt";
import PreviewRemittancePage from "./pages/financialManagement/Purchase/RemittanceAdvice/previewRemittance";
import EditRemittancePage from "./pages/financialManagement/Purchase/RemittanceAdvice/editRemittance";
import AllRemittancePage from "./pages/financialManagement/Purchase/RemittanceAdvice/allRemittances";
import ViewRemittancePage from "./pages/financialManagement/Purchase/RemittanceAdvice/viewRemttance";
import AllocateRemittancePage from "./pages/financialManagement/Purchase/RemittanceAdvice/AllocateRemittance/vendorSearch";
import MatchRemittancePage from "./pages/financialManagement/Purchase/RemittanceAdvice/AllocateRemittance/allocateRemittance";
import PartiallyPaidPage from "./pages/financialManagement/Purchase/RemittanceAdvice/AllocateRemittance/partiallyPaid";
import AdvancedPaymentPage from "./pages/financialManagement/Purchase/RemittanceAdvice/AllocateRemittance/advancedAllocation";
import FilledPartiallyPaidPage from "./pages/financialManagement/Purchase/RemittanceAdvice/AllocateRemittance/filledPartialyPaid";
import FilledAdvancedRemittancePage from "./pages/financialManagement/Purchase/RemittanceAdvice/AllocateRemittance/filledAdvancedPayment";
import MultipleRemittancePage from "./pages/financialManagement/Purchase/RemittanceAdvice/multipleInvoice";
import AllPurchaseOrderOverviewPage from "./pages/financialManagement/Purchase/PurchaseOrder/allPurchaseOrder";
import ViewPurchaseOrderPage from "./pages/financialManagement/Purchase/PurchaseOrder/viewPurchaseOrder";
import PreviewPurchaseOrderPage from "./pages/financialManagement/Purchase/PurchaseOrder/previewPurchaseOrder";
import PurchaseOrderHistoryPage from "./pages/financialManagement/Purchase/PurchaseOrder/versionOrderHistory";
import AllVendorPage from "./pages/financialManagement/Purchase/Vendor/allVendors";
import VendorOverviewPage from "./pages/financialManagement/Purchase/Vendor/vendorDetails";
import AddPaymentPage from "./pages/financialManagement/Purchase/AddPayment/AddPayment";
import SelectVendorPaymentPage from "./pages/financialManagement/Purchase/AddPayment/addPayment2";
import SettleVendorPage from "./pages/financialManagement/Purchase/AddPayment/settleVendor";
import InventoryWarehousePage from "./pages/financialManagement/Inventory/allWarehouse";
import InventoryWarehouseDetailsPage from "./pages/financialManagement/Inventory/warehouseDetails";
import InventoryStoresPage from "./pages/financialManagement/Inventory/stores";
import InventoryPage from "./pages/financialManagement/Inventory/inventory";
import InventoryStoresPage2 from "./pages/financialManagement/Inventory/stores2";
import ViewStore from "./pages/financialManagement/Inventory/store3view";
import PaymentViewLayout from "./components/finacialManagement/payment/PaymentViewLayout";
import Payment from "./components/finacialManagement/payment/initiatePayment";
import SelectProcessorPage from "./pages/financialManagement/Payment/selectProcessor";
import SelectProcessorPage2 from "./pages/financialManagement/Payment/selectProcessor2";
import MakePaymentPage from "./pages/financialManagement/Payment/makePayment";
import PaymentReceiptPage from "./pages/financialManagement/Payment/paymentReceipt";
import AllPaymentOverviewPage from "./pages/financialManagement/Payment/allPayments";
import ViewPaymentPage from "./pages/financialManagement/Payment/viewAllPayment";
import AccountChartPage from "./pages/financialManagement/Accounting/accountChart";
import ViewAccountChartPage from "./pages/financialManagement/Accounting/viewAccount";
import CreateAccountChartPage from "./pages/financialManagement/Accounting/createAccount";
import ImportAccountChartTable from "./pages/financialManagement/Accounting/importChartTable";
import ImportAccountChartPage from "./pages/financialManagement/Accounting/importChart";
import EditAccountChartPage from "./pages/financialManagement/Accounting/editAccount";
import AllJournalPage from "./pages/financialManagement/Accounting/allJournal";
import CreateJournalPage from "./pages/financialManagement/Accounting/createJournal1";
import ViewJournalPage from "./pages/financialManagement/Accounting/viewJournal";
import ImportJournalTablePage from "./pages/financialManagement/Accounting/importJournal";
import ReviewJournalPage from "./pages/financialManagement/Accounting/reviewJournal";


import Login from "./pages/auth/Login";
import IsAuthenticated from "./layout/hoc/IsAuthenticated";
import AddCardPage from "./pages/financialManagement/Banking/addCard";
import AllTransactionPage from "./pages/financialManagement/Banking/transactionHistory";
import ViewCardPage from "./pages/financialManagement/Banking/viewTransaction";
import AddBankPage from "./pages/financialManagement/Banking/addBank";
import InventoryDetailsPage from "./pages/pointOfSales/productManagement/inventoryDetailsPage";
import ViewProduct from "./pages/pointOfSales/productManagement/viewProduct";
import EditProduct from "./pages/pointOfSales/productManagement/editProduct";
import ViewOrderDraftPage from "./pages/pointOfSales/saleProcessing/viewOrderDraftPage";
import PreviewSalesDownloadPage from "./pages/pointOfSales/saleProcessing/previewDownload";
import ViewTransactionPage from "./pages/pointOfSales/transaction/ViewTransaction";
import ViewPendingTransactionPage from "./pages/pointOfSales/transaction/ViewPendingTransaction";
import PreviewTransactionDownloadPage from "./pages/pointOfSales/transaction/PreviewDownload2";
import DefaultLayout from "./layout/defaultLayout";
import Home from "./pages/landingPages/home";


export default function App() {
  return (
    <Router>
      <Routes>
      <Route path={ROUTES.HOME} element={<DefaultLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}

        <Route
          path="/dashboard"
          element={
            <IsAuthenticated>
              <DashboardLayout />
            </IsAuthenticated>
          }
        >
          {/* POINT OF SALES ROUTES */}

          <Route index element={<DashboardPage />} />
          <Route
            path={ROUTES.productManagement}
            element={<ProductManagementPage />}
          />
          <Route path={ROUTES.addNewProduct} element={<AddNewProduct />} />
          <Route path={ROUTES.viewProduct} element={<ViewProduct />} />
          <Route path={ROUTES.editProduct} element={<EditProduct />} />
          <Route path={ROUTES.inventoryDetails} element={<InventoryDetailsPage />} />
          <Route path={ROUTES.addBulkProduct} element={<AddBulkProduct />} />
          <Route path={ROUTES.sales} element={<SalesProcessingPage />} />
          <Route path={ROUTES.viewOrder} element={<ViewOrderPage />} />
          <Route path={ROUTES.createOrder} element={<CreateOrderPage />} />
          <Route path={ROUTES.viewOrderdraft} element={<ViewOrderDraftPage/>} />
          <Route path={ROUTES.previewdownload} element={<PreviewSalesDownloadPage/>} />
          {/* <Route   path= '/dashboard/sales/preview-download/:orderId' element={<PreviewSalesDownloadPage/>} /> */}
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
          <Route path={ROUTES.viewTransaction} element={<ViewTransactionPage />} />
          <Route path={ROUTES.viewPendingTransaction} element={<ViewPendingTransactionPage />} />
          <Route path={ROUTES.previewTransaction} element={<PreviewTransactionDownloadPage />} />
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

          <Route
            path={ROUTES.procurementDashboard}
            element={<ProcurementDashboard />}
          />
          <Route path={ROUTES.newRequest} element={<NewRequestPage />} />
          <Route
            path={ROUTES.createdRequest}
            element={<CreatedRequestPage />}
          />
          <Route
            path={ROUTES.viewApproveRequest}
            element={<ViewApproveRequestPage />}
          />
          <Route
            path={ROUTES.viewPendingRequest}
            element={<ViewPendingRequestPage />}
          />
          <Route
            path={ROUTES.viewCancelledRequest}
            element={<ViewCancelledRequestPage />}
          />
          <Route path={ROUTES.purchaseOrder} element={<PurchaseOrderPage />} />
          <Route
            path={ROUTES.createPurchaseOrder}
            element={<CreatePurchaseOrderPage />}
          />
          <Route
            path={ROUTES.purchaseInvoicePage}
            element={<PurchaseInvoicePage />}
          />
          <Route
            path={ROUTES.viewPurchaseOrderInvoicePage}
            element={<ViewPurchaseOrderInvoicePage />}
          />
          <Route
            path={ROUTES.vendorManagement}
            element={<VendorManagement />}
          />
          <Route
            path={ROUTES.tierOneVendors}
            element={<TierOneVendorDetails />}
          />
          <Route
            path={ROUTES.tierTwoVendors}
            element={<TierTwoVendorDetails />}
          />
          <Route path={ROUTES.createTierOne} element={<CreateTierOne />} />
          <Route path={ROUTES.createTierTwo} element={<CreateTierTwo />} />
          <Route path={ROUTES.editVendor} element={<EditVendor />} />
          <Route
            path={ROUTES.requestDashboard}
            element={<RequestDashboard />}
          />
          <Route
            path={ROUTES.requestSummaryPage}
            element={<RequestSummaryPage />}
          />
          <Route path={ROUTES.viewBudgetPage} element={<ViewBudgetPage />} />
          <Route path={ROUTES.shipments} element={<ShipmentsDashboard />} />
          <Route
            path={ROUTES.shipmentsSummary}
            element={<ShipmentSummaryPage />}
          />
          <Route path={ROUTES.createShipment} element={<CreateShipment />} />
          <Route path={ROUTES.purchaseReturns} element={<PurchaseReturns />} />
          <Route
            path={ROUTES.approveReturns}
            element={<ApproveReturnPurchase />}
          />
          <Route path={ROUTES.issuePurchase} element={<IssuePurchasePage />} />
          <Route path={ROUTES.goodsReceived} element={<GoodsReceiveNote />} />
          <Route
            path={ROUTES.pendingNoteDetails}
            element={<PendingNoteDetails />}
          />
          <Route
            path={ROUTES.rejectedNoteDetails}
            element={<RejectedNoteDetails />}
          />
          <Route
            path={ROUTES.approvedNoteDetails}
            element={<ApprovedNoteDetails />}
          />

          {/* ASSET MANAGEMENT ROUTES */}

          <Route path={ROUTES.assetDashboard} element={<AssetDashboard />} />
          <Route path={ROUTES.summaryPage} element={<SummaryPage />} />
          <Route
            path={ROUTES.assetRequestPage}
            element={<AssetRequestPage />}
          />
          <Route
            path={ROUTES.assetRequestDetails}
            element={<AssetRequestDetails />}
          />
          <Route
            path={ROUTES.assetRegisterPage}
            element={<AssetRegisterPage />}
          />
          <Route path={ROUTES.addNewAsset} element={<AddNewAsset />} />
          <Route path={ROUTES.viewAssetState} element={<ViewAssetState />} />
          <Route
            path={ROUTES.depreciationPage}
            element={<DepreciationPage />}
          />
          <Route
            path={ROUTES.viewdepreciationState}
            element={<ViewDepreciationState />}
          />
          <Route
            path={ROUTES.addNewDepreciation}
            element={<AddNewDepreciation />}
          />
          <Route path={ROUTES.procurementPage} element={<ProcurementPage />} />
          <Route
            path={ROUTES.viewProcurementState}
            element={<ViewProcurementState />}
          />
          <Route
            path={ROUTES.createProcurementrequest}
            element={<CreateProcurementRequest />}
          />
          <Route path={ROUTES.reportPage} element={<ReportPage />} />
          <Route path={ROUTES.settingPage} element={<SettingPage />} />
      

          {/* FINANCIAL-MANAGEMENT ROUTES */}
          <Route
            path={ROUTES.financialDashboard}
            element={<FinancialDashboard />}
          />
          <Route path={ROUTES.salesManagement} element={<SalesManagement />} />
          <Route path={ROUTES.customerPage} element={<CustomerSalesPage />} />

          <Route
            path="/dashboard/sales-management/customer/view"
            element={<CustomerViewLayout />}
          >
            <Route index element={<ViewCustomer />} />
            <Route path="order" element={<CustomerOrderPage />} />
            <Route path="returns" element={<ReturnedItemPage />} />
            <Route path="payment-method" element={<PaymentMethodPage />} />
          </Route>
          <Route path={ROUTES.viewOrders} element={<ViewOrder />} />
          <Route path={ROUTES.createReceipt} element={<CreateReceiptPage />} />
          <Route
            path={ROUTES.createMobileReceipt}
            element={<CreateMobileReceiptPage />}
          />
          <Route
            path={ROUTES.confirmReceipt}
            element={<ConfirmReceiptPage />}
          />
          <Route path={ROUTES.invoiceOverview} element={<InvoiceOverview />} />
          <Route path={ROUTES.createInvoice} element={<CreateInvoicePage />} />
          <Route
            path={ROUTES.previewInvoice}
            element={<PreviewInvoicePage />}
          />
          <Route path={ROUTES.attachInvoice} element={<AttachInvoicePage />} />
          <Route
            path={ROUTES.attachReceipent}
            element={<AttachReceiptPage />}
          />
          <Route
            path={ROUTES.previewReceipt}
            element={<PreviewReceiptPage />}
          />
          <Route path={ROUTES.allReceiptView} element={<AllReceiptPage />} />
          <Route
            path={ROUTES.shareReceiptView}
            element={<ShareReceiptPage />}
          />
          <Route path={ROUTES.viewReceipt} element={<ViewReceiptPage />} />
          <Route
            path={ROUTES.generateReport}
            element={<GenerateReportPage />}
          />
          <Route
            path={ROUTES.allocateReceipt}
            element={<AllocateReceiptPage />}
          />
          <Route
            path={ROUTES.partiallyPaidReceipt}
            element={<PartiallyPaidReceiptPage />}
          />
          <Route
            path={ROUTES.advancedPaidReceipt}
            element={<AdvancedPaidPage />}
          />
          <Route
            path={ROUTES.filledPartiallyPaidReceipt}
            element={<FilledPartiallyPaidReceiptPage />}
          />
          <Route
            path={ROUTES.filledAvancedPaidReceipt}
            element={<FilledAdvancedPaidPage />}
          />
          <Route path={ROUTES.orderReceipt} element={<OrderReceiptPage />} />
          <Route path={ROUTES.inStoreOverview} element={<InStorePage />} />
          <Route path={ROUTES.financeOverview} element={<FinancePage />} />
          <Route
            path={ROUTES.viewSalesReturns}
            element={<ViewSalesReturnsPage />}
          />
          <Route
            path={ROUTES.issueCreditNote}
            element={<IssueCreditNotePage />}
          />
          <Route path={ROUTES.creditNote} element={<CreditNotePage />} />
          <Route path={ROUTES.creditNote2} element={<CreditNotePage2 />} />
          <Route
            path={ROUTES.viewCreditNote}
            element={<ViewCreditNotePage />}
          />
          <Route
            path={ROUTES.viewCreditNote2}
            element={<ViewCreditNoteReceiptPage />}
          />
          <Route path={ROUTES.selectVendor} element={<SelectVendorPage />} />
          <Route
            path={ROUTES.unsettledVendor}
            element={<UnsettledVendorsPage />}
          />
          <Route
            path={ROUTES.unallocatedPayment}
            element={<UnallocatedPaymentPage />}
          />
          <Route
            path={ROUTES.filledUnsettledVendor}
            element={<FilledUnsettledVendorsPage />}
          />
          <Route
            path={ROUTES.filledUnallocatedPayment}
            element={<FilledUnallocatedPaymentPage />}
          />
          <Route
            path={ROUTES.allPurchaseInvoice}
            element={<AllPurchaseOverviewPage />}
          />
          <Route
            path={ROUTES.nonInventory}
            element={<NonInventoryOverviewPage />}
          />
          <Route
            path={ROUTES.viewPurchaseInvoice}
            element={<ViewPurchaseInvoicePage />}
          />
          <Route path={ROUTES.viewHistory} element={<PurchaseHistoryPage />} />
          <Route
            path={ROUTES.viewConvertInvoice}
            element={<ConvertGrnToInvoicePage />}
          />
          <Route
            path={ROUTES.viewNoFinancialImplication}
            element={<NoFinancialPurchaseInvoicePage />}
          />
          <Route
            path={ROUTES.viewPurchaseReceipt}
            element={<ViewReceiptPages />}
          />
          <Route
            path={ROUTES.allNonInventory}
            element={<AllNonInventoryPage />}
          />
          <Route
            path={ROUTES.viewNonInventory}
            element={<ViewNonInventoryPage />}
          />
          <Route
            path={ROUTES.viewNonInventory2}
            element={<ViewNonInventoryPage2 />}
          />
          <Route
            path={ROUTES.viewNonInventory2}
            element={<ViewNonInventoryPage2 />}
          />
          <Route
            path={ROUTES.allPurchaseReturns}
            element={<AllPurchaseReturnsOverviewPage />}
          />
          <Route
            path={ROUTES.viewPurchaseReturns}
            element={<ViewPurchaseReturnPage />}
          />
          <Route
            path={ROUTES.allDebitNote}
            element={<AllDebitNoteOverviewPage />}
          />
          <Route path={ROUTES.viewDebitNote} element={<ViewDebitNotePage />} />
          <Route
            path={ROUTES.previewDebitNote}
            element={<PreviewDebitPage />}
          />
          <Route path={ROUTES.sendDebitNote} element={<SendDebitPage />} />
          <Route
            path={ROUTES.createRemittance}
            element={<CreateRemittancePage />}
          />
          <Route
            path={ROUTES.singleInvoice}
            element={<SingleRemittancePage />}
          />
          <Route
            path={ROUTES.multipleInvoice}
            element={<MultipleRemittancePage />}
          />
          <Route
            path={ROUTES.attachRemittance}
            element={<AttachRemittancePage />}
          />
          <Route
            path={ROUTES.previewRemittance}
            element={<PreviewRemittancePage />}
          />
          <Route
            path={ROUTES.editRemittance}
            element={<EditRemittancePage />}
          />
          <Route path={ROUTES.allRemittance} element={<AllRemittancePage />} />
          <Route
            path={ROUTES.viewRemittance}
            element={<ViewRemittancePage />}
          />
          <Route
            path={ROUTES.allocateRemittance}
            element={<AllocateRemittancePage />}
          />
          <Route
            path={ROUTES.matchRemittance}
            element={<MatchRemittancePage />}
          />
          <Route
            path={ROUTES.unallocatedRemittance}
            element={<PartiallyPaidPage />}
          />
          <Route
            path={ROUTES.advancedPaymentRemittance}
            element={<AdvancedPaymentPage />}
          />
          <Route
            path={ROUTES.filledUnallocatedRemittance}
            element={<FilledPartiallyPaidPage />}
          />
          <Route
            path={ROUTES.filledAdvancedPaymentRemittance}
            element={<FilledAdvancedRemittancePage />}
          />
          <Route
            path={ROUTES.allPurchaseOrder}
            element={<AllPurchaseOrderOverviewPage />}
          />
          <Route
            path={ROUTES.viewPurchaseOrder}
            element={<ViewPurchaseOrderPage />}
          />
          <Route
            path={ROUTES.previewPurchaseOrder}
            element={<PreviewPurchaseOrderPage />}
          />
          <Route
            path={ROUTES.purchaseOrderHistory}
            element={<PurchaseOrderHistoryPage />}
          />
          <Route path={ROUTES.vendorHistory} element={<AllVendorPage />} />
          <Route path={ROUTES.vendorDetails} element={<VendorOverviewPage />} />
          <Route path={ROUTES.addPayment} element={<AddPaymentPage />} />
          <Route
            path={ROUTES.addPayment2}
            element={<SelectVendorPaymentPage />}
          />
          <Route path={ROUTES.settlePayment} element={<SettleVendorPage />} />
          <Route
            path={ROUTES.inventoryWarehouse}
            element={<InventoryWarehousePage />}
          />
          <Route
            path={ROUTES.inventoryWarehouseDetails}
            element={<InventoryWarehouseDetailsPage />}
          />
          <Route
            path={ROUTES.inventoryStores}
            element={<InventoryStoresPage />}
          />
          <Route path={ROUTES.singularInventory} element={<InventoryPage />} />
          <Route
            path={ROUTES.inventoryStores2}
            element={<InventoryStoresPage2 />}
          />
          <Route path={ROUTES.storeView} element={<ViewStore />} />
          <Route path={ROUTES.storeView} element={<ViewStore />} />
          <Route
            path="/dashboard/payment/initiate-payment"
            element={<PaymentViewLayout />}
          >
            <Route index element={<Payment />} />
            <Route path="processor" element={<SelectProcessorPage />} />
            <Route path="processors" element={<SelectProcessorPage2 />} />
            <Route path="make-payment" element={<MakePaymentPage />} />
            <Route path="payment-receipt" element={<PaymentReceiptPage />} />
          </Route>
          <Route path={ROUTES.allPayment} element={<AllPaymentOverviewPage/>} />
          <Route path={ROUTES.viewAllPayment} element={< ViewPaymentPage/>} />
          <Route path={ROUTES.accountChart} element={< AccountChartPage/>} />
          <Route path={ROUTES.viewAccountChart} element={< ViewAccountChartPage/>} />
          <Route path={ROUTES.createAccountChart} element={< CreateAccountChartPage/>} />
          <Route path={ROUTES.importAccountChart} element={< ImportAccountChartTable/>} />
          <Route path={ROUTES.importChart} element={< ImportAccountChartPage/>} />
          <Route path={ROUTES.editAccountChart} element={< EditAccountChartPage/>} />
          <Route path={ROUTES.allJournal} element={< AllJournalPage/>} />
          <Route path={ROUTES.createJournal} element={< CreateJournalPage/>} />
          <Route path={ROUTES.viewJournal} element={< ViewJournalPage/>} />
          <Route path={ROUTES.importJournal} element={< ImportJournalTablePage/>} />
          <Route path={ROUTES.reviewJournal} element={< ReviewJournalPage/>} />
          <Route path={ROUTES.addCard} element={< AddCardPage/>} />
          <Route path={ROUTES.allTransaction} element={<AllTransactionPage/>} />
          <Route path={ROUTES.viewCardTransaction} element={<ViewCardPage/>} />
          <Route path={ROUTES.addBank} element={< AddBankPage/>} />
        </Route>
      </Routes>
    </Router>
  );
}