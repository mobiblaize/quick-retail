import {
  Box,
  Button,
  Card,
  Group,
  Text,
  Accordion,
  Badge,
  Image,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useDownloadBulkErrorReport } from "../../../hooks/backendApis/pos/products";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../constants/routes";
import successImg from "../../../assets/gif/success.gif";

interface BulkProductError {
  row: number;
  field: string;
  message: string;
  value: string;
}

interface ValidationData {
  success_count: number;
  failed_count: number;
  total_rows: number;
  errors: BulkProductError[];
  has_errors: boolean;
  created_products: string[];
}

interface Props {
  data: ValidationData;
}

export default function ValidationFailedUI({ data }: Props) {
  const navigate = useNavigate();
  const { mutate: downloadErrorReport, isPending } =
    useDownloadBulkErrorReport();

  const handleDownloadReport = () => {
    const payload = {
      errors: data.errors,
    };
    downloadErrorReport(payload, {
      onSuccess: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `error-report-${new Date().getTime()}.csv`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      },
      onError: () => {
        showNotification({
          title: "Download Failed",
          message: "Unable to download error report.",
          color: "red",
          icon: <IconX />,
        });
      },
    });
  };

  // Group errors by field
  const groupedErrors = data.errors.reduce((acc, error) => {
    if (!acc[error.field]) {
      acc[error.field] = [];
    }
    acc[error.field].push(error);
    return acc;
  }, {} as Record<string, BulkProductError[]>);

  // Get unique fields that have no errors (all rows valid)
  const allFields = new Set([...Object.keys(groupedErrors)]);
  const validFields = Array.from(allFields).filter(
    (field) => !groupedErrors[field] || groupedErrors[field].length === 0
  );

  return (
    <Box className="rounded-xl">
      {/* Header */}
      <div className="text-center w-full flex flex-col items-center gap-5 rounded-xl bg-white shadow-xs py-10">
        {data?.has_errors && <IconAlertCircle className="text-center" size={50} color="#FF4D4F" />}
        {!data?.has_errors && <Image
          src={successImg}
          alt={'success'}
          className="!w-[150px] !h-[150px] !mx-auto -mb-10"
          fit="contain"
          radius="md"
        />}

        <Text fw={600} fz="lg" mt={10}>
          Validation {data?.has_errors ? "Failed" : "Successful"}
        </Text>

        {data.has_errors && (
          <Text fz="sm" c="dimmed">
            We found <b>{data.failed_count} errors</b> in your file that need to
            be fixed before uploading
          </Text>
        )}

        {!data.has_errors && (
          <>
            <Text fz="sm" c="dimmed">
              Your file has successfully being uploaded to your products.
            </Text>

            <Button variant="filled-primary" onClick={()=>navigate(ROUTES.productManagement)}>Manage Products</Button>
          </>
        )}
      </div>

      {/* Stats Row */}
      <Group grow mt={30}>
        <Card shadow="xs" radius="md" p="lg">
          <Text fz="xs" c="dimmed">
            TOTAL ROWS
          </Text>
          <Text fw={700} fz={22} mt={5}>
            {data.total_rows}
          </Text>
        </Card>

        <Card shadow="xs" radius="md" p="lg">
          <Text fz="xs" c="dimmed">
            ERRORS FOUND
          </Text>
          <Text fw={700} fz={22} mt={5} color="#FF4D4F">
            {data.failed_count}
          </Text>
        </Card>

        <Card shadow="xs" radius="md" p="lg">
          <Text fz="xs" c="dimmed">
            VALID ROWS
          </Text>
          <Text fw={700} fz={22} mt={5} color="green">
            {data.success_count}
          </Text>
        </Card>
      </Group>

      {/* Section Title */}
      {data.has_errors && (
        <>
          <div className="flex items-center justify-between rounded-sm mt-10 bg-white p-3">
            <Text fw={600}>VALIDATION DETAILS</Text>
            <Button
              variant="filled"
              color="orange"
              onClick={handleDownloadReport}
              loading={isPending}
            >
              Download Error Report
            </Button>
          </div>

          {/* Accordion */}
          <div className="border-t border-gray-100 rounded-sm bg-white p-3">
            <Accordion variant="separated" radius="md">
              {/* Valid Sections - Show sample valid fields */}
              {validFields.slice(0, 2).map((field) => (
                <div
                  key={field}
                  className="bg-gray-50 rounded-md mb-3 flex items-center justify-between p-3"
                >
                  <div>
                    <Text fw={500}>{field}</Text>
                    <Text fz="xs" c="dimmed">
                      {data.total_rows} / {data.total_rows} rows valid
                    </Text>
                  </div>
                  <Badge color="green">All Valid</Badge>
                </div>
              ))}

              {/* Error Sections */}
              {Object.entries(groupedErrors).map(([field, errors]) => {
                const validCount = data.total_rows - errors.length;
                return (
                  <Accordion.Item key={field} value={field}>
                    <Accordion.Control>
                      <Group
                        className="flex !justify-between pr-4 !items-center"
                        w="100%"
                      >
                        <div>
                          <Text fw={500}>{field}</Text>
                          <Text fz="xs" c="dimmed">
                            {validCount} / {data.total_rows} rows valid
                          </Text>
                        </div>

                        <Badge color="red">{errors.length} Issues</Badge>
                      </Group>
                    </Accordion.Control>

                    <Accordion.Panel>
                      {errors.map((error, index) => (
                        <Card
                          key={index}
                          mt="xs"
                          p="md"
                          withBorder
                          radius="md"
                          className="!border-[#FFC9C9]"
                          bg="#FFFFFF"
                        >
                          <Text fz="md" color="#E7000B">
                            Row {error.row}:{" "}
                            <span className="text-[#171717]">
                              {error.message}
                            </span>
                          </Text>
                          {error.value && (
                            <Text fz="sm" c="dimmed" mt={4}>
                              Value: {error.value}
                            </Text>
                          )}
                        </Card>
                      ))}
                    </Accordion.Panel>
                  </Accordion.Item>
                );
              })}
            </Accordion>
          </div>
        </>
      )}
    </Box>
  );
}
