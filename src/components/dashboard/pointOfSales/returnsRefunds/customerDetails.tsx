import { Box, Flex, Image, NumberInput, Paper, Stack, Text } from "@mantine/core";
import { useFetchRetrun, } from "../../../../hooks/backendApis/pos/returns";

interface CustomerDetailsProps {
  returnId: string;
}

const CustomerDetails = ({ returnId }: CustomerDetailsProps) => {

  const { data: returnedData } = useFetchRetrun(returnId || "");

  const product = returnedData?.data?.product_variation;
  const salesOrder = returnedData?.data?.sales_order_detail;
  return (
    <main className="w-full h-auto rounded-lg bg-white px-6 py-8">
      <div className="flex justify-between items-center">
        <Text c="black" size="xl" fw={500}>
          SELECTED PRODUCTS TO RETURN
        </Text>
      </div>

      <Box component="section" mt="md" w="100%">
        <Box w="100%" maw="72rem" mx="auto">
          {/* <ul className="space-y-3"> */}
          <Stack
            component="ul"
            gap="sm"
            m={0}
            p={0}
            style={{ listStyle: "none" }}
          >
            <Paper
              component="li"
              p="md"
              radius="lg"
              shadow="xs"
              bg="#F9FAFB" // gray-50
              withBorder={false}
            >
              <Flex
                direction={{ base: "column", md: "row" }}
                align={{ base: "flex-start", md: "center" }}
                gap="md"
              >
                {/* Product image */}
                <Box
                  style={{
                    width: 80,
                    height: 80,
                    border: "1px solid #E5E7EB", // gray-200
                    borderRadius: 8,
                    overflow: "hidden",
                    flex: "0 0 auto",
                  }}
                >
                  <Image
                    src={product?.image_path || "/placeholder.png"}
                    alt={product?.name || "Product Image"}
                    fit="cover"
                    w="100%"
                    h="100%"
                  />
                </Box>

                <Flex
                  direction={{ base: "column", md: "row" }}
                  justify="space-between"
                  gap="md"
                  style={{ width: "100%" }}
                >
                  {/* Product info */}
                  <Box>
                    <Text fw={600} c="#111827">
                      {product?.name || "Product Name"}
                    </Text>
                    <Text fz="sm" c="#4B5563">
                      EAN: {product?.ean || "N/A"}
                    </Text>
                    <Text fz="sm" c="#4B5563">
                      SKU: {product?.sku || "N/A"}
                    </Text>
                  </Box>

                  {/* Unit price */}
                  <Box ta="center" style={{ minWidth: 90 }}>
                    <Text fz="xs" c="#6B7280">
                      Unit Price
                    </Text>
                    <Text fw={500} c="#6B7280">
                      ₦ {Number(product?.selling_price || 0).toLocaleString()}
                    </Text>
                  </Box>

                  {/* Quantity */}
                  <Box ta="center" style={{ minWidth: 90 }}>
                    <Text fz="xs" c="#6B7280">
                      Return Quantity
                    </Text>
                    <NumberInput
                      min={1}
                      disabled
                      value={salesOrder?.quantity_returned}
                      size="xs"
                      styles={{ input: { textAlign: "center" } }}
                      style={{ width: 64 }}
                    />
                  </Box>

                  {/* Total price */}
                  <Box ta="center" style={{ minWidth: 90 }}>
                    <Text fz="xs" c="#6B7280">
                      Total Price
                    </Text>
                    <Text fw={600} c="#2E90FA">
                      ₦ {Number(salesOrder?.total_price || 0).toLocaleString()}
                    </Text>
                  </Box>
                </Flex>
              </Flex>
            </Paper>
          </Stack>
        </Box>
      </Box>
    </main>
  );
};

export default CustomerDetails;
