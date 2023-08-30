"use client";
import React from "react";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div>
      Error
      {JSON.stringify(error)}
    </div>
  );
};

export default Error;
