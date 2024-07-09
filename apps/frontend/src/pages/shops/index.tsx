import { useMemo, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { withFetchStatus } from "@/components/";
import { useFetchAllShops } from "@/hooks/";
import { FetchStatusDto, ShopDto } from "@/types";
import { filterArrayItems } from "@/helpers";
import Image from "next/image";

// Lazy load the conditional components for performance boost
const TextInput = dynamic(() => import("../../components/TextInput"));

type ShopsProps = FetchStatusDto & {
  shops: ShopDto[] | undefined;
};

const Shops = ({ shops }: ShopsProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredShops = useMemo(
    () =>
      !shops
        ? []
        : shops.filter((shop) =>
            filterArrayItems(shop, ["title", "description"], searchQuery)
          ),

    [shops, searchQuery]
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shops</h1>
      <TextInput
        type="text"
        id="search"
        name="search"
        label="Search"
        placeholder="Search shops..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul className="mt-4 grid grid-cols-2 gap-4 ">
        {filteredShops?.map((shop) => (
          <li key={shop.id} className="mb-4">
            <Link href={`/shops/${shop.id}`}>
              <Image
                src={shop.logo}
                alt={shop.title}
                width={150}
                height={130}
              />
              <p className="text-blue-500">{shop.title}</p>
              <p className="text-black-500">{shop.description}</p>
              <p className="text-black-500">{shop.location}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ShopsWithFetchStatus = withFetchStatus(Shops);

const ShopsPage = () => {
  const { data: shops, isLoading, error } = useFetchAllShops();

  return (
    <ShopsWithFetchStatus isLoading={isLoading} error={error} shops={shops} />
  );
};

export default ShopsPage;
