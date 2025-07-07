import { usePostData } from "../../useApis";

export const useHelp= () => {
    return usePostData("admin/support/create-ticket");
  };