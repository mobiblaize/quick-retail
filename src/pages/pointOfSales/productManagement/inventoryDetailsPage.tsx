import { useState } from "react";
import { Button, Text } from "@mantine/core";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../../layout/pageContainer";
import InventoryForm from "../../../components/dashboard/pointOfSales/productManagement/inventoryForm";
import useStore from "../../../components/dashboard/pointOfSales/productManagement/addProductStore";
import { notifications } from "@mantine/notifications";
import { useCreateProduct } from "../../../hooks/backendApis/pos/products";

const InventoryDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { form_data, resetForm } = useStore();
  const { mutate } = useCreateProduct();

  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    if (!form_data.product_name) {
      notifications.show({
        title: "Validation error",
        message: "Please fill all required fields",
        color: "red",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const hasVariations = true;

    const payload = {
      product_name: form_data.product_name,
      sku: form_data.sku,
      category_id: form_data.category_id,
      sub_category_id: form_data.sub_category_id,
      short_description: form_data.short_description,
      long_description: form_data.long_description,
      location_id: form_data.location_id,
      has_variations: hasVariations,
      tags: form_data.tags,
      promotional_price: form_data.promotional_price,
      promotional_start_date: form_data.promotional_start_date,
      safety_instructions: form_data.safety_instructions,
      certificates: form_data.certificates,
      image_path: form_data.image_path || [],
      // Always use variations
      variations: form_data.variations?.map((v) => ({
        cost_price: v.cost_price,
        selling_price: v.selling_price,
        quantity: v.quantity,
        reorder_level: v.reorder_level,
        size: v.size,
        colour: v.color,
        image: form_data.image,
      })),
    };

    setLoading(true);

    mutate(payload, {
      onSuccess: () => {
        setLoading(false); // ✅ Stop loading on success
        notifications.show({
          title: "Success",
          message: "Product added successfully",
          color: "green",
        });
        resetForm(); // ✅ Clear form inputs
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      onError: (error: any) => {
        setLoading(false); // ✅ Stop loading on error
        notifications.show({
          title: "Error",
          message: error?.response?.data?.message || "Failed to add product",
          color: "red",
        });
      },
    });
  };

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
            <Text>Product management</Text>
            <>
              <span className="mx-2">/</span>
              <Text c="black" fw={500}>
                Add Product
              </Text>
            </>
          </div>
        </div>

        <div className="flex sm:hidden gap-2 items-center">{backButton}</div>
      </div>,
      <div key="2">
        <Text fw={500} size="xl" c="black">
          Add Product
        </Text>
      </div>,
    ];

    return subHeaders;
  };

  const getBottomButtons = () => {
    return [
      <div key="search-product-buttons" className="flex gap-4 justify-end">
        <Button variant="outline-primary" onClick={() => navigate(-1)}>
          Prev
        </Button>
        <Button variant="filled-primary" onClick={handleSave} loading={loading}>
          Submit
        </Button>
      </div>,
    ];
  };

  return (
    <PageContainer
      subHeaders={getSubHeaders()}
      subHeaderButtom={getBottomButtons()}
    >
      <InventoryForm />
    </PageContainer>
  );
};

export default InventoryDetailsPage;
