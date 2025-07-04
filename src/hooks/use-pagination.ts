import { useState } from "react";

export function usePagination(initialPage = 1) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const nextPage = () => setCurrentPage((p) => p + 1);
  const prevPage = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goToPage = (page: number) => setCurrentPage(page);

  return { currentPage, setCurrentPage, nextPage, prevPage, goToPage };
}
