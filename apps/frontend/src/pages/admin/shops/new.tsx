import { useRouter } from "next/router";
import { ShopForm, ProtectedRoute } from "@/components";

const NewShop = () => {
  const router = useRouter();

  const handleSave = () => {
    router.push("/admin");
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Add New Shop</h1>
        <ShopForm onSave={handleSave} />
      </div>
    </ProtectedRoute>
  );
};

export default NewShop;
