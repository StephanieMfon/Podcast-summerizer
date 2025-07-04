import { useState } from "react";

export function useError() {
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: unknown) => {
    if (err instanceof Error) setError(err.message);
    else if (typeof err === "string") setError(err);
    else setError("An unknown error occurred");
  };

  const resetError = () => setError(null);

  return { error, setError, handleError, resetError };
}
