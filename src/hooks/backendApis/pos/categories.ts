import { usePostData } from "../../useApis";


export const useCreateCategory = () => {
    return usePostData("pos/category/add-category");
};