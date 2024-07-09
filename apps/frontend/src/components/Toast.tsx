import React from "react";

type ToastProps = {
  message: string;
  type: "success" | "error";
};

const Toast = ({ message, type }: ToastProps) => (
  <div
    className={`fixed bottom-4 right-4 p-4 rounded shadow-lg ${type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
  >
    {message}
  </div>
);

export default Toast;
