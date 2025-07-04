import { HowItWorksFeatureItemProps } from "@/types";

export const FeatureCard = ({
  icon: Icon,
  title,
  description,
  gradientFrom,
  gradientTo,
}: HowItWorksFeatureItemProps) => {
  return (
    <div className="text-center group">
      <div
        className={`w-16 h-16 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
};
