"use client";
import { HalfCircleIcon } from "@/components/icons";
import { usePost } from "@/hooks/use-post.hook";
import { ResponseInternal } from "@/lib/utils/sendResponse";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { AxiosError } from "axios";
import { MySqlVarBinaryBuilder } from "drizzle-orm/mysql-core";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";

interface Form {
  email: string;
  password: string;
}

type ErrorResponse = ResponseInternal<{ success: boolean }>;

const Login = () => {
  const { register, handleSubmit } = useForm<Form>({});
  const router = useRouter();
  const { theme } = useTheme();
  const mutation = usePost<ResponseInternal<{ success: boolean }>, Form, AxiosError<ErrorResponse>>({
    endPoint: "/api/auth/login",
    options: {
      onError(error) {
        if (error instanceof AxiosError) {
          const err = error as AxiosError<ErrorResponse>;
          toast.error(err.response?.data.message);
        }
      },
    },
  });
  const login = async (data: Form) => {
    mutation.mutate(data);
    if (mutation.isLoading) {
      toast("Logging in", {
        icon: <HalfCircleIcon size={25} className="animate-spin ease-linear" />,
      });
    }
    if (mutation.isSuccess) {
      toast.success(mutation.data.data.message);
      router.push("/");
    }
  };
  return (
    <form onSubmit={handleSubmit((data) => login(data))} className="w-full flex flex-col items-center justify-center pt-28">
      <Toaster richColors closeButton theme={theme === "dark" ? "dark" : "light"} />
      <div className="flex items-center flex-col gap-5 w-1/3 border px-3 py-8 border-primary rounded">
        <Input placeholder="Email" type="email" defaultValue={""} {...register("email")} />
        <Input placeholder="Password" type="password" defaultValue={""} {...register("password")} />
        <Button type="submit">Login</Button>
      </div>
    </form>
  );
};

export default Login;
