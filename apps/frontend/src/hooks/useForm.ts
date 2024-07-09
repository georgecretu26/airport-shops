import { useState, ChangeEvent } from "react";

export const useForm = <T extends Record<string, any>>(initialValues: T) => {
  const [formData, setFormData] = useState<T>(initialValues);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "imageGallery" ? value.split(",") : value,
    }));
  };

  return { formData, handleChange, setFormData };
};
