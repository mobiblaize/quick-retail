import {  Group, Text, Loader } from "@mantine/core";
import DateFilterMenu from "../../../General/filterMenu";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";
import { useFetchCategorySales, useFetchPopularProducts,  } from "../../../../hooks/backendApis/pos/dashboard";
import DivisionSalePie from "../../../General/DivisionPie";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";


const DivisionSalesOverview = () => {
  const [dateRange, setDateRange] = useState<{
    start_date: string;
    end_date: string;
  }>({
    start_date: "",
    end_date: "",
  });
  const { data, } = useFetchCategorySales(dateRange);
  const { data: productData, isLoading: loadingProducts, error: productError } = useFetchPopularProducts();

  const stats = data?.data;

  const products = productData?.data?.data || [];
  const topProducts = products.slice(0, 3);
  

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
             <Text size="md" fw={400} c="secondary">An overview of sales made</Text>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Group className="w-auto">
              <DateFilterMenu
                onDateFilterChange={({ startDate, endDate }) =>
                setDateRange({
                 //@ts-ignore
                  start_date: startDate.toISOString().split("T")[0],
                  //@ts-ignore
                  end_date: endDate.toISOString().split("T")[0],
                })
              }
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
      {topProducts.map((product: { id: Key | null | undefined; image_path: string | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; selling_price: any; }) => (
        <div
          key={product.id}
          className="flex justify-between items-center px-2 py-2 hover:bg-gray-100 rounded"
        >
          <div className="flex gap-2 items-center">
            <img
              src={product.image_path}
              // @ts-ignore
              alt={product.name}
              className="w-10 h-10 rounded object-cover"
            />
            <div className="flex flex-col">
              <Text fw={500} size="sm">
                {product.name}
              </Text>
              {/* <Text size="xs" c="gray.6">
                Sold: {product.quantity_sold}
              </Text> */}
            </div>
          </div>
          <Text fw={600} size="sm" c="black">
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
