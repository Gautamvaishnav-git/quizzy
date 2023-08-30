"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { RadioGroup, Radio, Checkbox } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { v4 as uuid4 } from "uuid";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { createQuiz } from "@/redux/slices/quiz";
import { IQuiz, createQuizSchema } from "@/zod/createQuiz.z";

const CreateQuiz = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm<IQuiz>({
    resolver: zodResolver<any>(createQuizSchema),
  });
  const dispatch = useAppDispatch();
  const quizSlice = useAppSelector((state) => state.quizSlice);

  const submitQuiz = (data: IQuiz) => {
    createQuizSchema.parse(data);
    dispatch(createQuiz({ ...data, quizID: uuid4() }));
    reset();
    console.log(quizSlice);
  };

  return (
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
            <Input {...register("option1")} placeholder="option 1" />
            {errors.option1 && <p className="text-red-500">{errors.option1.message}</p>}
            <Input {...register("option2")} placeholder="option 2" />
            {errors.option2 && <p className="text-red-500">{errors.option2.message}</p>}
            <Input {...register("option3")} placeholder="option 3" />
            {errors.option3 && <p className="text-red-500">{errors.option3.message}</p>}
            <Input {...register("option4")} placeholder="option 4" />
            {errors.option4 && <p className="text-red-500">{errors.option4.message}</p>}
            <Textarea
              label="You can write some description here about your question!"
              labelPlacement="outside"
              placeholder="Enter your description"
              className="mt-3"
              {...register("description")}
              defaultValue={""}
            />
          </div>

          <div className="p-3">
            <p className="pb-3">Select Your Answer</p>
            <Input {...register("answer")} className="w-fit" placeholder="Answer" />
            {errors.answer && <p className="text-red-500">{errors.answer.message}</p>}
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
  );
};

export default CreateQuiz;
