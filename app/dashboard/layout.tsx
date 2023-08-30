interface Props {
  children: React.ReactNode;
  attempts: React.ReactNode;
  quiz: React.ReactNode;
}

export default function DashboardLayout({ attempts, children, quiz }: Props) {
  return (
    <>
      <section className="flex gap-10 divide-x-2">
        <div className="px-4">
          children <br /> {children}
        </div>
        <div className="px-4">
          attempts <br />
          {attempts}
        </div>
        <div className="px-4">
          quiz
          {quiz}
        </div>
      </section>
    </>
  );
}
