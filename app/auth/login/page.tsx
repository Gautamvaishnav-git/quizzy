"use client";
import { HalfCircleIcon } from "@/components/icons";
import { usePost } from "@/hooks/use-post.hook";
import { ResponseInternal } from "@/lib/utils/sendResponse";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { AxiosError } from "axios";
import { MySqlVarBinaryBuilder } from "drizzle-orm/mysql-core";
import { useTheme } from "next-themes";
import Link from "next/link";
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
  });
  const login = async (data: Form) => {
    mutation.mutate(data, {
      onError: (err) => {
        toast.error(err.response?.data.message);
      },
      onSuccess: (data) => {
        toast.success(data.data.message);
        router.push("/");
      },
    });
  };
  if (mutation.isLoading) {
    toast("Logging in", {
      icon: <HalfCircleIcon size={25} className="animate-spin ease-linear" />,
    });
  }

  return (
    <>
      <Toaster richColors closeButton theme={theme === "dark" ? "dark" : "light"} />
      <form onSubmit={handleSubmit((data) => login(data))} className="w-full flex flex-col items-center justify-center pt-28">
        <div className="flex items-center flex-col gap-5 w-1/3 border px-3 py-8 border-primary rounded">
          <Input placeholder="Email" type="email" {...register("email")} />
          <Input placeholder="Password" type="password" {...register("password")} />
          <Button type="submit" variant="shadow" color="secondary">
            Login
          </Button>
          <div className="flex items-center justify-between w-full">
            <p>Do not have an account?</p>
            <Link href="/auth/signup" className="text-primary">
              Sign up
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
