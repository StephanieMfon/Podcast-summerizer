import { WhyItMattersFeatureItemProps } from "@/types";

export function FeatureItem({
  icon: Icon,
  iconColor,
  title,
  description,
}: WhyItMattersFeatureItemProps) {
  return (
    <div className="flex gap-4">
      <div
        className={`w-8 h-8 ${iconColor} rounded-lg flex items-center justify-center flex-shrink-0 mt-1`}
      >
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div>
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
}
