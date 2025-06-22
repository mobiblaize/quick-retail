import TanTable from "../../../General/table";
import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import {  Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import { useEffect, useState } from "react";

const DiscountReportTable = ({ reportInfo }: { reportInfo: any }) => {
  const { reportData } = reportInfo || {};
  const [data, setData] = useState<TableRowData[]>([]);

  useEffect(() => {
    console.log("reportData", reportData);
    console.log(
      "reportData.data.discounts.data",
      reportData?.data?.discounts?.data
    );

    const discountsArray = reportData?.data?.discounts?.data;

    if (Array.isArray(discountsArray)) {
      const formattedData = discountsArray.map((item: any) => ({
        discountName: item["Discount name"],
        dateFrom: item["Date From"],
        dateTo: item["Date To"],
        priceOff: item["Price Off"],
        percentOff: item["Percent Off"],
        redemption: item["Redemption"],
        status: item["Status"],
      }));

      setData(formattedData);
    }
  }, [reportData]);

  const columns: ColumnDef<TableRowData>[] = [
    {
      header: "Discount Name",
      accessorKey: "discountName",
      cell: (props) => (
        <Text fw={500} c="black">
          {props.row.original.discountName}
        </Text>
      ),
    },
    {
      header: "Percent Off",
      accessorKey: "percentOff",
      cell: (props) => <Text>{props.row.original.percentOff}</Text>,
    },
    {
        header: "Price Off",
        accessorKey: "priceOff",
        cell: (props) => {
          const priceOff = props.row.original.priceOff;
          const percentOff = props.row.original.percentOff;
      
          if (priceOff === "-" && percentOff !== "-") {
            // There is a percent discount instead of price
            return <Text>-</Text>;
          }
      
          const priceNum = Number(priceOff);
          return (
            <Text>
              { !isNaN(priceNum) 
                ? `₦${priceNum.toLocaleString()}`
                : "-" }
            </Text>
          );
        },
      },
      
    {
      header: "Date From",
      accessorKey: "dateFrom",
      cell: (props) => (
        <Text c="textSecondary.7">
            {/* @ts-ignore */}
          {new Date(props.row.original.dateFrom).toLocaleDateString()}
        </Text>
      ),
    },
    {
      header: "Date To",
      accessorKey: "dateTo",
      cell: (props) => (
        <Text c="textSecondary.7">
                     {/* @ts-ignore */}
          {new Date(props.row.original.dateTo).toLocaleDateString()}
        </Text>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (props) => {
        const status = props.row.original.status;
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
              status === "active"
                ? "bg-[#ECFDF3] text-[#027A48]"
                : "bg-[#FFFAEB] text-[#B54708]"
            }`}
          >
            {status === "active" ? <PaidDot /> : <UnpaidDot />}
            <span className="ml-2">{status}</span>
          </div>
        );
      },
    },

    {
      header: "Redemption",
      accessorKey: "redemption",
      cell: (props) => <Text>{props.row.original.redemption}</Text>,
    },
  ];

  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      <TanTable
        columnData={columns}
        data={data}
        showSearch={false}
        showSortFilter={false}
        length={8}
        tableTitle={
          <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex gap-2.5 items-center">
              <Text fw={500} size="xl" c="textSecondary.9">
                Discounted Products
              </Text>
              <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
                <Text c="customPrimary.10">{data.length}</Text>
              </div>
            </div>
          </div>
        }
        tableType={"discount"}
      />
    </main>
  );
};

export default DiscountReportTable;
