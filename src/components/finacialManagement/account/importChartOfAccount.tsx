import { Button } from '@mantine/core';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../../constants/routes';
import ExcelTable from './excelTable';
import Instructions from './instructionComponent';
import UploadBox from './uploadSection';



export default function ImportChartOfAccount() {
    const navigate = useNavigate();
    const handleImport = () =>{
        navigate(ROUTES.importChart)
    }
  return (
    <>
    <div className="p-6 max-w-7xl mx-auto bg-white">
      <h1 className="text-xl font-semibold mb-4">Import Chart of Account</h1>
      <ExcelTable />
      <Instructions />
      <UploadBox />
</div>
<div className="mt-8 flex w-[300px] gap-6">
            <Button
              variant="filled"
              style={{
                backgroundColor: "#FFFFFF", 
                color: "#F16722", 
                borderRadius: "0.4rem",
                height: "auto",
                padding: "0.9rem 1.1rem",
                fontWeight: 600,
                fontSize: "16px",
                width: "100%",
                border: "2px solid #F16722", 
              }}
            >
            Cancel
            </Button>

            <Button
              variant="filled"
              onClick={handleImport}
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
             Import
            </Button>
          </div>
    </>
  );
}
