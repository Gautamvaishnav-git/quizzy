import { db } from "@/app/api/db";
import { questions } from "@/app/api/db/schema/schema";
import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { eq } from "drizzle-orm";
import Link from "next/link";

const Page = async ({ params }: { params: { quizId: number } }) => {
  const question = await db.query.questions.findFirst({ where: eq(questions.id, params.quizId) });
  if (!question) {
    return (
      <section className="space-y-3">
        <p> Question does not exists! please go back to quiz page!</p>{" "}
        <Button as={Link} href="/quiz" color="secondary">Go Back!</Button>
      </section>
    );
  }
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
