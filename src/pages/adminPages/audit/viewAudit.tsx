import { Text, Loader, Menu, Button } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import ViewHeader from "../../../components/dashboard/adminPage/auditTrail/viewHeader";
import ViewDetails from "../../../components/dashboard/adminPage/auditTrail/viewDetails";
import { useFetchSingleAudit } from "../../../hooks/backendApis/admin/auditTrail";
// import Dropdown from "../../../components/General/dropdown";
// @ts-ignore
import Papa from "papaparse";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ViewAuditPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { uuid } = location.state || {};

  const { data, isLoading, error } = useFetchSingleAudit(uuid);
  console.log(data);

  // const exportOptions = [
  //   { label: "CSV", value: "csv" },
  //   { label: "PDF", value: "pdf" },
  // ];
  const handleBack = () => {
    navigate(-1);
  };

  const handleExport = (format: string) => {
    const log = data?.data?.log;

    if (!log) return;

    const causer = log.causer || {};
    const roles = (causer.roles || []).join(", ") || "N/A";

    const tableData = [
      {
        "User ID": causer.id || "N/A",
        Name: `${causer.firstname || ""} ${causer.lastname || ""}`,
        Email: causer.email || "N/A",
        Roles: roles,
        Activity: log.log_name || "",
        Module: log.action_module || "",
        "Store Name": log.store_name || "",
        "Store Address": log.store_address || "",
        "IP Address": log.ip_address || "",
        Browser: log.action_type || "",
        Timestamp: new Date(log.created_at).toLocaleString(),
      },
    ];

    if (format === "csv") {
      const csv = Papa.unparse(tableData);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `audit_log_${log.id}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    if (format === "pdf") {
      const doc = new jsPDF();
      doc.setTextColor(241, 103, 34); // Orange header
      doc.setFontSize(18);
      doc.text("Audit Trail Log", 14, 22);

      autoTable(doc, {
        startY: 30,
        head: [["Field", "Value"]],
        body: Object.entries(tableData[0]),
        theme: "grid",
        headStyles: { fillColor: [241, 103, 34] }, // Orange header background
      });

      doc.save(`audit_log_${log.id}.pdf`);
    }
  };

  const backButton = (
    <button
      onClick={handleBack}
      className="flex cursor-pointer gap-2 items-center"
    >
      <ChevronLeft />
      <Text fw={500} c="black">
        Back
      </Text>
    </button>
  );

  const subHeaders = [
    <div key="1">
      {backButton}
      <div className="flex items-center mt-4 justify-between">
        <Text fw={500} size="xl" c="#1D2739">
          View Audit Trail
        </Text>
        <div className="flex items-center gap-3">
          <Menu>
            <Menu.Target>
              <Button variant="filled-primary">
                Export
                <ChevronDown className="ml-2" />
              </Button>
            </Menu.Target>

            <Menu.Dropdown
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                padding: "6px 0",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Menu.Item
                style={{ fontSize: 14, color: "#333" }}
                onClick={() => handleExport("csv")}
              >
                Export CSV
              </Menu.Item>
              <Menu.Item
                style={{ fontSize: 14, color: "#333" }}
                onClick={() => handleExport("pdf")}
              >
                Export PDF
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
    </div>,
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader color="orange" size="lg" />
      </div>
    );
  }

  if (error || !data || !data.data) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader color="orange" size="lg" />
      </div>
    );
  }

  return (
    <PageContainer subHeaders={subHeaders}>
      <>
        <ViewHeader
          profile={{ ...data.data.log, ...data.data.log.causer, ...data.data }}
        />
        <ViewDetails
          profile={{ ...data.data.log, ...data.data.log.causer, ...data.data }}
        />
      </>
    </PageContainer>
  );
};

export default ViewAuditPage;
