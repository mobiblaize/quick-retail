import { useRef, useState, useEffect } from "react";
import { CheckCircle, FileText, UploadCloud } from "lucide-react";
import csv from "../../../../assets/images/excelimg.png";
import { showNotification } from "@mantine/notifications";
import { useDownloadProductTemplate } from "../../../../hooks/backendApis/pos/products";
import { IconX } from "@tabler/icons-react";
import { Anchor, Box, List, Progress, Text, Title } from "@mantine/core";

type Props = {
  file: File | null;
  setFile: (file: File | null) => void;
};

const AddBulkUploadDoc: React.FC<Props> = ({ file, setFile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const { mutate: downloadTemplate } = useDownloadProductTemplate("variant");

  const handleDownload = () => {
    downloadTemplate(undefined, {
      onSuccess: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "product-import-template.csv";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      },
      onError: () => {
        showNotification({
          title: "Download Failed",
          message: "Unable to download CSV template.",
          color: "red",
          icon: <IconX />,
        });
      },
    });
  };


  useEffect(() => {
    if (file) simulateUpload();
  }, [file]);

  const simulateUpload = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) clearInterval(interval);
    }, 100);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    const allowedTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Only CSV or XLSX files are allowed.");
      setFile(null);
      return;
    }

    if (selectedFile.size > 4 * 1024 * 1024) {
      setError("File size must be under 4MB.");
      setFile(null);
      return;
    }

    setError(null);
    setFile(selectedFile);
    setUploadProgress(0);
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      {/* Instructions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 w-full">
        <Title order={3} c="gray.8" mb="md">
          FOLLOW THE INSTRUCTIONS TO UPLOAD BULK PRODUCTS
        </Title>
        <img
          src={csv}
          alt="csvfile"
          width={800}
          height={400}
          className="w-full object-contain mb-6"
        />
        <List
          type="unordered"
          withPadding
          listStyleType="disc"
          spacing="md"
          c="gray.7"
          fz="sm"
        >
          <List.Item>
            <Text component="span">
              Download the product template CSV file{" "}
              <Anchor
                component="button"
                onClick={handleDownload}
                underline="always"
                c="blue.6"
                fw={500}
              >
                Download here
              </Anchor>
            </Text>
          </List.Item>
          <List.Item> <Text component="span">Enter product details according to the columns provided</Text></List.Item>
          <List.Item> <Text component="span">Preview your CSV file for mistakes and errors</Text></List.Item>
          <List.Item> <Text component="span">Save the CSV file to your device</Text></List.Item>
          <List.Item>
            <Text component="span">Upload file to Quick Retail bulk product upload and submit</Text>
          </List.Item>
        </List>
      </div>

      {/* Upload section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 w-full mt-12">
        <Title order={3} fz="sm" fw={600} c="gray.8" mb="md">
          UPLOAD CSV FILE
        </Title>

        {!file ? (
          <div
            className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center text-center cursor-pointer transition hover:bg-gray-50 w-full md:w-[20%]"
            onClick={handleClickUpload}
          >
            <UploadCloud className="h-8 w-8 text-gray-400 mb-2" />
            <Text fz="sm" c="orange.6" fw={500}>
              Click to upload
            </Text>
            <Text fz="sm" c="gray.5">
              or drag and drop
            </Text>
            <Text fz="xs" c="gray.4" mt={4}>
              CSV, XLSX (max. 4MB)
            </Text>
          </div>
        ) : (
          <div className="flex items-center gap-4 border border-gray-200 rounded-md px-4 py-3 bg-gray-50 w-[30%]">
            <FileText className="text-orange-500 w-6 h-6" />
            <div className="flex-1">
              <Text fz="sm" fw={500} c="gray.8">
                {file.name}
              </Text>

              <Text fz="xs" c="gray.5">
                {(file.size / (1024 * 1024)).toFixed(1)} MB
              </Text>

              <Box mt={8}>
                <Progress
                  value={uploadProgress}
                  color="orange"
                  radius="xl"
                  size="sm"
                  transitionDuration={500}
                />
              </Box>

              <Text fz="xs" c="gray.5" ta="right" mt={4}>
                {uploadProgress}%
              </Text>
            </div>
            {uploadProgress === 100 && (
              <CheckCircle className="text-orange-600 w-5 h-5" />
            )}
          </div>
        )}

        {error && (
          <p className="mt-4 text-sm text-red-600 font-medium">{error}</p>
        )}

        <input
          type="file"
          accept=".csv, .xlsx"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default AddBulkUploadDoc;
