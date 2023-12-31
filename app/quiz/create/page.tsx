"use client";
import CustomToaster from "@/components/CustomToast";
import { HalfCircleIcon } from "@/components/icons";
import { ResponseInternal } from "@/lib/utils/sendResponse";
import { usePostQuizMutation } from "@/redux/api/quiz";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  question: z.string(z.number()).min(1, { message: "Enter question!" }),
  option1: z.string(z.number()).min(1, { message: "option should be at least 1 character" }),
  option2: z.string(z.number()).min(1, { message: "option should be at least 1 character" }),
  option3: z.string(z.number()).min(1, { message: "option should be at least 1 character" }),
  option4: z.string(z.number()).min(1, { message: "option should be at least 1 character" }),
  answer: z.string(),
  description: z.string().optional(),
});

export type IQuizSchema = z.infer<typeof schema>;

const CreateQuiz = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    getValues,
    formState: { errors },
  } = useForm<IQuizSchema>({ resolver: zodResolver(schema) });
  const [createQuiz, result] = usePostQuizMutation();

  const submitQuiz = async (data: IQuizSchema) => {
    schema.parse(data);
    createQuiz({ ...data, answer: data[data.answer as "option1" | "option2" | "option3" | "option4"] });
    // reset();
  };

  useEffect(() => {
    if (result.isLoading) {
      toast.message("creating quiz.", { icon: <HalfCircleIcon size={25} className="animate-spin ease-linear" /> });
    }

    if (result.isError) {
      let err = result.error as FetchBaseQueryError & { data: ResponseInternal<{}> };
      toast.error(err.data.message);
    }

    if (result.isSuccess) {
      toast.success(result.data.message);
    }
  }, [result.data?.message, result.error, result.isError, result.isLoading, result.isSuccess]);

  const options = [{ value: "option1" }, { value: "option2" }, { value: "option3" }, { value: "option4" }] as const;

  return (
    <>
      <CustomToaster richColors closeButton />
      <form onSubmit={handleSubmit(submitQuiz)} className="pb-12">
        <section className="w-1/2 mx-auto rounded border border-secondary-200">
          <div className="">
            <div className="p-4">
              <p className="pb-3">Enter Your question ?</p>
              <Input {...register("question")} placeholder="enter your quiz" />
              {errors.question && <p className="text-red-500">{errors.question.message}</p>}
            </div>
            <hr className="border-secondary-200 pb-4" />
            <div className="p-3 flex flex-col gap-4">
              <Input defaultValue={""} {...register("option1")} placeholder="option 1" />
              {errors.option1 && <p className="text-red-500">{errors.option1.message}</p>}
              <Input defaultValue={""} {...register("option2")} placeholder="option 2" />
              {errors.option2 && <p className="text-red-500">{errors.option2.message}</p>}
              <Input defaultValue={""} {...register("option3")} placeholder="option 3" />
              {errors.option3 && <p className="text-red-500">{errors.option3.message}</p>}
              <Input defaultValue={""} {...register("option4")} placeholder="option 4" />
              {errors.option4 && <p className="text-red-500">{errors.option4.message}</p>}
              <Textarea
                label="You can write some description here about your question!"
                labelPlacement="outside"
                placeholder="Enter your description"
                className="mt-3"
                defaultValue={""}
                {...register("description")}
              />
            </div>

            <div className="p-3">
              <p className="pb-3">Select Your Answer</p>
              <Select size={"md"} labelPlacement="outside-left" aria-label="not available" className="max-w-xs" {...register("answer")}>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value ?? ""}>
                    {option.value ?? ""}
                  </SelectItem>
                ))}
              </Select>
              {errors.answer && <p className="text-red-500">{errors.answer.message}</p>}
              {/* <Input {...register("answer")} className="w-fit" placeholder="Answer" />
              {errors.answer && <p className="text-red-500">{errors.answer.message}</p>} */}
            </div>
          </div>
          <div className="p-3">
            {errors.root && <p className="text-red-500">{errors.root.message}</p>}
            <Button type="submit" color="primary">
              Create
            </Button>
          </div>
        </section>
      </form>
    </>
  );
};

export default CreateQuiz;
