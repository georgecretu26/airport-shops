import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ShopDto } from "@/types";
import { API_ENDPOINTS } from "@/config";

const fetchAllShops = async (): Promise<ShopDto[]> => {
  const { data } = await axios.get<ShopDto[]>(API_ENDPOINTS.FACILITIES);
  return data;
};

const useFetchAllShops = () => {
  return useQuery({
    queryKey: ["shops"],
    queryFn: fetchAllShops,
    staleTime: 600000, // 10 minutes
    // cacheTime: 900000, // 15 minutes
  });
};

export default useFetchAllShops;
