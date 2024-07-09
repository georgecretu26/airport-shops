import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "@/hooks/useForm";
import TextInput from "./TextInput";
import { ShopDto } from "@/types";
import { useCreateShop, useUpdateShop } from "@/hooks/";

type ShopFormProps = {
  shop?: ShopDto;
  onSave?: () => void; // Make onSave optional
};

const ShopForm = ({ shop, onSave }: ShopFormProps) => {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const initialFormData: ShopDto = useMemo(() => {
    return {
      id: shop?.id || 0,
      title: shop?.title || "",
      description: shop?.description || "",
      location: shop?.location || "",
      openingHours: shop?.openingHours || "",
      phoneNumber: shop?.phoneNumber || "",
      email: shop?.email || "",
      logo: shop?.logo || "",
      imageGallery: shop?.imageGallery || [],
      category: shop?.category || "",
      subcategory: shop?.subcategory || "",
      keywords: shop?.keywords || "",
    };
  }, [shop]);

  const { formData, handleChange, setFormData } =
    useForm<ShopDto>(initialFormData);

  useEffect(() => {
    if (shop) {
      setFormData(initialFormData);
    }
  }, [initialFormData, setFormData, shop]);

  const { mutate: updateShop } = useUpdateShop({
    onSuccess: () => {
      setMessage("Shop updated successfully!");
      setError(null);
      if (onSave) onSave(); // Call onSave if provided
    },
    onError: (error) => {
      setError("Error updating shop.");
      setMessage(null);
      console.error("Error updating shop:", error);
    },
  });

  const { mutate: createShop } = useCreateShop({
    onSuccess: () => {
      setMessage("Shop created successfully!");
      setError(null);
      if (onSave) onSave(); // Call onSave if provided
    },
    onError: (error) => {
      setError("Error creating shop.");
      setMessage(null);
      console.error("Error creating shop:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (shop) {
        updateShop({ shopId: shop.id, shopData: formData });
      } else {
        createShop(formData);
      }
    } catch (error) {
      setError("Unexpected error occurred.");
      setMessage(null);
      console.error("Error saving shop:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message && <div className="text-green-500">{message}</div>}
      {error && <div className="text-red-500">{error}</div>}
      <TextInput
        type="text"
        id="title"
        name="title"
        label="Title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <TextInput
        type="textarea"
        id="description"
        name="description"
        label="Description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <TextInput
        type="text"
        id="location"
        name="location"
        label="Location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        required
      />
      <TextInput
        type="text"
        id="openingHours"
        name="openingHours"
        label="Opening Hours"
        placeholder="Opening Hours"
        value={formData.openingHours}
        onChange={handleChange}
        required
      />
      <TextInput
        type="text"
        id="phoneNumber"
        name="phoneNumber"
        label="Phone Number"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
      />
      <TextInput
        type="email"
        id="email"
        name="email"
        label="Email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <TextInput
        type="text"
        id="logo"
        name="logo"
        label="Logo"
        placeholder="Logo"
        value={formData.logo}
        onChange={handleChange}
        required
      />
      <TextInput
        type="text"
        id="imageGallery"
        name="imageGallery"
        label="Image Gallery (comma separated URLs)"
        placeholder="Image Gallery (comma separated URLs)"
        value={formData.imageGallery.join(",")}
        onChange={handleChange}
        required
      />
      <TextInput
        type="text"
        id="category"
        name="category"
        label="Category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        required
      />
      <TextInput
        type="text"
        id="subcategory"
        name="subcategory"
        label="Subcategory"
        placeholder="Subcategory"
        value={formData.subcategory}
        onChange={handleChange}
        required
      />
      <TextInput
        type="text"
        id="keywords"
        name="keywords"
        label="Keywords"
        placeholder="Keywords"
        value={formData.keywords}
        onChange={handleChange}
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Save
      </button>
    </form>
  );
};

export default ShopForm;
