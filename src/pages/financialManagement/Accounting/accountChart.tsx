import { Button, Text } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router";
import AccountChartTable from "../../../components/finacialManagement/account/accountChart";
import { ROUTES } from "../../../constants/routes";
import PageContainer from "../../../layout/pageContainer";

const AccountChartPage = () => {
  const [, setShowAllocatedModal] = useState(false);
  const navigate = useNavigate();
  const handleCreate = () =>{
    navigate(ROUTES.createAccountChart)
  }

  const subHeaders = [
    <div key="1" className="py-2.5">
      <div className="flex"></div>
    </div>,
    <div>
      <div className="flex sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 lg:hidden">
        <div className="flex flex-col">
          <Text fw={500} size="xl" c="black">
            All Chart of Account
          </Text>
          <div className=" text-sm flex justify-end text-right gap-6 pb-4 mt-[-2em] lg:hidden">
            <div
              className="curor-pointer"
              onClick={() => setShowAllocatedModal(true)}
            >
              <Button
                variant="filled"
                style={{
                  backgroundColor: "#F16722",
                  color: "white",
                  borderRadius: "0.4rem",
                  height: "auto",
                  padding: "0.9rem 1.1rem",
                  fontWeight: 600,
                  fontSize: "16px",
                  width: "100%",
                }}
              >
                Create New Account
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* desktop */}

      <div className="flex sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0  md:block hidden">
        <div className="flex flex-col">
          <Text fw={500} size="xl" c="black">
            All Chart of Account
          </Text>
          <div className=" text-sm flex justify-end text-right gap-6 pb-4 mt-[-2em] ">
            <div
              className="curor-pointer"
              onClick={handleCreate}
            >
              <Button
                variant="filled"
                style={{
                  backgroundColor: "#F16722",
                  color: "white",
                  borderRadius: "0.4rem",
                  height: "auto",
                  padding: "0.9rem 1.1rem",
                  fontWeight: 600,
                  fontSize: "16px",
                  width: "100%",
                }}
              >
                Create New Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <AccountChartTable />
    </PageContainer>
  );
};

export default AccountChartPage;
