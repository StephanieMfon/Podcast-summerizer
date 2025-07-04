import { Headphones } from "lucide-react";
import { Navigation } from "./navigation";

export function PodcastHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/95 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl">
              <Headphones className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-semibold">PodcastIQ</h1>
          </div>
          <Navigation />
        </div>
      </div>
    </header>
  );
}
