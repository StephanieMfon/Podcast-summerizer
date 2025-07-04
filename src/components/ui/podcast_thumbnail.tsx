import { cn } from "@/lib/utils";
import { PodcastThumbnailProps, ThumbnailSize } from "@/types";
import Image from "next/image";

const PodcastThumbnail = ({
  src,
  alt,
  className,
  size = "md",
}: PodcastThumbnailProps) => {
  const sizeClasses: Record<ThumbnailSize, string> = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-14 h-14",
    xl: "w-20 h-20",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-muted",
        sizeClasses[size],
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        width={48}
        height={48}
        loading="lazy"
      />
    </div>
  );
};

export default PodcastThumbnail;
