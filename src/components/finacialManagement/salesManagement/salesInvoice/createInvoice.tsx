import { useEffect, useState } from "react";
import FormInput from "../../../General/formInput";
import FormSelect from "../../../General/select";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";
import CustomDropdown from "../../../General/customDropdown";
import SearchComp from "../../../General/table/searchComp";
import SelectedProduct from "./selectedProduct";
import { ChevronDown, ChevronUp } from "lucide-react";
import PaymentDetails from "./paymentdetails";
import { PRODUCT_LIST } from "../../../../utils/mockData";

export default function CreateInvoice() {
  const [,setCustomer] = useState("");
  const [, setInvoiceType] = useState("");
  const [, setIssueDate] = useState("");
  const [, setBaseCurrency] = useState("");
  const [, setTransactionCurrency] = useState("");
  const [, setAccount] = useState("");
  const [, setProfitCenter] = useState("");
  const [, setComments] = useState("");
  const navigate = useNavigate();

  const handleCancel = () => {
    setCustomer("");
    setInvoiceType("");
    setIssueDate("");
    setBaseCurrency("");
    setTransactionCurrency("");
    setAccount("");
    setProfitCenter("");
    setComments("");
  };

  const handleContinue = () => {
    navigate(ROUTES.previewInvoice);
  };
  const [selectedType, setSelectedType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSelectedProducts, setShowSelectedProducts] = useState(true);
  const [showExchangeRates, setShowExchangeRates] = useState(true);
  const [showAccounts, setShowAccounts] = useState(true);
  const [showBasicInfo, setShowBasicInfo] = useState(true);
  const [showPaymentDetails, setShowPaymentDetails] = useState(true);
  const [products] = useState(PRODUCT_LIST); // could be from API
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    const filtered = products.filter(
      (product: { name: string; sku: string }) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );
   {/* @ts-ignore */}
    setSearchResults(filtered);
  }, [searchTerm, products]);

  const handleSelectProduct = (product: any) => {
       {/* @ts-ignore */}
    if (!selectedProducts.find((p) => p.id === product.id)) {
           {/* @ts-ignore */}
      setSelectedProducts((prev) => [...prev, product]);
      setSearchTerm(""); 
      setSearchResults([]); 
  };
}

  return (
    <div className="">
      <div className="md:col-span-2 space-y-8">
        <div className="grid ">
          <div className="flex flex-col">
            <div className="flex flex-row gap-8">
              <div className="flex flex-col w-[100%] ">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <div className="flex justify-between items-center border-b border-gray-200 mb-4">
                    <h2 className="text-lg font-medium text-gray-800 uppercase">
                      BASIC INFORMATION<span className="text-[red]"> *</span>
                    </h2>
                    <button
                      onClick={() => setShowBasicInfo((prev) => !prev)}
                      className="text-gray-600 hover:text-black transition"
                    >
                      {showBasicInfo ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>
                  </div>

                  {showBasicInfo && (
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <FormInput
                          type="text"
                          label="Issuer"
                          paddingY={"0.7rem"}
                        />
                        <FormInput
                          type="date"
                          label="Issue Date"
                          paddingY={"0.7rem"}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <CustomDropdown
                          label="Customer"
                          options={["Customer 1", "Customer 2", "Customer 3"]}
                          value={selectedType}
                          onChange={(val) => setSelectedType(val)}
                          optional
                          textColorClass="text-white"
                        />
                        <FormInput
                          type="date"
                          label="Due Date"
                          paddingY={"0.7rem"}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
                  <h2 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 uppercase">
                    SELECT PRODUCTS <span className="text-[red]"> *</span>
                  </h2>

                  <SearchComp
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    placeholder="Search by Name SKU etc"
                    iconColor="#667085"
                    placeholderColor="#98A2B3"
                    maxWidth="400px"
                  />

                  {searchResults.length > 0 && (
                    <ul className="mt-4 border rounded-md divide-y">
                      {searchResults.map((product) => (
                        <li
                          //@ts-ignore
                          key={product.id}
                          className="p-4 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSelectProduct(product)}
                        >
                            {/* @ts-ignore */}
                          {product.name} - {product.sku}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Selected Products Section */}
                {selectedProducts.length > 0 && (
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
                    <div className="flex justify-between items-center border-b border-gray-200 mb-4">
                      <h2 className="text-lg font-medium text-gray-800 uppercase">
                        SELECTED PRODUCTS ({selectedProducts.length})
                      </h2>
                      <button
                        onClick={() => setShowSelectedProducts((prev) => !prev)}
                        className="text-gray-600 hover:text-black transition"
                      >
                        {showSelectedProducts ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </button>
                    </div>

                    {showSelectedProducts && (
                      <div>
                        {selectedProducts.map(() => (
                          <div className="p-4 border-b last:border-none">
                            <SelectedProduct />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
{selectedProducts.length > 0 && (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
    <div className="flex justify-between items-center border-b border-gray-200 mb-4">
      <h2 className="text-lg font-medium text-gray-800 uppercase">
        PAYMENT DETAILS
      </h2>
      <button
        onClick={() => setShowPaymentDetails((prev) => !prev)}
        className="text-gray-600 hover:text-black transition"
      >
        {showPaymentDetails ? (
          <ChevronUp size={20} />
        ) : (
          <ChevronDown size={20} />
        )}
      </button>
    </div>

    {showPaymentDetails && <PaymentDetails />}
  </div>
)}
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
                  <div className="flex justify-between items-center border-b border-gray-200 mb-4">
                    <h2 className="text-lg font-medium text-gray-800 uppercase">
                      EXCHANGE RATES<span className="text-[red]"> *</span>
                    </h2>
                    <button
                      onClick={() => setShowExchangeRates((prev) => !prev)}
                      className="text-gray-600 hover:text-black transition"
                    >
                      {showExchangeRates ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>
                  </div>

                  {showExchangeRates && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <FormInput
                        type="number"
                        label="Base Currency"
                        paddingY={"0.7rem"}
                        leftPrefix="NGN"
                      />

                      <FormInput
                        type="number"
                        label="Current Transaction Currency"
                        paddingY={"0.7rem"}
                        leftPrefix="USD"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-[100%]">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
                <div className="flex justify-between items-center border-b border-gray-200 mb-4">
                  <h2 className="text-lg font-medium text-gray-800 uppercase">
                    ACCOUNTS AND PROFIT CENTRE
                    <span className="text-[red]"> *</span>
                  </h2>
                  <button
                    onClick={() => setShowAccounts((prev) => !prev)}
                    className="text-gray-600 hover:text-black transition"
                  >
                    {showAccounts ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>
                </div>

                {showAccounts && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <FormSelect
                      type="text"
                      label="Accounts"
                      paddingY="4"
                      options={[]}
                      placeholder="Input"
                    />

                    <FormSelect
                      type="text"
                      label="Profit Center"
                      paddingY="4"
                      options={[]}
                      placeholder="Profit center 01"
                    />
                  </div>
                )}
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
                <h2 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 uppercase">
                  ADDITIONAL COMMENTS<span className="text-[red]"> *</span>
                </h2>

                <div>
                  <div className="">
                    <textarea
                      placeholder="Write comment here..."
                      className=" w-full border-gray-200 outline-none text-sm text-gray-600 border rounded-md pl-4 py-[1em] "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sticky bottom-0 right-0 w-full bg-white py-8 border-t border-gray-200 mt-12">
            <div className="w-[100%] mx-auto flex justify-end gap-4 items-end pr-4 cursor-pointer ">
              <button
                className="bg-[white] cursor-pointer text-[#F16722] px-12 py-2 rounded-lg font-semibold hover:bg-orange-200 transition duration-300 border border-[#F16722]"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="bg-[#F16722] text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition duration-300 cursor-pointer"
                onClick={handleContinue}
              >
                Preview
              </button>
            </div>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
}

