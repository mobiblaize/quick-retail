import { FormAttribute, ProductAttributeValue } from "../components/dashboard/pointOfSales/productManagement/ProductAttributes";

export function expandFormAttributesToValues(
  formAttributes: FormAttribute[]
): ProductAttributeValue[] {
  return formAttributes.flatMap((attr) =>
    attr.attribute_value_ids.map((valueId) => ({
      attribute_id: String(attr.attribute_id),
      attribute_value_id: String(valueId),
    }))
  );
}
