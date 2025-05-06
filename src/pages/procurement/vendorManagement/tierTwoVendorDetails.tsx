import React, { useState } from "react";
import { Button, Menu, Text } from "@mantine/core";
import { ChevronDown, ChevronLeft, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PageContainer from "../../../layout/pageContainer";
import TierOneDocument from "../../../components/dashboard/procurement/vendorManagement/tierOneDocument";
import TierTwoDetails from "../../../components/dashboard/procurement/vendorManagement/tierTwoDetails";
import SubVendorsTable from "../../../components/dashboard/procurement/vendorManagement/subVendorsTable";
import { ROUTES } from "../../../constants/routes";
import DeactivateVendor from "../../../components/dashboard/procurement/vendorManagement/modal/deactivateVendor";
import ActivateVendorModal from "../../../components/dashboard/procurement/vendorManagement/modal/activateVendor";

const TierTwoVendorDetails: React.FC = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenApprove, setModalOpenApprove] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const getSubHeaders = () => {
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
      <div key="1" className="py-2.5">
        <div className="hidden sm:flex gap-8 items-center">
          {backButton}
          <div className="flex items-center">
            <Text>Vendor</Text>
            <>
              <span className="mx-2">/</span>
              <Text c="black" fw={500}>
                Vendor Management
              </Text>
            </>
          </div>
        </div>

        <div className="flex sm:hidden gap-2 items-center">{backButton}</div>
      </div>,
      <div key="2" className="justify-between flex items-center">
        <Text fw={500} size="xl" c="black">
          Vendor Details
        </Text>

        <div>
          <div className="hidden sm:block">
            <Menu>
              <Menu.Target>
                <Button variant="filled-primary">
                  Quick Action
                  <ChevronDown className="ml-2" />
                </Button>
              </Menu.Target>

              <Menu.Dropdown
                style={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  padding: "10px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Link to={ROUTES.editVendor}>
                  <Menu.Item
                    style={{
                      fontSize: "14px",
                      padding: "8px 16px",
                      color: "#333",
                    }}
                  >
                    Edit Vendor
                  </Menu.Item>
                </Link>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  onClick={() => setModalOpen(true)}
                >
                  Deactive Vendor
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  onClick={() => setModalOpenApprove(true)}
                >
                  Active Vendor
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>

          <div className="block sm:hidden">
            <Menu>
              <Menu.Target>
                <Button
                  variant="filled-primary"
                  style={{
                    width: "40px",
                    height: "40px",
                    padding: "0",
                    borderRadius: "20%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Plus size={20} />
                </Button>
              </Menu.Target>

              <Menu.Dropdown
                style={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  padding: "10px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Link to={ROUTES.editVendor}>
                  <Menu.Item
                    style={{
                      fontSize: "14px",
                      padding: "8px 16px",
                      color: "#333",
                    }}
                  >
                    Edit Vendor
                  </Menu.Item>
                </Link>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  onClick={() => setModalOpen(true)}
                >
                  Deactive Vendor
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  onClick={() => setModalOpenApprove(true)}
                >
                  Active Vendor
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </div>
      </div>,
    ];

    return subHeaders;
  };

  return (
    <>
      <PageContainer subHeaders={getSubHeaders()}>
        <TierTwoDetails />
        <TierOneDocument />
        <SubVendorsTable />
      </PageContainer>

      <DeactivateVendor
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <ActivateVendorModal
        opened={modalOpenApprove}
        onClose={() => setModalOpenApprove(false)}
      />
    </>
  );
};

export default TierTwoVendorDetails;
