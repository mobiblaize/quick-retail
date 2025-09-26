
import { Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";
import {
  formatDate,
  shortenTransactionId,
  truncateText,
} from "../../../../utils/helpers";
import { FilterValues } from "../../../General/table/reuseableFilter";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import imageSrc from "../../../../assets/images/productIMG.png";
import GenericTable from "../../../General/genericTable";

interface ReturnsTableProps {
  returns: any[];
  isLoading: boolean;
  onFilterChange: (filters: FilterValues) => void;
  paginationData: {
    current_page: number;
    last_page: number;
    total: number;
  };
  onPageChange: (page: number) => void;
  onSearchChange?: (search: string) => void;
  setSearchTerm?: (value: string) => void;
  activeSort?: string;
  setSort?: (sortBy: string) => void;
  searchTerm?: string;
  filters: FilterValues; 
}

const ReturnsTable = ({
  returns,
  isLoading,
  // onFilterChange,
  paginationData,
  onPageChange,
  searchTerm,
  setSearchTerm,
  activeSort,
  onFilterChange,
  setSort,
  filters,
}: ReturnsTableProps) => {
  // const [sortBy, setSortBy] = useState<string>("");

  const statusMap: Record<string, string> = {
    approved: "Resolved",
    pending: "Pending",
    declined: "Declined",
  };

  const mappedReturns = Array.isArray(returns)
    ? returns.map((item: any) => ({
        returnId: item.returnID || "N/A",
        orderId: item.sales_order?.orderID || "N/A", 
        name: item.product_variation?.name || "N/A",
        productCode: item.product_variation?.sku || "N/A",
        dateReturned: item.created_at || "N/A",
        customer: item.customer?.customer_name || "N/A",
        returnedReason: item.return_reason || "N/A",
        complaintStatus: statusMap[item.status] || "Unknown",
        imagePath: item.product_variation?.image_path || imageSrc,
      }))
    : [];

  const columns = [
    {
      key: "returnId",
      header: "Return ID",
      render: (row: any) => (
        <Text fw={500} c="black">
          {row.returnId}
        </Text>
      ),
    },
    {
      key: "name",
      header: "Product",
      render: (row: any) => (
        <div className="flex items-center gap-3">
          <img
            src={row.imagePath}
            alt={row.name}
            className="w-10 h-10 rounded-md object-cover"
          />
          <div className="flex flex-col">
            <Text fw={500} c="black">
              {truncateText(row.name)}
            </Text>
            <Text fw={500} size="sm">
              ID:{" "}
              <span className="text-[#F16722]">
                {shortenTransactionId(row.productCode)}
              </span>
            </Text>
          </div>
        </div>
      ),
    },
    {
      key: "dateReturned",
      header: "Date Returned",
      render: (row: any) => <Text c="#667085">{formatDate(row.dateReturned)}</Text>,
    },
    {
      key: "customer",
      header: "Customer",
      render: (row: any) => (
        <Text fw={500} size="sm" c="black">
          {row.customer}
        </Text>
      ),
    },
    {
      key: "returnedReason",
      header: "Returned Reason",
      render: (row: any) => (
        <Text fw={400} size="sm" c="black">
          {row.returnedReason}
        </Text>
      ),
    },
    {
      key: "complaintStatus",
      header: "Complaint Status",
      render: (row: any) => {
        const status = row.complaintStatus;
        let bgColor = "";
        let textColor = "";
        let Dot = null;

        if (status === "Resolved") {
          bgColor = "bg-[#ECFDF3]";
          textColor = "text-[#027A48]";
          Dot = <PaidDot />;
        } else if (status === "Declined") {
          bgColor = "bg-[#FEF3F2]";
          textColor = "text-[#B42318]";
          Dot = <UnpaidDot />;
        } else {
          bgColor = "bg-[#FFFAEB]";
          textColor = "text-[#B54708]";
          Dot = <UnpaidDot />;
        }

        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${bgColor} ${textColor}`}
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            {Dot}
            <span className="ml-2">{status}</span>
          </div>
        );
      },
    },
    {
      key: "action",
      header: "",
      render: (row: any) => (
        <Link
          to={ROUTES.viewReturns} // don’t need `:id` if you’re using only state
          state={{ ...row }}      // pass the whole row (or just returnId)
        >
          <Text fw={700} c="customPrimary.10" className="cursor-pointer">
            View
          </Text>
        </Link>
      ),
    },
    
    
  ];

  return (
    <main className="w-full h-auto">
      <GenericTable
        columns={columns}
        data={mappedReturns}
        isLoading={isLoading}
        paginationData={paginationData}
        onPageChange={onPageChange}
        // onFilterChange={onFilterChange}
        enableSearch ={true}
        enableSort={true}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeSort={activeSort}
        onSortChange={setSort}
        onFilterChange={onFilterChange}
        showFilter={true}
        tableType="returns"
        filters={filters}    
        searchPlaceholder="search returns"
        titleSection={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
              Logged Returns
            </Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10">{paginationData?.total}</Text>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default ReturnsTable;

