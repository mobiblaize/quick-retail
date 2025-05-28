import {  Group, Text, Loader } from "@mantine/core";
import DateFilterMenu from "../../../General/filterMenu";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";
import { useFetchCategorySales,  } from "../../../../hooks/backendApis/pos/dashboard";
import DivisionSalePie from "../../../General/DivisionPie";
import { useFetchAllProducts } from "../../../../hooks/backendApis/pos/products";


const DivisionSalesOverview = () => {

  const { data, } = useFetchCategorySales();
  const { data: productData, isLoading: loadingProducts, error: productError } = useFetchAllProducts();

  const stats = data?.data;
  const products = productData?.data?.products?.data || [];
const topProducts = [...products]
  .sort((a, b) => b.quantity_sold - a.quantity_sold)
  .slice(0, 3); // adjust to show top 3 or more


  return (
    <main className="flex flex-col lg:flex-row gap-6">
      {/* Left Section */}
  

      {/* Right Section */}
      <section className="w-full lg:w-[65%] h-auto px-3 sm:px-4 py-6 sm:py-8 rounded-lg bg-white">
        <div className="flex justify-between items-center">
          <div className="flex-col">
            <Text size="xl" fw={600} c="textSecondary.9">
              Division Sale Overview
            </Text>
            <span className="text-gray-400 font-normal">
              An overview of sales made
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Group className="w-auto">
              <DateFilterMenu
                defaultFilter="This Month"
                buttonVariant="subtle"
                buttonSize="md"
                showIconOnly="sm"
              />
            </Group>
          </div>
        </div>

        <DivisionSalePie data={stats ?? []} />

      </section>

      <section className="w-full lg:w-[35%] h-auto px-4 sm:px-6 py-6 sm:py-8 rounded-lg bg-white">
  <div className="flex flex-col">
    <Text size="xl" fw={600} c="textSecondary.9">
      Popular Products
    </Text>
    <Text className="secondary font-normal">
      Based on quantity sold
    </Text>
  </div>

  {loadingProducts ? (
    <div className="flex justify-center py-6">
      <Loader size="sm" />
    </div>
  ) : productError ? (
    <Text c="red" className="mt-4">
      Failed to load products
    </Text>
  ) : (
    <div className="mt-6 flex flex-col gap-4">
      {topProducts.map((product) => (
        <div
          key={product.id}
          className="flex justify-between items-center px-2 py-2 hover:bg-gray-100 rounded"
        >
          <div className="flex gap-2 items-center">
            <img
              src={product.image_path}
              alt={product.name}
              className="w-10 h-10 rounded object-cover"
            />
            <div className="flex flex-col">
              <Text fw={500} size="sm">
                {product.name}
              </Text>
              <Text size="xs" c="gray.6">
                Sold: {product.quantity_sold}
              </Text>
            </div>
          </div>
          <Text fw={600} size="sm" c="customPrimary.10">
            ₦{Number(product.selling_price).toLocaleString()}
          </Text>
        </div>
      ))}
    </div>
  )}

  <Link to={ROUTES.productManagement}>
    <Text
      className="text-center cursor-pointer"
      c="customPrimary.10"
      fw={600}
      mt={6}
    >
      View All
    </Text>
  </Link>
</section>

    </main>
  );
};

export default DivisionSalesOverview;
