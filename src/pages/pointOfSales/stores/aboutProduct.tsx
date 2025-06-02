import { Loader, Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import { useLocation, useNavigate } from "react-router";
import ProductDetails from "../../../components/dashboard/pointOfSales/stores/productDetails";
import ProductImages from "../../../components/dashboard/pointOfSales/stores/productImages";
import { useSingleProduct } from "../../../hooks/backendApis/pos/products";

const AboutProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { variationID } = location.state || {};
  console.log("Received variationID:", variationID);

  const { data, isLoading,} = useSingleProduct(variationID);
  if (isLoading) return <Loader />;
  const productData = data?.data;
  const subHeaders = [
    <div key="1" className="py-2.5">
      <div className="flex gap-8 items-center">
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          Back
        </button>
        <div className="md:flex hidden items-center">
          <Text>Stores</Text>
          <span className="mx-2">/</span>
          <Text c={"black"}>Ikeja City Mall</Text>
        </div>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <main className="grid gap-8 grid-cols-1 md:grid-cols-2">
        <div className="order-2 md:order-1">
        <ProductDetails productData={productData} />
        </div>
        <div className="order-1 md:order-2">
        <ProductImages productData={productData} />
        </div>
      </main>
    </PageContainer>
  );
};

export default AboutProduct;
