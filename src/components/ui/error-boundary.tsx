"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ErrorBoundaryProps } from "@/types";

export function ErrorBoundary({ error, retry, children }: ErrorBoundaryProps) {
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
        <div className="mb-4">
          <AlertTriangle className="h-12 w-12 text-red-400 mx-auto" />
        </div>

        <h3 className="text-lg font-medium text-white mb-2">
          Oops! Something went wrong
        </h3>

        <p className="text-gray-400 mb-6 max-w-sm">{error}</p>

        {retry && (
          <div className="space-y-3">
            <Button
              variant="outline"
              onClick={retry}
              className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 hover:cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>

            <p className="text-sm text-gray-500">
              or check your internet connection
            </p>
          </div>
        )}
      </div>
    );
  }
  return <>{children}</>;
}
