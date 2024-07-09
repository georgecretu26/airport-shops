import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { ProtectedRoute, withFetchStatus } from "@/components/";
import { useAuth, useFetchShop } from "@/hooks";
import { FetchStatusDto, ShopDto } from "@/types";

// Lazy load the conditional components for performance boost
const ShopForm = dynamic(() => import("../../../../components/ShopForm"));

type EditShopProps = FetchStatusDto & {
  shop: ShopDto | undefined;
};

const EditShop = ({ shop }: EditShopProps) => {
  const router = useRouter();
  const { user } = useAuth();

  // Restrict managers to only edit their assigned shop
  if (
    user?.role === "Manager" &&
    shop &&
    user.assignedShopId &&
    shop?.id % user.assignedShopId !== 0
  ) {
    return <div>You do not have permission to edit this shop.</div>;
  }

  const handleSave = () => {
    router.push("/admin");
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Edit Shop</h1>
        <ShopForm shop={shop} onSave={handleSave} />
      </div>
    </ProtectedRoute>
  );
};

const EditShopWithFetchStatus = withFetchStatus(EditShop);

const EditShopPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: shop, isLoading, error } = useFetchShop(Number(id));

  return (
    <EditShopWithFetchStatus isLoading={isLoading} error={error} shop={shop} />
  );
};

export default EditShopPage;
