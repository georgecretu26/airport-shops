import React from "react";
import Link from "next/link";
import useAuth from "../hooks/use-auth";
import { ShopDto } from "@/types";

type ShopListItemProps = {
  shop: ShopDto;
  onDelete?: () => void;
};

const ShopListItem = ({ shop, onDelete }: ShopListItemProps) => {
  const { user } = useAuth();

  return (
    <li className="mb-4">
      <div className="flex justify-between items-center">
        <Link className="text-blue-500" href={`/admin/shops/${shop.id}`}>
          {shop.title}
        </Link>
        {user && (
          <div>
            <Link
              className="text-yellow-500 mr-4"
              href={`/admin/shops/edit/${shop.id}`}
            >
              Edit
            </Link>
            {user.role === "Admin" && (
              <button onClick={onDelete} className="text-red-500">
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </li>
  );
};

export default ShopListItem;
