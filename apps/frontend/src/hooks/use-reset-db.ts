import { API_ENDPOINTS } from "@/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const resetDatabase = async () => {
  const response = await axios.post(`${API_ENDPOINTS.FACILITIES}/reset`);
  return response.data;
};

const useResetDatabase = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resetDatabase,
    onSuccess: () => {
      alert("Database reset to initial seed.");
    },
    onError: (error) => {
      console.error("Error resetting database:", error);
      alert("Error resetting database.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["shops"] });
    },
  });
};

export default useResetDatabase;
