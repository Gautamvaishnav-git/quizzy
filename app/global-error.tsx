"use client";

interface IGlobalErrorProp {
  error: Error & { digest?: string };
  reset: () => void;
}

const GlobalError = ({ error, reset }: IGlobalErrorProp) => {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        {JSON.stringify(error.message)}
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
};

export default GlobalError;
