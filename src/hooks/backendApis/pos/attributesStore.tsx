/* eslint-disable @typescript-eslint/no-explicit-any */
// stores/attributesStore.tsx
import { atom, useAtom } from "jotai";
import { useEffect, useCallback } from "react";
import { useGetData, usePostData } from "../../useApis"; // adjust path as needed

/* -------------------------
   Atoms (global state)
   ------------------------- */
export const attributesAtom = atom<any[]>([]);
export const attributeValuesMapAtom = atom<Record<string, any[]>>({});

/* -------------------------
   API hook wrappers
   ------------------------- */

/**
 * Hook: useAttributesStore
 * - Fetches all attributes and keeps attributesAtom in sync
 * - Exposes refetch function and create-attribute mutation
 */
export const useAttributesStore = (enabled = true) => {
  const [attributes, setAttributes] = useAtom(attributesAtom);

  // GET pos/attribute/all-attributes
  const attributesQuery = useGetData("pos/attribute/all-attributes", {}, enabled);
  // Expose refetch via attributesQuery.refetch (if your useGetData follows react-query shape)

  // When API data changes, write only the `data` array into the atom
  useEffect(() => {
    const fetched = (attributesQuery.data as any)?.data;
    if (Array.isArray(fetched)) {
      setAttributes(fetched);
    }
  }, [attributesQuery.data, setAttributes]);

  // Create Attribute (POST pos/attribute/add-attribute)
  // usePostData returns a mutation-like hook in your codebase
  const createAttributeMutation = usePostData("pos/attribute/add-attribute");

  // wrapper helper to call mutation and optionally refetch attributes on success
  const createAttribute = useCallback(
    (payload: { name: string }, options?: { onSuccess?: (res: any) => void; onError?: (err: any) => void }) => {
      // assume createAttributeMutation.mutate exists; if your hook uses mutateAsync adapt accordingly
      return createAttributeMutation.mutate(payload, {
        onSuccess: (res: any) => {
          // try to refetch fresh attributes if refetch function exists
          if (typeof attributesQuery.refetch === "function") {
            attributesQuery.refetch();
          }
          options?.onSuccess?.(res);
        },
        onError: (err: any) => {
          options?.onError?.(err);
        },
      });
    },
    [createAttributeMutation, attributesQuery]
  );

  return {
    // state
    attributes,
    // raw query (in case caller wants isLoading/isFetching/etc)
    attributesQuery,
    // actions
    refetchAttributes: attributesQuery?.refetch,
    createAttributeMutation,
    createAttribute, // convenience wrapper that also triggers refetch
  };
};

/**
 * Hook: useAttributeValues
 * - Fetches attribute-values for a single attribute id and syncs into attributeValuesMapAtom
 * - Exposes the refetch function + the values from the atom (so other components can read the same global state)
 */
export const useAttributeValues = (attributeId: number | string, enabled = true) => {
  const [attributeValuesMap, setAttributeValuesMap] = useAtom(attributeValuesMapAtom);
  const key = String(attributeId);

  // GET pos/attribute/attribute-values/{id}
  const attributeValuesQuery = useGetData(`pos/attribute/attribute-values/${key}`, {}, enabled);

  useEffect(() => {
    const fetched = (attributeValuesQuery.data as any)?.data;
    if (Array.isArray(fetched)) {
      setAttributeValuesMap((prev) => ({ ...prev, [key]: fetched }));
    }
  }, [attributeValuesQuery.data, key, setAttributeValuesMap]);

  // POST pos/attribute/add-attribute-value
  const createAttributeValuesMutation = usePostData("pos/attribute/add-attribute-value");

  // wrapper to submit attribute values and then refetch (if available)
  const createAttributeValues = useCallback(
    (payload: { attribute_id: string | number; value: string[] }, options?: { onSuccess?: (res:any)=>void; onError?: (err:any)=>void }) => {
      return createAttributeValuesMutation.mutate(payload, {
        onSuccess: (res: any) => {
          if (typeof attributeValuesQuery.refetch === "function") {
            attributeValuesQuery.refetch();
          }
          options?.onSuccess?.(res);
        },
        onError: (err: any) => {
          options?.onError?.(err);
        },
      });
    },
    [createAttributeValuesMutation, attributeValuesQuery]
  );

  // value from atom (keeps consumers in sync globally)
  const valuesForAttribute = attributeValuesMap[key] ?? [];

  return {
    attributeValues: valuesForAttribute,
    attributeValuesQuery,         // raw query in case caller needs loading/error flags
    refetchAttributeValues: attributeValuesQuery?.refetch,
    createAttributeValuesMutation,
    createAttributeValues,        // convenience wrapper
  };
};
