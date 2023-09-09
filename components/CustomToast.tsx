import { useTheme } from "next-themes";
import React from "react";
import { Toaster } from "sonner";
import { HalfCircleIcon } from "./icons";

const CustomToaster = (props?: React.ComponentProps<typeof Toaster>) => {
  const { theme } = useTheme();
  return <Toaster theme={theme === "dark" ? "dark" : "light"} {...props} />;
};

export const LoadingToast = (props?: React.ComponentProps<typeof HalfCircleIcon>) => {
  return <HalfCircleIcon size={25} {...props} className="animate-spin ease-linear" />;
};

export default CustomToaster;
