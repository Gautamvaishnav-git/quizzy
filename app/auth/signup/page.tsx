"use client";

import { IUser } from "@/app/api/db/schema/schema";
import { usePost } from "@/hooks/use-post.hook";
import { ResponseInternal } from "@/lib/utils/sendResponse";
import { AxiosError } from "axios";
import { useTheme } from "next-themes";
import { Toaster, toast } from "sonner";
import Signup from "./signup";

type Payload = Pick<IUser, "email" | "password" | "userName">;

type ErrorResponse = ResponseInternal<{ success: boolean }>;

const Page = () => {
  const response = usePost<ResponseInternal<{ success: boolean }>, Payload, AxiosError<ErrorResponse>>({
    endPoint: "/api/auth/signup",
  });

  const signUp = (data: Payload) => {
    response.mutate(data, {
      onError: (err) => {
        toast.error(err.response?.data.message);
      },
      onSuccess: (data) => {
        toast.success(data.data.message);
      },
    });
  };
  const { theme } = useTheme();
  return (
    <div className="h-fit flex items-center justify-center">
      <Toaster richColors closeButton={true} theme={theme === "dark" ? "dark" : "light"} />
      <Signup signUp={signUp} isLoading={response.isLoading} key={"signup_component"} />
    </div>
  );
};

export default Page;
