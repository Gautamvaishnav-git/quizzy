import { useTheme } from "next-themes";
import React from "react";
import { Toaster } from "sonner";

const CustomToaster = (props?: React.ComponentProps<typeof Toaster>) => {
  const { theme } = useTheme();
  return <Toaster theme={theme === "dark" ? "dark" : "light"} {...props} />;
};

export default CustomToaster;
