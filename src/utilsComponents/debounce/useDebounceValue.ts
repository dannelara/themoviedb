import { useEffect, useState } from "react";
/**
 * Fo wait a time period before returning the updated value.
 * @param value - The value to update after a specific time.
 * @param waitTimeInSeconds - The wait waiting time before the function returns the updated value.
 * @returns {any} - Updated value.
 */
function useDebounceValue(value: any, waitTimeInSeconds: number = 200): string {
  const [debouncedValue, setDebouncedValue] = useState<any>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, waitTimeInSeconds);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, waitTimeInSeconds]);

  return debouncedValue;
}

export default useDebounceValue;
