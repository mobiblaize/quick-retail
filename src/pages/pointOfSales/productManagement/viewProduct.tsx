import { Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import { useNavigate, useLocation } from "react-router"; // Use useLocation
import ProductForm from "../../../components/dashboard/pointOfSales/productManagement/productForm";
import ProductImagesSection from "../../../components/dashboard/pointOfSales/productManagement/productImageSection";
import { useSingleProduct } from "../../../hooks/backendApis/pos/products";


const ViewProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const variationID = location.state?.variationID;

  const { data, isLoading } = useSingleProduct(variationID);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Loading Product Data</p>;


  const subHeaders = [
    <div key="1" className="py-2.5">
      <div className="flex gap-8 items-center">
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          Back
        </button>
        <div className="md:flex hidden items-center">
          <Text>In-store management</Text>
          <span className="mx-2">/</span>
          <Text c={"black"}>View Product</Text>
        </div>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <main className="grid gap-8 grid-cols-1 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <ProductForm
            overview={{
              name: data?.data?.name,
              code: data?.data?.code,
              sku: data?.data?.sku,
              ean: data?.data?.ean,
              product: data?.data?.product,
              category: data?.data?.product?.category?.name,
              cost_price: data?.data?.cost_price,
              selling_price: data?.data?.selling_price,
              discount_percentage: data?.data?.product?.discount_percentage,
              promotional_price: data?.data?.product?.promotional_price,
              promotional_start_date:
                data?.data?.product?.promotional_start_date,
              long_description: data?.data?.product?.long_description,
              tags: data?.data?.product?.tags,
              safety_instruction: data?.data?.product?.safety_instruction,
              notes: data?.data?.product?.notes,
              safety_instructions: data?.data?.product?.safety_instructions,
              reorder_level: data?.data?.reorder_level,
              quantity: data?.data?.quantity_available,
              variation_attributes: [
                { id: 11, option_type: "size", option_value: "L" },
                { id: 12, option_type: "colour", option_value: "Blue" },
              ],
             
            }}
          />
        </div>
        <div className="order-1 md:order-2">
          <ProductImagesSection details={{
                image: data?.data?.image_path,
                image_path: data?.data?.product?.image_path,
          }} />
        </div>
      </main>
    </PageContainer>
  );
};

export default ViewProduct;
