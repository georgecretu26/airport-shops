import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { withFetchStatus } from "@/components/";
import { useFetchShop } from "@/hooks/";
import { FetchStatusDto, ShopDto } from "@/types/";

// Lazy load the conditional components for performance boost
const Image = dynamic(() => import("next/image"));

type ShopDetailsProps = FetchStatusDto & {
  shop: ShopDto | undefined;
};

const ShopDetails = ({ shop }: ShopDetailsProps) => {
  return (
    <div className="container mx-auto p-4">
      {shop?.imageGallery[0] && (
        <Image
          className="rounded-md shadow-md w-full mb-3"
          src={shop?.imageGallery[0]}
          alt={`${shop?.title} image 0`}
          width={500}
          height={300}
        />
      )}
      <h1 className="text-2xl font-bold mb-4">{shop?.title}</h1>
      <p>{shop?.description}</p>
      <p>Location: {shop?.location}</p>
      <p>Opening hours: {shop?.openingHours}</p>
      <p>Phone number: {shop?.phoneNumber}</p>
      <p>Email: {shop?.email}</p>
      <div className="overflow-x-scroll flex my-4">
        {shop?.imageGallery.map(
          (image, index) =>
            index >= 1 && (
              <Image
                className="rounded-md shadow-md mr-4"
                key={index}
                src={image}
                alt={`${shop?.title} image ${index}`}
                width={500}
                height={300}
              />
            )
        )}
      </div>
    </div>
  );
};

const ShopDetailsWithFetchStatus = withFetchStatus(ShopDetails);

const ShopDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: shop, isLoading, error } = useFetchShop(Number(id));

  return (
    <ShopDetailsWithFetchStatus
      isLoading={isLoading}
      error={error}
      shop={shop}
    />
  );
};

export default ShopDetailsPage;
