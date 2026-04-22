interface AdBannerProps {
  imageUrl: string;
  linkUrl: string;
  width: number;
  height: number;
  alt: string;
}

export function AdBanner({
  imageUrl,
  linkUrl,
  width,
  height,
  alt,
}: AdBannerProps) {
  return (
    <div className="w-full overflow-x-auto py-3">
      <div className="max-w-[960px] mx-auto">
        <a href={linkUrl} target="_blank" rel="noopener noreferrer">
          <img src={imageUrl} alt={alt} style={{ width, height }} />
        </a>
      </div>
    </div>
  );
}
