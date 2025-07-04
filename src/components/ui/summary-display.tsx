"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import React from "react";
import { SummaryDisplayProps } from "@/types";

export function SummaryDisplay({ summary }: SummaryDisplayProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(summary.summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="mt-2 animate-in slide-in-from-bottom-4 duration-500">
      <Card className="mx-0 md:mx-6 bg-gray-800/50  relative overflow-hidden border-none  shadow-lg">
        <CardHeader className=" px-2 md:px-6 relative z-10 ">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="px-2 bg-gray-900/100 rounded-lg">
                <Sparkles className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-gray-100 flex items-center gap-2">
                  AI Summary
                </CardTitle>
              </div>
            </div>

            <Button
              onClick={handleCopy}
              variant="outline"
              size="sm"
              className="bg-gray/80 text-gray-400 hover:bg-white/50 border-gray-400 hover:border-green-300 transition-all duration-200"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-1" />
                  <span className="">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </CardHeader>

        <CardContent className=" px-0 md:px-6 bg-gray-900/50 relative z-10 space-y-4">
          <div className="p-4 text-gray-300   shadow-sm">
            <div className="prose prose-slate max-w-none">
              <p className=" leading-relaxed text-base whitespace-pre-wrap font-medium">
                {summary.summary}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
