import { GenreFilterProps } from "@/types";
import React from "react";

export function GenreFilter({
  genres,
  selected,
  isLoading,
  onSelect,
}: GenreFilterProps) {
  return (
    <div className="flex items-center flex-wrap gap-2 justify-center">
      {genres.map(({ name, id }) => (
        <button
          key={name}
          onClick={() => onSelect(name, id)}
          disabled={isLoading}
          className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 hover:cursor-pointer ${
            selected === name
              ? "bg-purple-600 text-white"
              : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
          } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
