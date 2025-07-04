"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className="text-gray-300 hover:text-white transition-colors"
          >
            {label}
          </a>
        ))}
      </nav>

      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-300 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-gray-950/95 backdrop-blur-xl border-b border-gray-800">
            <nav className="container mx-auto px-6 py-4 flex flex-col gap-4">
              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-white transition-colors py-2"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </>
  );
}
