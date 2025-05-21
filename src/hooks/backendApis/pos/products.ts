import { usePostData  } from "../../useApis";


export const useCreateProduct = () => {
    return usePostData("pos/product/add-product");
};

export const getAllProduct = () => {
    return usePostData("pos/product/all")
}