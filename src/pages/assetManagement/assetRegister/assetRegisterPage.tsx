import { Button, Text } from "@mantine/core";
import { Plus } from "lucide-react";
import { useState } from "react";
import PageContainer from "../../../layout/pageContainer";
import ActiveAssetsTable from "../../../components/dashboard/assetManagement/assetRegister/activeAssetsTable";
import DisposedAssetsTable from "../../../components/dashboard/assetManagement/assetRegister/disposedAssetsTable";
import RetiredAssetsTable from "../../../components/dashboard/assetManagement/assetRegister/retiredAssetsTable";
import AddNewAssetModal from "../../../components/dashboard/assetManagement/assetRegister/modal/addNewAssetModal";

const AssetRegisterPage = () => {
  const [isAddNewOpen, setIsAddNewOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"activeAssets" | "disposedAssets" | "retiredAssets" | "cancelled">("activeAssets");

  const subHeaders = [
    <div key="1">
      <div className="flex items-center justify-between">
        <div>
          <Text fw={500} size="xl" c="black">
            Asset Register
          </Text>
          <Text fw={300} size="m" c="black">View and manage all assets.</Text>
        </div>
        <Button
          onClick={() => setIsAddNewOpen(true)}
          variant="filled-primary"
          className="flex gap-1.5"
        >
          Add New Asset
          <Plus size={24} />
        </Button>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
       <div className="w-full bg-white p-8">
        {/* Tab headers */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4 mb-6">
          <button
            onClick={() => setActiveTab("activeAssets")}
            className={`text-sm px-4 py-2 rounded-md font-medium ${
              activeTab === "activeAssets"
                ? "bg-[#FFECE5] text-[#D14900]"
                : "text-[#344054]"
            }`}
          >
            Active Assets (0)
          </button>
          <button
            onClick={() => setActiveTab("disposedAssets")}
            className={`text-sm px-4 py-2 rounded-md font-medium ${
              activeTab === "disposedAssets"
                ? "bg-[#FFECE5] text-[#D14900]"
                : "text-[#344054]"
            }`}
          >
            Disposed Assets (0)
          </button>
          <button
            onClick={() => setActiveTab("retiredAssets")}
            className={`text-sm px-4 py-2 rounded-md font-medium ${
              activeTab === "retiredAssets"
                ? "bg-[#FFECE5] text-[#D14900]"
                : "text-[#344054]"
            }`}
          >
            Retired Assets (0)
          </button>
        </div>

        {/* Tab panels */}
        {activeTab === "activeAssets" && <ActiveAssetsTable/>}
        {activeTab === "disposedAssets" && <DisposedAssetsTable />}
        {activeTab === "retiredAssets" && <RetiredAssetsTable />}
      </div>
      <AddNewAssetModal
        opened={isAddNewOpen}
        onClose={() => setIsAddNewOpen(false)}
      />
    </PageContainer>
  );
};

export default AssetRegisterPage;
