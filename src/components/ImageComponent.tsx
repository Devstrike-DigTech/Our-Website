import Image from 'next/image';

interface CustomImageProps {
  src: string;
  alt: string;
  width?: number | `${number}`; // Optional width
  height?: number | `${number}`; // Optional height
  fill?: boolean; // Makes image fill the parent container
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'; // Object fit behavior
  priority?: boolean; // Eager loading
  placeholder?: 'blur' | 'empty'; // Placeholder type
  blurDataURL?: string; // If using blur placeholder
}

export default function ImageComponent({
  src,
  alt,
  width,
  height,
  fill = true, // Default to responsive full-width
  objectFit = 'cover', // Default to cover the container
  priority = false, // Lazy load by default
  placeholder = 'empty', // Default to no placeholder
  blurDataURL, // Optional blur placeholder
}: CustomImageProps) {
  return (
    <div className={`relative bg-black w-full h-auto ${fill ? 'h-full' : ''}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        objectFit={objectFit}
        className={`object-${objectFit} transition-all duration-300`} // Apply Tailwind's object-fit utility
      />
    </div>
  );
}
