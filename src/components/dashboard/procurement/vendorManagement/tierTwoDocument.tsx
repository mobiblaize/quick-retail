import { Text } from "@mantine/core";
import { Download, FileText } from "lucide-react";

const TierTwoDocument = () => {
  return (
    <main className="w-full h-auto rounded-lg bg-[#FFF] px-6 md:py-8">
      <div>
        <Text fw={500} size="xl" c="black">
          Supporting Document
        </Text>
        <Text className="text-[#667085] text-[16px]">
          You're viewing additional information below
        </Text>
      </div>

      <div className="flex gap-8 items-center mt-[3em]">
        <div className="flex items-center justify-between bg-[#EFF0F6] rounded-xl p-4 w-full max-w-md">
          {/* Left circle with PDF icon */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <FileText className="text-blue-600 w-6 h-6" />
            </div>

            <div>
              <div className="text-lg font-medium text-[#262338]">
                Product Details.pdf
              </div>
              {/* Download link */}
              <a
                href="#"
                className="flex items-center text-[#2E5CB2] text-sx font-medium"
                download
              >
                <Download className="w-4 h-4 mr-1" />
                Download
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TierTwoDocument;
