import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import axios from "axios";
import { ShopDto } from "@/types";
import { API_ENDPOINTS } from "@/config/";

const updateShop = async (shopId: number, shopData: ShopDto) => {
  const response = await axios.put(
    `${API_ENDPOINTS.FACILITIES}/${shopId}`,
    shopData
  );
  return response.data;
};

const useUpdateShop = (
  options?: UseMutationOptions<
    ShopDto,
    unknown,
    { shopId: number; shopData: ShopDto }
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ shopId, shopData }: { shopId: number; shopData: ShopDto }) =>
      updateShop(shopId, shopData),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["shops"] });
    },
    ...options,
  });
};

export default useUpdateShop;
