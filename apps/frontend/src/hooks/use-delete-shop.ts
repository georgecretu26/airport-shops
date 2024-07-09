import { API_ENDPOINTS } from "@/config";
import { ShopDto } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const deleteShop = async (id: ShopDto["id"]) => {
  await axios.delete(`${API_ENDPOINTS.FACILITIES}/${id}`);
};

const useDeleteShop = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteShop,
    onError: (error) => {
      console.error("Error deleting shop:", error);
      alert("Error deleting shop");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["shops"] });
    },
  });
};

export default useDeleteShop;
