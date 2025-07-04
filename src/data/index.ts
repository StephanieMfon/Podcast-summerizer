import {
  Genre,
  HowItWorksFeatureItemProps,
  WhyItMattersFeatureItemProps,
} from "@/types";
import { Clock, Users } from "lucide-react";
import { Brain, Search, Zap } from "lucide-react";

export const whyItMattersFeatures: WhyItMattersFeatureItemProps[] = [
  {
    icon: Clock,
    iconColor: "bg-purple-600",
    title: "Save 80% of Your Time",
    description:
      "Get the essence of hour-long episodes in 30-second summaries. Focus on what matters most.",
  },
  {
    icon: Brain,
    iconColor: "bg-blue-600",
    title: "Smart Episode Selection",
    description:
      "Quickly evaluate whether an episode is worth your time. Read summaries first, then decide which full episodes deserve your attention.",
  },
  {
    icon: Users,
    iconColor: "bg-green-600",
    title: "Instant Decision Making",
    description:
      "Read summaries to quickly determine which episodes align with your interests and goals. Skip content that doesn't match what you're looking for.",
  },
];

export const howItWorksFeatures: HowItWorksFeatureItemProps[] = [
  {
    icon: Search,
    title: "Generate Summaries",
    description:
      "Click 'Generate Summary' on any episode to create an AI-powered summary using advanced language models. Summaries are saved for future reference.",
    gradientFrom: "from-blue-500",
    gradientTo: "to-blue-600",
  },
  {
    icon: Brain,
    title: "Save Time",
    description:
      "Get the main points and key insights from any podcast episode in seconds. Perfect for busy schedules or deciding which episodes to prioritize.",
    gradientFrom: "from-purple-500",
    gradientTo: "to-purple-600",
  },
  {
    icon: Zap,
    title: "Instant Insights",
    description:
      "Get key takeaways, actionable insights, and decide what's worth your time before you listen.",
    gradientFrom: "from-green-500",
    gradientTo: "to-green-600",
  },
];

export const genreData: Genre[] = [
  { name: "All", id: null },
  { name: "Technology", id: 127 },
  { name: "Health & Fitness", id: 88 },
  { name: "Business", id: 93 },
  { name: "Government", id: 117 },
];
