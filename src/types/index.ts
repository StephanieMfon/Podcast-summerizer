import { LucideIcon } from "lucide-react";

export interface Episode {
  id: string;
  title: string;
  description_original: string;
  description_highlighted: string;
  publisher: string;
  thumbnail: string;
  audio: string;
  audio_length_sec: number;
  pub_date_ms: number;
  trending?: boolean;
  category?: string;
}

export interface Summary {
  _id?: string;
  episodeId: string;
  summary: string;
  createdAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PageProps {
  searchParams: Promise<{
    q?: string;
    page?: string;
    genre_id?: string;
    category?: string;
    view?: string;
  }>;
}

export interface WhyItMattersFeatureItemProps {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  description: string;
}

export interface GetEpisodesParams {
  query?: string;
  offset: number | string | null;
  genreId?: number | string | null;
}

export interface PodcastHeroProps {
  initialQuery?: string;
}

export interface HowItWorksFeatureItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
}

export interface EpisodeCardProps {
  episode: Episode;
  onSummarize: (episode: Episode) => Promise<void>;
  summaries: Map<string, Summary>;
}

export interface EpisodeDialogProps {
  episode: Episode;
  onSummarize: (episode: Episode) => Promise<void>;
  summaries: Map<string, Summary>;
  trigger: React.ReactNode;
}

export interface EpisodesSectionProps {
  initialEpisodes: Episode[];
  initialQuery: string;
  initialPage: number;
  initialGenreId: number | null;
  initialCategory: string;
  initialError?: string | null;
}

export interface SearchInputProps {
  defaultValue?: string;
}

export interface ErrorBoundaryProps {
  error: string;
  retry?: () => void;
  children: React.ReactNode;
}

export interface Genre {
  name: string;
  id: number | null;
}

export interface GenreFilterProps {
  genres: Genre[];
  selected: string;
  isLoading?: boolean;
  onSelect: (name: string, id: number | null) => void;
}

export interface PaginationComponentProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  hasNextPage: boolean;
  isLoading?: boolean;
}

export type ThumbnailSize = "sm" | "md" | "lg" | "xl";

export interface PodcastThumbnailProps {
  src: string;
  alt: string;
  className?: string;
  size?: ThumbnailSize;
}

export interface SummaryDisplayProps {
  summary: Summary;
  episodeTitle: string;
}

export interface ErrorLogData {
  error: unknown;
  context?: string;
  timestamp?: Date;
}
