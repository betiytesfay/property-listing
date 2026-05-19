"use client";

import { useCallback, useState } from "react";

export function useFakeSubmit<T>(onSubmit: (data: T) => Promise<{ success: boolean; message: string }>) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (data: T) => {
      setIsLoading(true);
      setIsSuccess(false);
      setSuccessMessage(null);
      try {
        const result = await onSubmit(data);
        setIsSuccess(result.success);
        setSuccessMessage(result.message);
      } finally {
        setIsLoading(false);
      }
    },
    [onSubmit]
  );

  const reset = useCallback(() => {
    setIsSuccess(false);
    setSuccessMessage(null);
  }, []);

  return { isLoading, isSuccess, successMessage, handleSubmit, reset };
}
