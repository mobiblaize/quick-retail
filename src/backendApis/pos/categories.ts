import { usePostData } from "../../hooks/useApis";

export const useCreateCategory = () => {
    return usePostData("pos/category/add-category");
  };