import { howItWorksFeatures } from "@/data";
import { FeatureCard } from "./features";

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 px-6 bg-gray-900/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Three simple steps to transform your podcast discovery experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {howItWorksFeatures.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              gradientFrom={feature.gradientFrom}
              gradientTo={feature.gradientTo}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
