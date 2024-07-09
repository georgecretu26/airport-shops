import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import axios from "axios";
import { ShopDto } from "@/types";
import { API_ENDPOINTS } from "@/config/";

const createShop = async (shopData: ShopDto) => {
  const response = await axios.post(API_ENDPOINTS.FACILITIES, shopData);
  return response.data;
};
const useCreateShop = (
  options?: UseMutationOptions<ShopDto, unknown, ShopDto>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (shopData: ShopDto) => createShop(shopData),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["shops"] });
    },
    ...options,
  });
};

export default useCreateShop;
