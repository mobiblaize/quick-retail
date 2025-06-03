import { Upload, UploadCloud, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import FormInput from "../../../General/formInput";
import FormSelect from "../../../General/select";
import AddVariation from "./modal/addVariation";
import useStore, { initialFormState } from "./addProductStore";
import {
  useFetchAllCategories,
  useFetchSubCatOfCat,
} from "../../../../hooks/backendApis/pos/categories";
// import { useFetchAllSubCategories } from "../../../../hooks/backendApis/pos/categories";

const AddProductForm = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | string
  >('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [addVariation, setAddVariation] = useState(false);

  const { data: subCatData } = useFetchSubCatOfCat(
  selectedCategoryId, !!selectedCategoryId
);

  const subCategories = Array.isArray(subCatData?.data) ? subCatData.data : [];

  const { data } = useFetchAllCategories();
  const categories = Array.isArray(data?.data?.data) ? data.data.data : [];

  // const { data: subCategoryData } = useFetchAllSubCategories();
  // const subCategories = Array.isArray(subCategoryData?.data?.data)
  //   ? subCategoryData.data.data
  //   : [];

  const categoryOptions =
    Array.isArray(categories) && categories.length > 0
      ? categories.map((cat: { name: string; id: number }) => ({
          label: cat.name,
          value: cat.id,
        }))
      : [];

  const subCategoryOptions =
    Array.isArray(subCategories) && subCategories.length > 0
      ? subCategories.map((cat: { name: string; id: number }) => ({
          label: cat.name,
          value: cat.id,
        }))
      : [];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const { updateForm } = useStore();

  const [formData, setFormData] = useState({ ...initialFormState });

  useEffect(() => {
    updateForm(formData);
  }, [formData]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<File[]>([]);

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // const handleFileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = Array.from(e.target.files || []);
  //   setImages((prev) => [...prev, ...files]);
  //   const file = e.target.files?.[0];

  //   if (file) {
  //     const reader = new FileReader();

  //     reader.readAsDataURL(file);

  //     reader.onload = () => {
  //       setFormData({ ...formData, image: reader.result ?? "" });
  //     };
  //   }
  // };

  const handleFileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Add to the local state for preview
    setImages((prev) => [...prev, ...files]);

    // Convert files to base64 strings
    Promise.all(files.map(fileToBase64))
      .then((base64Images) => {
        const updatedImage = formData.image || base64Images[0]; // first image only if not already set
        const remainingImages =
          formData.image || base64Images.length > 1
            ? base64Images.slice(formData.image ? 0 : 1)
            : [];

        setFormData({
          ...formData,
          image: updatedImage,
          image_path: [...formData.image_path, ...remainingImages],
        });
      })
      .catch((err) => {
        console.error("Failed to read files:", err);
      });
  };

  // Utility function to convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject("Failed to convert file to base64");
        }
      };

      reader.onerror = reject;
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
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

          {/* <FormSelect
            label="Category"
            placeholder="Select product category"
            options={categoryOptions}
            name="category"
            paddingY="4"
            // value={formData.category_id}
            // onChange={(e: any) =>
            //   setFormData({ ...formData, category_id: e.target.value })
            // }
            value={categoryOptions.find(
              (option) => option.value === selectedCategoryId
            )}
            onChange={(option) => setSelectedCategoryId(option?.value)}
            // placeholder="Select Category"
          /> */}
          <FormSelect
            label="Category"
            placeholder="Select product category"
            options={categoryOptions}
            name="category"
            paddingY="4"
            value={selectedCategoryId}
            onChange={(e: any) =>{
               setSelectedCategoryId(Number(e.target.value))
               setFormData({...formData, category_id: e.target.value})
            }}
          />

          <FormSelect
            label="Sub-category"
            placeholder="Select sub-category"
            options={subCategoryOptions}
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

      {/* <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[3em]">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200">
          PRICING INFORMATION
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
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
          </div>

          <div>
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
          </div>

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

          <FormInput
            type="number"
            label=" Discount"
            paddingY={"0.7rem"}
            optional
            value={formData.discount}
            onChange={(e: any) =>
              setFormData({ ...formData, discount: e.target.value })
            }
          />
        </div>
      </div> */}

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

      {/* <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[3em]">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          PROMOTIONS <span className="text-gray-500">(optional)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            type="number"
            label="Promotion Price"
            paddingY={"0.7rem"}
            placeholder="₦"
            value={formData.selling_price}
            onChange={(e: any) =>
              setFormData({ ...formData, selling_price: e.target.value })
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
                setFormData({
                  ...formData,
                  promotional_start_date: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div> */}

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
            placeholder="Enter tags"
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
            {/* Upload Box */}
            <div
              className="w-48 h-48 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center rounded-md cursor-pointer hover:border-blue-500 transition"
              onClick={handleUploadClick}
              role="button"
              aria-label="Upload images"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") handleUploadClick();
              }}
            >
              <UploadCloud className="text-gray-400" size={32} />
              <p className="text-orange-500 text-sm font-medium mt-2">
                Click to upload
              </p>
              <p className="text-gray-500 text-xs">or drag and drop</p>
              <p className="text-gray-400 text-xs mt-1">PNG, JPEG (max 5 MB)</p>
            </div>

            {/* Add More Button */}
            <button
              type="button"
              className="text-orange-500 flex items-center gap-2 font-medium text-sm"
              onClick={handleUploadClick}
            >
              + Add more photos
            </button>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileImageChange}
              accept="image/png, image/jpeg"
              multiple
              className="hidden"
            />
          </div>

          {/* Previews with Remove Option */}
          {images.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-4">
              {images.map((file, index) => (
                <div key={index} className="relative w-24 h-24 group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`preview-${index}`}
                    className="w-full h-full object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-white text-red-500 rounded-full p-1 shadow hover:bg-red-500 hover:text-white transition-opacity opacity-0 group-hover:opacity-100"
                    aria-label="Remove image"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
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
