import { useState, useEffect, SetStateAction } from "react";
import { Divider, Loader, Text, Box, Group, Stack, Image, Button } from "@mantine/core";
import FormInput from "../../../General/formInput";
import { Search, X } from "lucide-react";
// import { SqrCode } from "../../../../assets/svg";
import { useSearchLocationProducts } from "../../../../hooks/backendApis/pos/products";
import { formatMoney } from "../../../../utils/helpers";
import { useOrderStore } from "../../../../hooks/useOrderFormStore";

interface SelectedItemPayload {
  variationId: string;
  quantity: number;
}

interface SelectedItem {
  variationId?: string;
  quantity?: number;
  price?: number;
  name?: string;
  custom?: boolean;
  [key: string]: any;
}

interface SearchProductProps {
  onSelect: (value: string | { custom: true; name: string }) => void;
  onItemsChange: (items: SelectedItemPayload[]) => void;
  initialItems?: SelectedItem[];
}

const SearchProduct = ({
  onSelect,
  onItemsChange,
  initialItems = [],
}: SearchProductProps) => {
  const { items, setItems } = useOrderStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  // const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>(items);
  const [hasSetInitial, setHasSetInitial] = useState(false);

  // useEffect(() => {
  //   // @ts-ignore
  //   setItems(selectedItems);
  //   // @ts-ignore
  //   onItemsChange(selectedItems);
  // }, [selectedItems]);

  useEffect(() => {
    if (!hasSetInitial && initialItems.length > 0) {
      setSelectedItems((prev) => {
        const newItems = initialItems.filter((initial) => {
          if (initial.custom) {
            return !prev.some((p) => p.custom && p.name === initial.name);
          }
          return !prev.some((p) => p.variationId === initial.variationId);
        });
        return [...prev, ...newItems];
      });
      setHasSetInitial(true);
    }
  }, [initialItems, hasSetInitial]);

  // useEffect(() => {
  //   //  @ts-ignore */
  //   onItemsChange(selectedItems);
  // }, [selectedItems, onItemsChange]);

  useEffect(() => {
    //  @ts-ignore
    setItems(selectedItems);
    //  @ts-ignore
    onItemsChange(selectedItems);
  }, [selectedItems]);


  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const { data, isLoading } = useSearchLocationProducts(
    { search: debouncedSearch },
    !!debouncedSearch
  );

  const products = data?.products?.data
    ? data.products.data
    : data?.data
      ? [data.data]
      : [];

  const handleSelect = (item: {
    name: string;
    custom: boolean;
    variationId?: string;
    [key: string]: any;
  }) => {
    const itemWithDefaultQuantity = {
      ...item,
      quantity: 1,
    };

    setSelectedItems((prev) => {
      const exists = item.custom
        ? prev.some((i) => i.custom && i.name === item.name)
        : prev.some((i) => i.variationId === item.variationId);

      if (exists) return prev;
      return [...prev, itemWithDefaultQuantity];
    });

    if (item.custom) {
      onSelect({ custom: true, name: item.name });
    } else if (item.variationId) {
      onSelect(item.variationId);
    }

    setSearchTerm("");
  };

  const handleQuantityChange = (itemKey: any, value: number) => {
    /* @ts-ignore */
    setSelectedItems((prev) =>
      prev.map((item) =>
        /* @ts-ignore */
        (item.custom ? `custom-${item.name}` : item.variationID) === itemKey
          ? /* @ts-ignore */
          { ...item, quantity: value }
          : item
      )
    );
  };
  useEffect(() => { }, [initialItems]);

  return (
    <Box
      w="100%"
      h="auto"
      style={(theme) => ({
        borderRadius: theme.radius.lg,
        backgroundColor: "white",
      })}
    >
      <Box px="lg" py="xs">
        <Group justify="space-between" align="center">
          <Text size="lg" fw={500} c="textSecondary.9" tt="uppercase">
            Search Product
          </Text>
          {/* {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />} */}
        </Group>
      </Box>

      <Divider size="sm" mt="xs" mb="md" color="#E4E7EC" />

      <Box pt="md" pb="md" px="lg">
        <Box maw={400}>
          <FormInput
            placeholder="Search by Name."
            value={searchTerm}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setSearchTerm(e.target.value)
            }
            leftIcon={<Search color="#667185" />}
          // rightIcon={<SqrCode />}
          />
        </Box>
      </Box>

      {isLoading && (
        <Box px="lg" py="xs">
          <Loader size="sm" />
        </Box>
      )}

      {!isLoading && debouncedSearch && (
        <Box px="lg" pb="md">
          <Stack gap="xs" mah={256} style={{ overflowY: "auto" }}>
            {products.length > 0 ? (
              products.map(
                (item: {
                  variationID: any;
                  image_path?: any;
                  name: any;
                  sku?: any;
                  variation_attributes?: any;
                  product?: any;
                  quantity?: number;
                  quantity_available?: number;
                  custom?: any;
                }) => {
                  const isOutOfStock =
                    item.quantity === 0 ||
                    item.quantity_available === 0;

                  return (
                    <Box
                      key={item.variationID}
                      onClick={() => {
                        if (!isOutOfStock) {
                          handleSelect({
                            // @ts-ignore
                            name: item.name,
                            custom: false,
                            variationId: item.variationID,
                            image_path: item.image_path,
                            // @ts-ignore
                            selling_price: item.selling_price,
                            sku: item.sku,
                            // @ts-ignore
                            ean: item.ean,
                            quantity: 1,
                            ...item,
                          });
                        }
                      }}
                      p="md"
                      style={(theme) => ({
                        borderRadius: theme.radius.md,
                        border: `1px solid ${isOutOfStock ? theme.colors.red[2] : theme.colors.gray[2]}`,
                        backgroundColor: isOutOfStock ? theme.colors.red[0] : "transparent",
                        cursor: isOutOfStock ? "not-allowed" : "pointer",
                        "&:hover": {
                          backgroundColor: isOutOfStock
                            ? theme.colors.red[0]
                            : theme.colors.gray[0],
                        },
                      })}
                    >
                      <Group gap="md" align="flex-start">
                        <Image
                          src={item.image_path}
                          alt={item.name}
                          w={48}
                          h={48}
                          style={{ objectFit: "cover" }}
                          radius="md"
                        />
                        <Stack gap="xs" style={{ flex: 1 }}>
                          <Text fw={500}>{item.name}</Text>

                          {/* Stock warning */}
                          {isOutOfStock && (
                            <Text size="xs" fw={600} c="red.5">
                              No stock
                            </Text>
                          )}

                          <Text size="sm" c="gray.6">{item.sku}</Text>
                          <Text size="sm" c="gray.6">
                            {item.variation_attributes
                              ?.map(
                                (attr: { option_type: any; option_value: any }) =>
                                  `${attr.option_type}: ${attr.option_value}`
                              )
                              .join(", ")}
                          </Text>
                          <Text size="xs" c="gray.5">
                            {item.product?.location?.name},{" "}
                            {item.product?.location?.state}
                          </Text>
                        </Stack>
                      </Group>
                    </Box>
                  );
                }
              )
            ) : (
              <Box
                onClick={() =>
                  handleSelect({ name: debouncedSearch, custom: true })
                }
                p="md"
                style={(theme) => ({
                  borderRadius: theme.radius.md,
                  backgroundColor: theme.colors.yellow[0],
                  border: `1px solid ${theme.colors.yellow[3]}`,
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: theme.colors.yellow[1],
                  },
                })}
              >
                <Text c="yellow.8" fs="italic">
                  Use custom entry: <Text component="span" fw={600}>{debouncedSearch}</Text>
                </Text>
              </Box>
            )}
          </Stack>
        </Box>
      )}

      {/* New selected items section */}
      {selectedItems.length > 0 && (
        <Box px="lg" py="md" mt="lg" style={(theme) => ({
          borderTop: `1px solid ${theme.colors.gray[3]}`,
          width: "100%",
        })}>
          <Text size="md" fw={600} c="black" mb="sm">
            SELECTED PRODUCTS ({selectedItems.length})
          </Text>
          <Stack gap="md">
            {selectedItems.map((item) => {
              {
                /* @ts-ignore */
              }
              const itemKey = item.custom
                ? /* @ts-ignore */
                `custom-${item.name}`
                : /* @ts-ignore */
                item.variationId;
              /* @ts-ignore */
              const quantity = item.quantity ?? 0;
              /* @ts-ignore */
              const unitPrice = Number(item.selling_price || 0);
              const totalPrice = unitPrice * quantity;

              return (
                <Box
                  /* @ts-ignore */
                  key={itemKey}
                  p="md"
                  style={(theme) => ({
                    borderRadius: theme.radius.md,
                    backgroundColor: theme.colors.gray[0],
                  })}
                >
                  <Group gap="md" align="flex-start">
                    {/* Image */}
                    {/* @ts-ignore  */}
                    {!item.custom && (
                      /* @ts-ignore */
                      <Image
                        /* @ts-ignore */
                        src={item.image_path}
                        /* @ts-ignore */
                        alt={item.name}
                        w={64}
                        h={64}
                        style={{ objectFit: "cover" }}
                        radius="md"
                      />
                    )}

                    {/* Content */}
                    <Group gap="lg" style={{ flex: 1 }} justify="space-between" wrap="nowrap">
                      {/* Name, EAN, SKU */}
                      <Stack gap="xs" style={{ flex: 1, minWidth: 0 }}>
                        <Text fw={500} c="dark.9">
                          {/* @ts-ignore */}
                          {item.name}
                        </Text>
                        {/* @ts-ignore */}
                        {item.ean && (
                          <Text size="sm" c="gray.6">
                            {/* @ts-ignore */}
                            EAN: <Text component="span" fw={500}>{item.ean}</Text>
                          </Text>
                        )}
                        {/* @ts-ignore */}
                        {item.sku && (
                          <Text size="sm" c="gray.6">
                            {/* @ts-ignore */}
                            SKU: <Text component="span" fw={500}>{item.sku}</Text>
                          </Text>
                        )}
                      </Stack>

                      {/* Unit Price */}
                      <Stack gap="xs" align="center" miw={80}>
                        <Text size="xs" c="gray.8">Unit Price</Text>
                        <Text fw={500} size="sm">
                          ₦ {formatMoney(unitPrice.toFixed(2))}
                        </Text>
                      </Stack>

                      {/* Quantity Input */}
                      <Stack gap="xs" miw={80}>
                        <Text size="xs" c="gray.8">Quantity</Text>
                        <FormInput
                          type="number"
                          min={1}
                          /* @ts-ignore */
                          value={item.quantity?.toString() ?? ""}
                          onChange={(e: { target: { value: any } }) => {
                            const val = e.target.value;

                            if (val === "") {
                              // @ts-ignore
                              handleQuantityChange(itemKey, "");
                              return;
                            }

                            const parsed = parseInt(val, 10);
                            if (!isNaN(parsed) && parsed >= 1) {
                              handleQuantityChange(itemKey, parsed);
                            }
                          }}
                          className="w-20 font-medium"
                        />
                      </Stack>

                      {/* Total Price */}
                      <Stack gap="xs" align="center" miw={80}>
                        <Text size="xs" c="gray.9">Total Price</Text>
                        <Text fw={600} c="#2E90FA" size="sm">
                          ₦ {formatMoney(totalPrice.toFixed(2))}
                        </Text>
                      </Stack>

                      {/* Remove Button */}
                      <Button
                        variant="subtle"
                        color="red"
                        size="xs"
                        onClick={() => {
                          setSelectedItems((prev) =>
                            prev.filter((i) =>
                              item.custom
                                ? !(i.custom && i.name === item.name)
                                : i.variationID !== item.variationID
                            )
                          );
                        }}
                        leftSection={<X size={14} />}
                      >
                        <Text size="sm" fw={500} c="red">
                          Remove
                        </Text>
                      </Button>
                    </Group>
                  </Group>
                </Box>
              );
            })}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default SearchProduct;
