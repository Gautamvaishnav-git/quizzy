"use client";


export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex items-center flex-col pt-24 justify-center w-full">
      {error.message ?? "Something went wrong!"}
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
