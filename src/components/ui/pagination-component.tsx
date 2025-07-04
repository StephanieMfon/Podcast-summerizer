import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginationComponentProps } from "@/types";

export const PaginationComponent: React.FC<PaginationComponentProps> = ({
  currentPage,
  onPageChange,
  hasNextPage,
  isLoading = false,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1 && !isLoading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (hasNextPage && !isLoading) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrevious}
              className={
                currentPage === 1 || isLoading
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          <PaginationItem>
            <span className="px-4 py-2 text-sm text-muted-foreground">
              Page {currentPage}
            </span>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              onClick={handleNext}
              className={
                !hasNextPage || isLoading
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
