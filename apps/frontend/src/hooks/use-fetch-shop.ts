import { API_ENDPOINTS } from "@/config";
import { ShopDto } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchShop = async (id: ShopDto["id"]): Promise<ShopDto> => {
  const { data } = await axios.get<ShopDto>(
    `${API_ENDPOINTS.FACILITIES}/${id}`
  );
  return data;
};

const useFetchShop = (id: ShopDto["id"]) => {
  return useQuery({
    queryKey: ["shop", id],
    queryFn: () => fetchShop(id),
  });
};

export default useFetchShop;
