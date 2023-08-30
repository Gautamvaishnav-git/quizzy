"use client";
import { DeleteIcon, EditIcon, PlusIcon, WatchIcon } from "@/components/icons";
import { deleteQuiz } from "@/redux/slices/quiz";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Button } from "@nextui-org/button";
import NextLink from "next/link";

const Page = () => {
  const quizzes = useAppSelector((state) => state.quizSlice);
  const dispatch = useAppDispatch();

  const handleDeleteQuestion = (quizID: string | number) => {
    dispatch(deleteQuiz(String(quizID)));
  };

  return (
    <section>
      <div className="pb-10">
        <Button as={NextLink} href="/quiz/create" color="secondary">
          Create Quiz
          <PlusIcon />
        </Button>
      </div>
      <div className="flex flex-wrap gap-4">
        {quizzes &&
          quizzes.map((quiz) => (
            <div key={quiz.quizID} className="flex flex-col bg-default-100 p-8 rounded grow max-w-sm">
              <p className="first-letter:capitalize">{quiz.question}</p>
              <div className="flex items-center gap-8 w-full pt-4">
                <Button isIconOnly color="secondary" variant="flat" as={NextLink} href={"/quiz/" + quiz.quizID}>
                  <WatchIcon />
                </Button>
                <Button isIconOnly color="success" variant="flat" onClick={() => handleDeleteQuestion(String(quiz.quizID))}>
                  <EditIcon />
                </Button>
                <Button isIconOnly color="danger" variant="flat" onClick={() => handleDeleteQuestion(String(quiz.quizID))}>
                  <DeleteIcon />
                </Button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Page;
