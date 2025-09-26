import { useState, useEffect } from "react";
import { Button, Divider, FileButton, Group, NumberInput, Stack, Text } from "@mantine/core";
import FormInput from "../../../General/formInput";
import Dropdown2 from "../../../General/dropdown2";
import {
  useFetchSaleOrderById,
  useLogComplain,
} from "../../../../hooks/backendApis/pos/returns";
import { notifications } from "@mantine/notifications";
import { fileToBase64 } from "../../../../utils/helpers";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../../constants/routes";

const LogOrder = () => {
  const [orderId, setOrderId] = useState<string>("");
  const [submittedOrderId, setSubmittedOrderId] = useState<string>("");
  const [returnReason, setReturnReason] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [quantitiesReturned, setQuantitiesReturned] = useState<{
    [key: string]: number;
  }>({});
  const [defectImages, setDefectImages] = useState<File[]>([]);
  const [selectedItems, setSelectedItems] = useState<{
    [key: string]: boolean;
  }>({});
  const { mutate } = useLogComplain();
  //@ts-ignore
  const { data, error, isLoading } = useFetchSaleOrderById(submittedOrderId, {
    //@ts-ignore
    enabled: !!submittedOrderId,
    //@ts-ignore
  });

  const handleOrderIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderId(e.target.value);
  };

  const handleBlur = () => {
    if (orderId.trim()) {
      setSubmittedOrderId(orderId.trim());
    }
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (orderId.trim()) setSubmittedOrderId(orderId.trim());
    }, 500); // wait 500ms after user stops typing

    return () => clearTimeout(handler);
  }, [orderId]);

  const handleSelectItem = (orderDetailId: string, isChecked: boolean) => {
    setSelectedItems((prev) => ({ ...prev, [orderDetailId]: isChecked }));
  };

  const handleQuantityReturnedChange = (
    orderDetailId: string,
    value: number
  ) => {
    setQuantitiesReturned((prev) => ({ ...prev, [orderDetailId]: value }));
  };

  const handleAddPhotos = (files: File[] | null) => {
    if (files) {
      setDefectImages((prev) => [...prev, ...files]);
    }
  };

  const calculateRefundDetails = () => {
    let subtotal = 0;

    if (data?.data?.sale_order_details) {
      data.data.sale_order_details.forEach((salesOrder: any) => {
        const orderDetailId = salesOrder.order_detail_id;
        const isSelected = selectedItems[orderDetailId];
        const quantityReturned = quantitiesReturned[orderDetailId] || 0;

        if (isSelected && quantityReturned > 0) {
          const unitPrice = Number(
            salesOrder.product_variation?.selling_price || 0
          );
          subtotal += unitPrice * quantityReturned;
        }
      });
    }

    const discount = 0;
    const tax = parseFloat((0.075 * subtotal).toFixed(2));
    const total = subtotal - discount + tax;

    return { subtotal, discount, tax, total };
  };

  const handleSave = async () => {
    // Basic validation
    if (!submittedOrderId) {
      notifications.show({
        title: "Validation Error",
        message: "Please enter a valid Order ID",
        color: "red",
      });
      return;
    }

    if (!returnReason) {
      notifications.show({
        title: "Validation Error",
        message: "Please select a return reason",
        color: "red",
      });
      return;
    }

    // Gather selected order details with quantity returned > 0
    const order_detail = Object.entries(selectedItems)
      .filter(
        ([orderDetailId, isSelected]) =>
          isSelected && (quantitiesReturned[orderDetailId] ?? 0) > 0
      )
      .map(([orderDetailId]) => ({
        order_detail_id: orderDetailId,
        quantity_returned: quantitiesReturned[orderDetailId] || 0,
      }));

    if (order_detail.length === 0) {
      notifications.show({
        title: "Validation Error",
        message:
          "Please select at least one product and specify quantity returned",
        color: "red",
      });
      return;
    }

    let defect_image: string[] = [];
    try {
      defect_image = await Promise.all(defectImages.map(fileToBase64));
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to process images",
        color: "red",
      });
      return;
    }

    // Payload ready
    const payload = {
      order_id: submittedOrderId,
      order_detail,
      return_reason: returnReason,
      notes: notes || null,
      defect_image,
    };

    console.log("Payload to send:", payload);

    mutate(payload, {
      onSuccess: () => {
        notifications.show({
          title: "Return logged!",
          message: "Return information successfully submitted.",
          color: "green",
        });

        // reset form states as needed
        setOrderId("");
        setSubmittedOrderId("");
        setSelectedItems({});
        setQuantitiesReturned({});
        setReturnReason("");
        setNotes("");
        setDefectImages([]);


        navigate(ROUTES.returns);
      },
      onError: () => {
        // notifications.show({
        //   title: "Error",
        //   message: error?.response?.data?.message || "Failed to submit return",
        //   color: "red",
        // });
      },
    });
  };


  return (
    <main className="w-full h-auto rounded-lg bg-white pb-[3em]">
      <div className="px-6 py-2">
        <Text size="lg" fw={500} c="textSecondary.9" tt="uppercase">
          ORDER INFORMATION
        </Text>
      </div>
      <Divider size="sm" className="mt-3" color="#E4E7EC" />

      <section className="grid pt-8 pb-6 px-6 grid-cols-1 md:grid-cols-2 gap-8">
        <FormInput
          type="text"
          label="Order ID"
          placeholder="Enter Order ID"
          paddingY="0.7rem"
          value={orderId}
          onChange={handleOrderIdChange}
          onBlur={handleBlur}
        />
      </section>

      <div className="px-6 mt-[-1rem]">
        {submittedOrderId && isLoading && (
          <Text className="text-sm text-gray-500">Loading...</Text>
        )}
        {submittedOrderId && error && (
          <Text className="text-sm text-red-500 mt-1">
            Error fetching order
          </Text>
        )}
      </div>

      {data?.data?.sale_order_details?.length > 0 && (
        <>
          <section className="mt-6 w-full">
            <div className="grid grid-cols-1 gap-4 w-full max-w-6xl mx-auto pl-3">
              <Text
                size="lg"
                fw={500}
                c="textSecondary.9"
                tt="uppercase"
                className="pl-4"
              >
                ITEMS IN ORDER (SELECT PRODUCTS TO RETURN)
              </Text>
              <ul className="space-y-3">
                {data.data.sale_order_details.map(
                  (salesOrder: any, index: number) => {
                    const product = salesOrder.product_variation;
                    const isSelected =
                      selectedItems[salesOrder.order_detail_id] || false;
                    return (
                      <li
                        key={index}
                        className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 bg-[#F0F2F5]"
                      >
                        <div className="flex items-center gap-2 mb-3 md:mb-0">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) =>
                              handleSelectItem(
                                salesOrder.order_detail_id,
                                e.target.checked
                              )
                            }
                            className="w-5 h-5"
                          />
                          <img
                            src={product?.image_path || "/placeholder.png"}
                            alt={product?.name || "Product Image"}
                            className="w-16 h-16 md:w-15 md:h-15 object-cover"
                          />
                        </div>

                        <div className="flex flex-col md:flex-row flex-1 justify-between w-full gap-4">
                          <Stack gap={4} align="flex-start">
                            <Text fw={600} c="dark" size="sm">
                              {product?.name || "Product Name"}
                            </Text>

                            <Stack gap={2}>
                              <Text size="xs" c="dimmed">
                                EAN: {product?.ean || "N/A"}
                              </Text>
                              <Text size="xs" c="dimmed">
                                SKU: {product?.sku || "N/A"}
                              </Text>
                            </Stack>
                          </Stack>

                          <Stack
                            gap={2}
                            align="flex-start"
                            className="min-w-[90px] md:items-center"
                          >
                            <Text size="xs" c="dimmed">
                              Unit Price
                            </Text>
                            <Text fw={500} c="dark">
                              ₦ {Number(product?.selling_price || 0).toLocaleString()}
                            </Text>
                          </Stack>

                          <Stack
                            gap={2}
                            align="flex-start"
                            className="min-w-[90px] md:items-center"
                          >
                            <Text size="xs" c="dimmed">
                              Quantity
                            </Text>
                            <FormInput
                              value={salesOrder?.quantity_ordered || 0}
                              min={1}
                            // disabled
                            // hideControls
                            // styles={{
                            //   input: {
                            //     textAlign: "center",
                            //   },
                            // }}
                            // w={{ base: "100%", md: 64 }} // replaces w-full and md:w-16
                            />
                          </Stack>

                          {/* <div className="flex flex-col items-start md:items-center min-w-[90px]">
                            <span className="text-xs text-gray-500">
                              Return Quantity
                            </span>
                            <input
                              type="number"
                              min={1}
                              value={
                                quantitiesReturned[
                                salesOrder.order_detail_id
                                ] || 0
                              }
                              // onChange={(e) =>
                              //   handleQuantityReturnedChange(
                              //     salesOrder.order_detail_id,
                              //     parseInt(e.target.value, 10)
                              //   )
                              // }
                              onChange={(e) => {
                                const inputQty = parseInt(e.target.value, 10);
                                const orderedQty = salesOrder.quantity_ordered;

                                if (inputQty <= orderedQty) {
                                  handleQuantityReturnedChange(salesOrder.order_detail_id, inputQty);
                                } else {
                                  notifications.show({
                                    title: "Invalid Quantity",
                                    message: `You can't return more than ${orderedQty} items.`,
                                    color: "red",
                                  });
                                }
                              }}

                              className="w-full md:w-16 border rounded px-2 py-1 text-center text-gray-700"
                              disabled={!isSelected}
                            />
                          </div> */}


                          <div className="flex flex-col items-start md:items-center min-w-[90px]">
                            <Text size="xs" c="dimmed">
                              Return Quantity
                            </Text>

                            <NumberInput
                              min={1}
                              value={quantitiesReturned[salesOrder.order_detail_id] || 0}
                              onChange={(value) => {
                                const inputQty = Number(value);
                                const orderedQty = salesOrder.quantity_ordered;

                                if (inputQty <= orderedQty) {
                                  handleQuantityReturnedChange(salesOrder.order_detail_id, inputQty);
                                } else {
                                  notifications.show({
                                    title: "Invalid Quantity",
                                    message: `You can't return more than ${orderedQty} items.`,
                                    color: "red",
                                  });
                                }
                              }}
                              disabled={!isSelected}
                              className="w-full md:w-16"
                              styles={{
                                input: {
                                  textAlign: "center",
                                  color: "#374151", // Mantine gray-700
                                },
                              }}
                            />
                          </div>
                        </div>
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          </section>

          <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 mt-12 px-6 gap-4">
            <Dropdown2
              label="Reason for return"
              options={[
                { label: "Damaged product", value: "Damaged product" },
                { label: "Expired Product", value: "Expired Product" },
                { label: "Wrong Product", value: "Wrong Product" },
                { label: "Missing Parts", value: "Missing Parts" },
                { label: "Extra Product", value: "Extra Product" },
                { label: "Others (enter reason in notes)", value: "Others" },
              ]}
              placeholder="Select a reason"
              // paddingY={7}
              value={returnReason}
              onChange={setReturnReason}
              required
              textColorClass="text-gray-800"
            />

            <FormInput
              label="Notes (optional)"
              placeholder="Enter random notes for return"
              // paddingY={7}
              value={notes}
              onChange={(val: string) => setNotes(val)}
            />

            <div className="md:col-span-2">
              {/* <label className="text-red-400 cursor-pointer inline-flex items-center gap-1">
                <span>
                  {defectImages.length > 0 ? "Add More Photos" : "Add Photos"}
                </span>
                <span className="text-lg font-medium pl-2">+</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  multiple
                  onChange={(e) => handleAddPhotos(e.target.files)}
                />
              </label> */}

              <FileButton
                onChange={(files) => handleAddPhotos(files)}
                accept="image/*"
                multiple
              >
                {(props) => (
                  <Button
                    {...props}
                    variant="light"
                    color="orange"
                    radius="md"
                    leftSection={
                      <Text size="lg" fw={500}>
                        +
                      </Text>
                    }
                  >
                    {defectImages.length > 0 ? "Add More Photos" : "Add Photos"}
                  </Button>
                )}
              </FileButton>


              <div className="mt-2 flex gap-4 flex-wrap">
                {defectImages.map((file, index) => (
                  <div key={index} className="relative w-32 h-32">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Defect preview ${index + 1}`}
                      className="w-full h-full object-cover border rounded"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setDefectImages((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                      }}
                      className="absolute top-1 right-1 bg-white text-red-600 border border-red-500 rounded-full w-6 h-6 flex items-center justify-center shadow-sm hover:bg-red-500 hover:text-white transition"
                      title="Remove Image"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {data?.data?.sale_order_details && (
        <div className="mt-6 p-4 rounded-lg bg-gray-50">
          <Text size="lg" fw={500} c="textSecondary.9" tt="uppercase">
            REFUND DETAILS
          </Text>
          <Divider size="sm" className="my-2" color="#E4E7EC" />
          {/* {(() => {
            const { subtotal, discount, tax, total } = calculateRefundDetails();
            return (
              <div className="space-y-2">
                <div className="flex gap-18 text-sm">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="text-gray-900 font-medium">
                    ₦ {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex gap-18 text-sm">
                  <span className="text-gray-700">Discount</span>
                  <span className="text-gray-900 font-medium">
                    ₦ {discount.toLocaleString()}
                  </span>
                </div>
                <div className="flex gap-18 text-sm">
                  <span className="text-gray-700">Tax(VAT)</span>
                  <span className="text-gray-900 font-medium">
                    ₦ {tax.toLocaleString()}
                  </span>
                </div>
                <div className="flex gap-22 text-base font-semibold">
                  <span className="text-gray-800">Total </span>
                  <span className="text-gray-900">
                    ₦ {total.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })()} */}

{(() => {
  const { subtotal, discount, tax, total } = calculateRefundDetails();
  return (
    <Stack gap="xs">
      <Group justify="space-between">
        <Text size="sm" c="dimmed">Subtotal</Text>
        <Text size="sm" fw={500}>
          ₦ {subtotal.toLocaleString()}
        </Text>
      </Group>

      <Group justify="space-between">
        <Text size="sm" c="dimmed">Discount</Text>
        <Text size="sm" fw={500}>
          ₦ {discount.toLocaleString()}
        </Text>
      </Group>

      <Group justify="space-between">
        <Text size="sm" c="dimmed">Tax (VAT)</Text>
        <Text size="sm" fw={500}>
          ₦ {tax.toLocaleString()}
        </Text>
      </Group>

      <Group justify="space-between">
        <Text size="md" fw={600}>Total</Text>
        <Text size="md" fw={600}>
          ₦ {total.toLocaleString()}
        </Text>
      </Group>
    </Stack>
  );
})()}
        </div>
      )}
      {/* <div className="fixed bottom-4 left-4 right-9 flex flex-col md:flex-row justify-end gap-3 z-50">
        <button
          type="button"
          onClick={handleBack}
          className="w-full md:w-auto px-4 py-2 bg-white text-[#F16722] font-semibold border border-[#F16722] rounded-lg"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSave}
          className="w-full md:w-auto px-4 py-2 bg-[#F16722] text-white font-semibold rounded-lg"
        >
          Log Returns
        </button>
      </div> */}



      <div
        key="search-product-buttons"
        className="flex gap-4 justify-end mt-[4em] bg-[#fff] p-4"
      >
        <Button
          variant="outline-primary"
          onClick={handleBack}
          style={{ width: 150 }}
        >
          Cancel
        </Button>

        <Button
          variant="filled-primary"
          onClick={handleSave}
          style={{ width: 150 }}
        >
          Log Return
        </Button>
      </div>
    </main>
  );
};

export default LogOrder;
