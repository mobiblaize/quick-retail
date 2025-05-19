import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";
import { Bin, Checkbox, Ellipse } from "../../../../assets/svg";
import EmailModal from "../../salesManagement/salesInvoice/emailModal";
import SignatureUploadModal from "../../salesManagement/salesInvoice/attachmentModal";
import DraftModal from "../../salesManagement/receipts/draftModal";



export default function AttachRemittance() {
  const navigate = useNavigate();
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showDraftModal, setShowDraftModal] = useState(false);
  const handleContinue = () => {
    navigate(ROUTES.previewRemittance);
  };

 

  const [signature, setSignature] = useState<string | null>(null);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [attachment, setAttachment] = useState<string | null>(null);
  const [attachmentName, setAttachmentName] = useState<string | null>(null);

  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => setSignature(reader.result as string);
    reader.readAsDataURL(file);
  };

  const removeSignature = () => {
    setSignature(null);
  };

  return (
    <>
      {showEmailModal && (
        <EmailModal
          opened={showEmailModal}
          onClose={() => setShowEmailModal(false)}
        />
      )}
      {showSignatureModal && (
        <SignatureUploadModal
          onClose={() => setShowSignatureModal(false)}
          onUpload={handleUpload}
          opened={showSignatureModal}
        />
      )}
  {showDraftModal && (
        <DraftModal
          opened={showDraftModal}
          onClose={() => setShowDraftModal(false)}
        />
      )}
      <div className="space-y-8">
        {/* Grid for first two cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recipients Card */}
          <div className="bg-white pl-6 py-6 pr-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-lg font-medium text-gray-800 uppercase mb-6">
              RECEIPIENTS
            </h2>
            <p className="text-[#1671D9] text-sm mb-6">Note:</p>
            <p className="text-sm whitespace-nowrap mb-[3em] text-[#6E7191]">
              The invoice will be emailed to the customer’s contacts <br className="lg:hidden"/> below
            </p>
            <div className="flex flex-row mb-[2em]">
              <Checkbox />
              <span className="mt-[-8px]">
                <Ellipse />
              </span>
              <p className="whitespace-nowrap text-[#6E7191]">
                Adekunle, Ibrahim  <br className="lg:hidden"/>olamidemidesoc@gmail.com
              </p>
            </div>
            <div
              className="flex items-center gap-1 mt-2 cursor-pointer text-orange-500 text-sm font-medium"
              onClick={() => setShowEmailModal(true)}
            >
              <span className="text-lg font-bold">+</span>
              <span>Add new email</span>
            </div>
          </div>

          {/* Add Attachment Card desktop */}
          <div className="bg-white p-6 rounded-lg shadow-md w-full md:block hidden ">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
            ADD ATTACHEMENT (Optional)
            </h2>

            <label
              htmlFor="fileUpload"
              className="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-sm text-gray-500 cursor-pointer hover:border-orange-400 transition-colors duration-300"
            >
              <p className="mb-1">Click to upload, or drag and drop file</p>
              <p className="text-xs text-gray-400">(Max file size: 10MB)</p>

              {attachment && (
                <div className="mt-4 text-center">
                  {attachment.startsWith("data:image") && (
                    <div className="flex justify-center">
                      <img
                        src={attachment}
                        alt="Uploaded Preview"
                        className="max-h-40 object-contain rounded border border-gray-300 mb-2"
                      />
                    </div>
                  )}
                  <p className="text-sm text-gray-700 font-medium">
                    {attachmentName}
                  </p>
                </div>
              )}

              <input
                id="fileUpload"
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setAttachmentName(file.name);
                    const reader = new FileReader();
                    reader.onloadend = () =>
                      setAttachment(reader.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
                className="hidden"
              />
            </label>

            <div
              className="flex items-center justify-center gap-2 mt-4 cursor-pointer text-orange-500 hover:text-orange-600 text-sm font-medium"
              onClick={() => document.getElementById("fileUpload")?.click()}
            >
              <span className="text-xl font-bold">+</span>
              <span>Add more attachment</span>
            </div>
          </div>
</div>
          {/* Signature Card desktop */}
          <div className="bg-white p-6 rounded-lg shadow-md  w-[50%] md:block hidden">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Signature
            </h2>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-[#E4E7EC] text-gray-600">
                  <th className="py-2 px-4 font-medium">Signature</th>
                  <th className="py-2 px-4 font-medium">Action</th>
                  <th className="py-2 px-4 font-medium">Change</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4">
                    {signature ? (
                      <img
                        src={signature}
                        alt="Signature"
                        className="w-20 h-10 object-contain border border-gray-300 rounded"
                      />
                    ) : (
                      <div className="w-20 h-10 bg-gray-100 border border-gray-300 rounded flex items-center justify-center text-xs text-gray-400">
                        Signature
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={removeSignature}
                      className="text-red-500 hover:text-red-600"
                      title="Remove"
                    >
                      <Bin />
                    </button>
                  </td>
                  <td className="py-3 px-4">
                   
                    <button
                      onClick={() => setShowSignatureModal(true)}
                      className="text-gray-800 hover:underline text-sm cursor-pointer border border-gray-800 p-3 rounded-md"
                    >
                      Upload New
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
                {/* Signature Card mobile */}
                <div className="bg-white p-6 rounded-lg shadow-md  w-full lg:hidden">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Signature
            </h2>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-[#E4E7EC] text-gray-600">
                  <th className="py-2 px-4 font-medium">Signature</th>
                  <th className="py-2 px-4 font-medium">Action</th>
                  <th className="py-2 px-4 font-medium">Change</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4">
                    {signature ? (
                      <img
                        src={signature}
                        alt="Signature"
                        className="w-20 h-10 object-contain border border-gray-300 rounded"
                      />
                    ) : (
                      <div className="w-20 h-10 bg-gray-100 border border-gray-300 rounded flex items-center justify-center text-xs text-gray-400">
                        Signature
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={removeSignature}
                      className="text-red-500 hover:text-red-600"
                      title="Remove"
                    >
                      <Bin />
                    </button>
                  </td>
                  <td className="py-3 px-4">
                   
                    <button
                      onClick={() => setShowSignatureModal(true)}
                      className="text-gray-800 hover:underline text-sm cursor-pointer border border-gray-800 p-3 rounded-md"
                    >
                      Upload New
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
             {/* Add Attachment Card mobile */}
             <div className="bg-white p-6 rounded-lg shadow-md w-full  lg:hidden ">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
            ADD ATTACHEMENT (Optional)
            </h2>

            <label
              htmlFor="fileUpload"
              className="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-sm text-gray-500 cursor-pointer hover:border-orange-400 transition-colors duration-300"
            >
              <p className="mb-1">Click to upload, or drag and drop file</p>
              <p className="text-xs text-gray-400">(Max file size: 10MB)</p>

              {attachment && (
                <div className="mt-4 text-center">
                  {attachment.startsWith("data:image") && (
                    <div className="flex justify-center">
                      <img
                        src={attachment}
                        alt="Uploaded Preview"
                        className="max-h-40 object-contain rounded border border-gray-300 mb-2"
                      />
                    </div>
                  )}
                  <p className="text-sm text-gray-700 font-medium">
                    {attachmentName}
                  </p>
                </div>
              )}

              <input
                id="fileUpload"
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setAttachmentName(file.name);
                    const reader = new FileReader();
                    reader.onloadend = () =>
                      setAttachment(reader.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
                className="hidden"
              />
            </label>

            <div
              className="flex items-center justify-center gap-2 mt-4 cursor-pointer text-orange-500 hover:text-orange-600 text-sm font-medium"
              onClick={() => document.getElementById("fileUpload")?.click()}
            >
              <span className="text-xl font-bold">+</span>
              <span>Add more attachment</span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="sticky bottom-0 right-0 w-full bg-white py-8 border-t border-gray-200 mt-12">
            <div className="w-full pl-[2em] mx-auto flex justify-start gap-4 items-end pr-4 cursor-pointer">
              <button className="bg-white text-[#F16722] px-6 py-2 rounded-lg font-semibold hover:bg-orange-200 transition duration-300 border border-[#F16722]"       onClick={() => setShowDraftModal(true)}>
           Save as Draft
              </button>
              <button
                className="bg-[#F16722] text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition duration-300"
                onClick={handleContinue}
              >
         Add Recipient and Issue
              </button>
            </div>
          </div>
        </div>
      
    </>
  );
}
