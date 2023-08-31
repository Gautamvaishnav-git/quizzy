import type { IUser } from "@/app/api/db/schema/schema";
import { UserSchema } from "@/app/api/db/schema/schema";
import { HalfCircleIcon } from "@/components/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { useForm } from "react-hook-form";

interface SignUpProps {
  signUp: (data: IUser) => void;
  isLoading: boolean;
}

const Signup = ({ signUp, isLoading }: SignUpProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    resolver: zodResolver(UserSchema.pick({ email: true, password: true, userName: true })),
  });

  return (
    <form onSubmit={handleSubmit((data) => signUp(data))} className="w-full flex flex-col items-center justify-center pt-28">
      <div className="flex items-center flex-col gap-5 w-1/3 border px-3 py-8 border-primary rounded">
        <Input placeholder="User Name" type="text" defaultValue={""} {...register("userName")} />
        {errors.userName && <p className="w-full text-danger">{errors.userName.message}</p>}
        <Input placeholder="Email" type="email" defaultValue={""} {...register("email")} />
        {errors.email && <p className="w-full text-danger">{errors.email.message}</p>}
        <Input placeholder="Password" type="password" defaultValue={""} {...register("password")} />
        {errors.password && <p className="w-full text-danger">{errors.password.message}</p>}
        <Button type="submit" variant="shadow" color="secondary" disabled={isLoading} isDisabled={isLoading}>
          {isLoading && <HalfCircleIcon size={20} className="animate-spin ease-linear" />}
          Sign Up
        </Button>
        <div className="flex items-center justify-between w-full">
          <p>Already have an account?</p>
          <Link href="/auth/login" className="text-primary">
            Login
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Signup;
