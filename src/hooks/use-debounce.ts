import { useDebouncedCallback } from "use-debounce";

export function useDebouncedSearch(
  callback: (params: Record<string, string | null>) => void,
  delay = 400
) {
  return useDebouncedCallback(callback, delay);
}
