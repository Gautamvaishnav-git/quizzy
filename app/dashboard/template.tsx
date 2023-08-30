export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div>
      this is some template.tsx inside dashboard!
      {children}
    </div>
  );
}
