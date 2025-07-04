import { ChevronRight } from "lucide-react";

import { whyItMattersFeatures } from "@/data";
import { FeatureItem } from "./features";
import { Button } from "@/components/ui/button";

function WhyItMattersSection() {
  return (
    <section id="why-important" className="py-20 px-6 lg:px-25">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Why AI Summaries Matter{" "}
            </h2>
            <div className="space-y-6">
              {whyItMattersFeatures.map((feature, index) => (
                <FeatureItem
                  key={index}
                  icon={feature.icon}
                  iconColor={feature.iconColor}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">
                Ready to get started?
              </h3>
              <p className="text-gray-400">
                Join thousands of knowledge seekers
              </p>
            </div>

            <div className="space-y-4">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 h-12">
                Start Your Journey
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
                <span>✓ Free to start</span>
                <span>✓ No credit card</span>
                <span>✓ Instant summaries</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyItMattersSection;
