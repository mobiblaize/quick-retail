// import { Checkbox } from "@mantine/core";
import { Upload, UploadCloud, X } from "lucide-react";
import { useState } from "react";
import FormInput from "../../../General/formInput";
import FormSelect from "../../../General/select";
import AddVariation from "./modal/addVariation";
import { notifications } from "@mantine/notifications";
import { useCreateProduct } from "../../../../hooks/backendApis/pos/products";

const AddProductForm = () => {
  const { mutate, isPending } = useCreateProduct();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [addVariation, setAddVariation] = useState(false);
  // const [variations, setVariations] = useState([
  //   { name: "Size", values: ["S", "M", "L"], label: ["Small", "Medium", "Large"]},
  //   { name: "Colour", values: ["White", "Pink", "Black"], label: ["Small", "Medium", "Large"] },
  // ]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };


  const initialFormState = {
    product_name: "",
    sku: "",
    ean: "",
    category_id: "",
    sub_category_id: "",
    short_description: "",
    long_description: "",
    location_id: "",
    has_variation: "",
    tags: "",
    promotional_price: "",
    promotional_start_date: "",
    promotional_end_date: "",
    safety_instructions: "",
    certificates: "",
    image_path: "",
  };

  

  const [formData, setFormData] = useState({ ...initialFormState });

 const handleSave = () => {
  if (!formData.product_name || !formData.category_id || !formData.location_id || !formData.sku) {
    notifications.show({
      title: 'Validation error',
      message: 'Please fill all required fields',
      color: 'red',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const payload = {
    product_name: formData.product_name,
    sku: formData.sku,
    category_id: formData.category_id,
    sub_category_id: formData.sub_category_id,
    short_description: formData.short_description,
    long_description: formData.long_description,
    location_id: formData.location_id,
    has_variation: formData.has_variation,
    tags: formData.tags,
    promotional_price: formData.promotional_price,
    promotional_start_date: formData.promotional_start_date,
    safety_instructions: formData.safety_instructions,
    certificates: formData.certificates,
    image_path: formData.image_path,
  };

  mutate(payload, {
    onSuccess: () => {
      notifications.show({
        title: 'Success',
        message: 'Product added successfully',
        color: 'green',
      });
      setFormData({ ...initialFormState });
      setSelectedFile(null);
      setIsEnabled(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    onError: (error: any) => {
      notifications.show({
        title: 'Error',
        message: error?.response?.data?.message || 'Failed to add product',
        color: 'red',
      });
    }
  });
};


  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200">
          BASIC INFORMATION
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            type="text"
            label="Product Name"
            placeholder="Enter product name"
            paddingY={"0.7rem"}
            value={formData.product_name}
            onChange={(e: any) =>
              setFormData({ ...formData, product_name: e.target.value })
            }
          />

          {/* <FormInput
            type="text"
            label="Barcode Scan barcode"
            placeholder="Enter barcode"
            paddingY={"0.7rem"}
            value={formData.barcode}
            onChange={(e: any) =>
              setFormData({ ...formData, barcode: e.target.value })
            }
          /> */}

          <FormInput
            type="text"
            label="SKU (Store Keeping Unit)"
            placeholder="Enter SKU"
            paddingY={"0.7rem"}
            value={formData.sku}
            onChange={(e: any) =>
              setFormData({ ...formData, sku: e.target.value })
            }
          />

          <FormSelect
            label="Category"
            placeholder="Select product category"
            options={["Category 1", "Category 2", "Category 3"]}
            name="category"
            paddingY="4"
            value={formData.category_id}
            onChange={(e: any) =>
              setFormData({ ...formData, category_id: e.target.value })
            }
          />

          <FormSelect
            label="Sub-category"
            placeholder="Select sub-category"
            options={["Sub-category 1", "Sub-category 2"]}
            name="sub-category"
            paddingY="4"
            value={formData.sub_category_id}
            onChange={(e: any) =>
              setFormData({ ...formData, sub_category_id: e.target.value })
            }
          />

          {/* <FormSelect
            label="Supplier"
            placeholder="Enter supplier"
            options={["Supplier 1", "Supplier 2"]}
            name="supplier"
            paddingY="4"
          /> */}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[3em]">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200">
          PRICING INFORMATION
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* <div>
            <FormInput
              type="number"
              label="Cost Price"
              placeholder="₦"
              paddingY={"0.7rem"}
              value={formData.costPrice}
              onChange={(e: any) =>
                setFormData({ ...formData, costPrice: e.target.value })
              }
            />
            <Checkbox
              label="Apply to Variations"
              className="mt-2 text-gray-600"
            />
          </div> */}

          {/* <div>
            <FormInput
              type="number"
              label="Selling Price"
              placeholder="₦"
              paddingY={"0.7rem"}
              value={formData.sellingPrice}
              onChange={(e: any) =>
                setFormData({ ...formData, sellingPrice: e.target.value })
              }
            />
            <Checkbox
              label="Apply to Variations"
              className="mt-2 text-gray-600"
            />
          </div> */}

          <FormSelect
            label="Tax %"
            placeholder="Select tax percentage"
            options={["0%", "5%", "10%", "15%"]}
            name="text"
            paddingY="4"
            value={formData.tags}
            onChange={(e: any) =>
              setFormData({ ...formData, tags: e.target.value })
            }
          />

          {/* <FormInput
            type="number"
            label=" Discount"
            paddingY={"0.7rem"}
            optional
            value={formData.discount}
            onChange={(e: any) =>
              setFormData({ ...formData, discount: e.target.value })
            }
          /> */}
        </div>
      </div>

      {/* <div className="mt-12 bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex justify-between items-center max-w-full w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            PRODUCT VARIATIONS
          </h2>

          <div>
            <Switch
              checked={isEnabled}
              onChange={(event) => setIsEnabled(event.target.checked)}
              className={`${
                isEnabled ? "text-orange-600" : "text-gray-300"
              } relative inline-flex h-6 w-12 items-center rounded-full transition`}
            />
            <span
              className={`${
                isEnabled ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </div>
        </div>

        {isEnabled && (
          <>
            <div className="flex justify-end mt-6">
              <button
                className="flex items-center text-orange-600 text-sm font-medium hover:underline"
                onClick={() => setAddVariation(true)}
              >
                Add variation <Plus className="ml-1 w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-6">
              {variations.map((variation, idx) => (
                <div key={idx} className="flex items-start justify-between">
                  <div className="w-[100px] font-semibold text-gray-800">
                    {variation.name}
                  </div>
                  <div className="flex-1 flex flex-wrap gap-2">
                    {variation.values.map((value: string, i: number) => (
                      <span
                        key={i}
                        className="bg-gray-300 text-white text-xs font-medium px-3 py-1 rounded-full"
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 ml-4">
                    <button
                      className="text-red-600 text-sm hover:underline"
                      onClick={() => handleDelete(idx)}
                    >
                      Delete
                    </button>
                    <button className="text-gray-800 text-sm hover:underline">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div> */}

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[3em]">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          PROMOTIONS <span className="text-gray-500">(optional)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            type="number"
            label="Promotion Price"
            paddingY={"0.7rem"}
            placeholder="₦"
            value={formData.promotional_price}
            onChange={(e: any) =>
              setFormData({ ...formData, promotional_price: e.target.value })
            }
          />

          <div className="relative w-full">
            <FormInput
              type="date"
              label="Price Effective Date"
              paddingY={"0.7rem"}
              placeholder="₦"
              value={formData.promotional_start_date}
              onChange={(e: any) =>
                setFormData({ ...formData, promotional_start_date: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[3em]">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          ADDITIONAL INFORMATION
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            type="text"
            label="Short Description"
            paddingY={"0.7rem"}
            placeholder="Enter short product description"
            value={formData.short_description}
            onChange={(e: any) =>
              setFormData({ ...formData, short_description: e.target.value })
            }
          />

          <FormInput
            type="text"
            label="Long Description"
            paddingY={"0.7rem"}
            placeholder="Enter detailed product description"
            optional
            value={formData.long_description}
            onChange={(e: any) =>
              setFormData({ ...formData, long_description: e.target.value })
            }
          />

          <FormInput
            type="text"
            label="Tags"
            paddingY={"0.7rem"}
            placeholder="Enter short product description"
            value={formData.tags}
            onChange={(e: any) =>
              setFormData({ ...formData, tags: e.target.value })
            }
          />

          {/* <FormInput
            type="text"
            label="Notes"
            paddingY={"0.7rem"}
            placeholder="Enter random notes on product, supplier or inventory"
            optional
            value={formData.notes}
            onChange={(e: any) =>
              setFormData({ ...formData, notes: e.target.value })
            }
          /> */}
        </div>

        {/* Product Images Upload Section */}
        <div className="mt-6">
          <h3 className="text-gray-800 font-medium mb-2">Product Images</h3>

          <div className="flex md:flex-row flex-col md:items-center gap-6">
            <div className="w-48 h-48 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center rounded-md cursor-pointer hover:border-blue-500 transition">
              <UploadCloud className="text-gray-400" size={32} />
              <p className="text-orange-500 text-sm font-medium mt-2">
                Click to upload
              </p>
              <p className="text-gray-500 text-xs">or drag and drop</p>
              <p className="text-gray-400 text-xs mt-1">PNG, JPEG (max 5 MB)</p>
            </div>

            <button className="text-orange-500 flex items-center gap-2 font-medium text-sm">
              + Add more photos
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[3em] mb-5 ">
        <h3 className="text-lg font-semibold text-gray-800">
          COMPLIANCE INFORMATION{" "}
          <span className="text-gray-500">(optional)</span>
        </h3>

        <div className="mt-4 w-full md:w-[700px]">
          <FormInput
            type="text"
            label="Safety Instructions"
            paddingY={"0.7rem"}
            placeholder="Enter safety instructions"
            value={formData.safety_instructions}
            onChange={(e: any) =>
              setFormData({ ...formData, safety_instructions: e.target.value })
            }
          />
        </div>

        <div className="mt-6">
          <label className="block text-gray-700 font-medium mb-2">
            Compliance Certificates
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-md p-4 w-[250px] h-[150px] flex flex-col items-center justify-center text-center">
            {selectedFile ? (
              <div className="flex flex-col items-center">
                <p className="text-gray-700 text-sm">{selectedFile.name}</p>
                <button
                  onClick={removeFile}
                  className="text-red-500 mt-2 flex items-center"
                >
                  <X size={16} className="mr-1" /> Remove
                </button>
              </div>
            ) : (
              <>
                <Upload size={24} className="text-gray-500 mb-2" />
                <p className="text-sm text-gray-500">
                  <span className="text-orange-600 font-medium cursor-pointer">
                    Click to upload
                  </span>{" "}
                  or drag and drop <br />
                  <span className="text-gray-700 font-medium">
                    PDF, DOC
                  </span>{" "}
                  (max 5 MB)
                </p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  id="file-upload"
                  onChange={handleFileChange}
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-orange-600 font-medium">
                    Click to upload
                  </span>
                </label>
              </>
            )}
          </div>
        </div>
      </div>
      <AddVariation
        opened={addVariation}
        onClose={() => setAddVariation(false)}
      />
    </div>
  );
};

export default AddProductForm;
