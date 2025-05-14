import { Button, Text } from "@mantine/core";
import { Link } from "react-router";
import InvoiceMetricsOverview from "../../../../components/finacialManagement/salesManagement/salesInvoice/invoiceMetrics";
import SalesInvoiceTable from "../../../../components/finacialManagement/salesManagement/salesInvoice/invoiceTable";
import { ROUTES } from "../../../../constants/routes";
import PageContainer from "../../../../layout/pageContainer";



const InvoiceOverview = () => {
  const subHeaders = [
    <div className="flex sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
      <Text fw={500} size="xl" c="black">
        Invoice
      </Text>
      <div className="flex flex-row gap-2 md:gap-4">
        <Link to={ROUTES.createInvoice}>
          <Button
            variant="filled-primary"
            className="flex gap-1.5 items-center justify-center"
            style={{ padding: "0.8rem 1rem" }}
          >
            <span className="whitespace-nowrap ">Create New Invoice</span>{" "}
            <span className="text-xl font-bold ml-2">+</span>
          </Button>
        </Link>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <InvoiceMetricsOverview />
      <SalesInvoiceTable />
    </PageContainer>
  );
};

export default InvoiceOverview;
