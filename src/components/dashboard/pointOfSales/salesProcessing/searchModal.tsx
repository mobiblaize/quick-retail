import { Modal, Text } from "@mantine/core";

interface ProductModalProps {
  opened: boolean;
  onClose: () => void;
  products: Array<{ name: string; variationID: string }>;
}

const ProductModal = ({ opened, onClose, products }: ProductModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="All Available Products"
      size="lg"
    >
      <ul className="space-y-2">
        {products.map((product) => (
          <li key={product.variationID} className="py-2 border-b">
            <Text>{product.name}</Text>
          </li>
        ))}
      </ul>
    </Modal>
  );
};

export default ProductModal;
