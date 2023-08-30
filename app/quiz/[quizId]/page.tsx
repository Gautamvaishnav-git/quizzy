"use client";
import { subtitle, title } from "@/components/primitives";
import { useAppSelector } from "@/redux/store";
import React from "react";

const Page = ({ params }: { params: { quizId: string } }) => {
  const quizSlice = useAppSelector((state) => state.quizSlice);
  const question = quizSlice.find((quiz) => quiz.quizID === params.quizId);
  return (
    <section>
      <div className="py-4">
        <h2 className={title({ color: "violet", className: "capitalize" })}>{question?.question}</h2>
      </div>
      <div className="py-3">
        <ul className="p-3 border rounded border-primary-200 space-y-3">
          <h4 className="p-1 text-secondary">Options:</h4>
          <li className="p-2 rounded-lg bg-default-100">{question?.option1}</li>
          <li className="p-2 rounded-lg bg-default-100">{question?.option2}</li>
          <li className="p-2 rounded-lg bg-default-100">{question?.option3}</li>
          <li className="p-2 rounded-lg bg-default-100">{question?.option4}</li>
        </ul>
      </div>
      <div className="bg-success-100 p-3 rounded">
        <h4 className="">Answer:</h4>
        <p className="text-xl capitalize font-semibold">{question?.answer}</p>
      </div>

      {question?.description && (
        <>
          <div className="py-8">
            <h4 className="font-bold italic pb-3 text-primary-400 text-xl">Description :</h4>
            <p className="p-4 bg-default-100 rounded"> {question?.description}</p>
          </div>
        </>
      )}
    </section>
  );
};

export default Page;
