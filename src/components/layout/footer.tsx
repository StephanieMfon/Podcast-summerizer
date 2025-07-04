import { Headphones } from "lucide-react";

function PodcastFooter() {
  return (
    <footer className="py-12 px-6 border-t border-gray-800">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl">
              <Headphones className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold">PodcastIQ</span>
          </div>
          <div className="text-sm text-gray-500">
            © 2025 PodcastIQ. Intelligence-driven discovery.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default PodcastFooter;
