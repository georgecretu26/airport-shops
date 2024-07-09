import Link from "next/link";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

import {
  useFetchAllShops,
  useDeleteShop,
  useAuth,
  useResetDatabase,
} from "@/hooks";
import { ProtectedRoute, withFetchStatus } from "@/components";
import { FetchStatusDto, ShopDto } from "@/types";
import { filterArrayItems } from "@/helpers/";

// Lazy load the conditional components for performance boost
const Toast = dynamic(() => import("../../components/Toast"));
const ShopListItem = dynamic(() => import("../../components/ShopListItem"));
const ConfirmationModal = dynamic(
  () => import("../../components/ConfirmationModal")
);

type AdminShopsProps = FetchStatusDto & {
  shops: ShopDto[] | undefined;
};

const AdminShops = ({ shops }: AdminShopsProps) => {
  const { user } = useAuth();
  const {
    mutate: deleteShop,
    error: deleteError,
    isSuccess: isDeleteSuccess,
  } = useDeleteShop();

  const { mutate: resetDatabase, isPending: isResetLoading } =
    useResetDatabase();

  const [selectedShop, setSelectedShop] = useState<ShopDto | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredShops = useMemo(() => {
    if (!shops) return [];

    if (user?.role === "Manager") {
      return shops.filter(
        (shop) =>
          shop.id % (user.assignedShopId ?? 0) === 0 &&
          filterArrayItems(shop, ["title", "description"], searchQuery)
      );
    }

    return shops.filter((shop) =>
      filterArrayItems(shop, ["title", "description"], searchQuery)
    );
  }, [searchQuery, shops, user?.assignedShopId, user?.role]);

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Manage Shops</h1>
        {user?.role === "Admin" && (
          <>
            <button className="bg-blue-500 text-white p-2 m-2 rounded">
              <Link href="/admin/shops/new">Add New Shop</Link>
            </button>
            <button
              disabled={isResetLoading}
              className="bg-red-500 text-white p-2 m-2 rounded"
              onClick={() => resetDatabase()}
            >
              {isResetLoading ? "Resetting..." : "Reset Database"}
            </button>
          </>
        )}
        <input
          type="text"
          placeholder="Search shops..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <ul>
          {filteredShops?.map((shop: ShopDto) => (
            <ShopListItem
              key={shop.id}
              shop={shop}
              onDelete={() => setSelectedShop(shop)}
            />
          ))}
        </ul>
        {selectedShop && (
          <ConfirmationModal
            isOpen={!!selectedShop}
            onConfirm={() => {
              deleteShop(selectedShop.id);
              setSelectedShop(null);
            }}
            onCancel={() => setSelectedShop(null)}
          >
            Are you sure you want to delete {selectedShop.title}?
          </ConfirmationModal>
        )}
        {deleteError && <Toast message="Error deleting shop" type="error" />}
        {isDeleteSuccess && (
          <Toast message="Shop deleted successfully" type="success" />
        )}
      </div>
    </ProtectedRoute>
  );
};

const AdminShopsWithFetchStatus = withFetchStatus(AdminShops);

const AdminShopsPage = () => {
  const { data: shops, isLoading, error } = useFetchAllShops();

  return (
    <AdminShopsWithFetchStatus
      isLoading={isLoading}
      error={error}
      shops={shops}
    />
  );
};

export default AdminShopsPage;
