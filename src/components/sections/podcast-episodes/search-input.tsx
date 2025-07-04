"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchInputProps } from "@/types";

export function SearchInput({ defaultValue = "" }: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchText, setSearchText] = useState(defaultValue);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isPending, startTransition] = useTransition();

  const debouncedSearch = useDebouncedCallback((value: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (value.trim()) {
        params.set("q", value.trim());
      } else {
        params.delete("q");
      }
      params.delete("page"); // Reset to page 1
      router.replace(`/?${params.toString()}`);
    });
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    debouncedSearch(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (searchText.trim()) {
        params.set("q", searchText.trim());
      } else {
        params.delete("q");
      }
      params.delete("page");
      router.replace(`/?${params.toString()}`);
    });
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchText(suggestion);
    setIsSearchFocused(false);
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set("q", suggestion);
      params.delete("page");
      router.replace(`/?${params.toString()}`);
    });
  };

  return (
    <div className="max-w-2xl mx-auto mb-12">
      <form onSubmit={handleSubmit} className="relative">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="What podcast would you like to summarize today?"
          value={searchText}
          onChange={handleChange}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
          className={`w-full h-16 pl-14 pr-20 bg-gray-800/80 border border-gray-700 rounded-2xl text-white text-lg placeholder:text-gray-400 focus:outline-none focus:border-purple-500 focus:ring-0 transition-all duration-200 ${
            isPending ? "opacity-50" : ""
          }`}
        />
        <Button
          type="submit"
          disabled={isPending}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 border-0 rounded-xl p-0 transition-all duration-200 flex items-center justify-center shadow-lg disabled:opacity-50"
        >
          <Search className="w-4 h-4 text-white stroke-2" />
        </Button>
      </form>

      {/* Search Suggestions */}
      {isSearchFocused && (
        <div className="absolute mt-2 w-full max-w-2xl bg-gray-800 border border-gray-700 rounded-xl shadow-xl z-10 p-2">
          <div className="text-xs text-gray-400 px-3 py-2">
            Popular searches
          </div>
          {[
            "AI and Machine Learning",
            "Product Management",
            "Design Systems",
            "Leadership",
          ].map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
