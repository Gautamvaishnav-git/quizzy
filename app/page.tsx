import { GithubIcon } from "@/components/icons";
import { subtitle, title } from "@/components/primitives";
import { siteConfig } from "@/config/site";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import NextLink from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Create&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>quizzes&nbsp;</h1>
        <br />
        <h1 className={title()}>and play with you knowledge.</h1>
        <h2 className={subtitle({ class: "mt-4" })}>Create, test and play.</h2>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          as={NextLink}
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>

      <div className="pt-8">
        <Button as={NextLink} color="primary" href="/quiz/create">
          Create Quiz!
        </Button>
      </div>
    </section>
  );
}
