"use client";
import CustomToaster, { LoadingToast } from "@/components/CustomToast";
import { DeleteIcon, EditIcon, PlusIcon, WatchIcon } from "@/components/icons";
import { ResponseInternal } from "@/lib/utils/sendResponse";
import { useDeleteQuizMutation, useListQuizQuery } from "@/redux/api/quiz";
import { Button } from "@nextui-org/button";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import NextLink from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";

const Page = () => {
  const results = useListQuizQuery();
  const [deleteQuiz, deleteResult] = useDeleteQuizMutation();

  useEffect(() => {
    if (results.isLoading) {
      toast.message("Loading...", {
        icon: <LoadingToast />,
      });
    }

    if (results.isSuccess) {
      toast.success("Fetched your quizzes!");
    }
  }, [results.error, results.isError, results.isLoading, results.isSuccess]);

  useEffect(() => {
    if (deleteResult.isSuccess) {
      toast.success(deleteResult.data?.message);
    }
    if (deleteResult.isLoading) {
      toast("deleting...", {
        icon: <LoadingToast />,
      });
    }

    if (deleteResult.isError) {
      let err = results.error as FetchBaseQueryError & { data: ResponseInternal<{ success: boolean }> };
      console.log("🟢 ~ file: page.tsx:40 ~ useEffect ~ results.error:", results.error)
      toast.error(err?.data?.message);
    }
  }, [deleteResult.data?.message, deleteResult.isError, deleteResult.isLoading, deleteResult.isSuccess, results.error]);

  if (results.isError) {
    let err = results.error as FetchBaseQueryError & { data: ResponseInternal<{ success: boolean }> };
    toast.error(err.data.message);
    return (
      <div className="flex flex-col gap-2 w-fit">
        <p>{err.data.message}</p>
        <Button color="primary" className="w-fit" onClick={() => results.refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  const handleDeleteQuestion = (id: number) => {
    deleteQuiz(id);
  };

  return (
    <section>
      <CustomToaster richColors closeButton />
      <div className="pb-10">
        <Button as={NextLink} href="/quiz/create" color="secondary">
          Create Quiz
          <PlusIcon />
        </Button>
      </div>
      <div className="flex flex-wrap gap-4 justify-center sm:mb-0 mb-4">
        {/* map all the questions */}
        {results.data &&
          results.data.data.questions.map((quiz) => (
            <div key={quiz.id} className="flex flex-col bg-default-100 p-8 rounded w-full sm:w-auto md:w-72">
              <p className="first-letter:capitalize">{quiz.question}</p>
              <div className="flex items-center gap-8 w-full pt-4">
                <Button isIconOnly color="secondary" variant="flat" as={NextLink} href={"/quiz/" + quiz.id}>
                  <WatchIcon />
                </Button>
                <Button isIconOnly color="success" variant="flat">
                  <EditIcon />
                </Button>
                <Button isIconOnly color="danger" variant="flat" onClick={() => handleDeleteQuestion(quiz.id!)}>
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
