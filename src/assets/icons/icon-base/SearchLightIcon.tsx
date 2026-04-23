import type { IconProps } from "./types";

export default function SearchLightIcon({
  size = 24,
  color = "currentColor",
  title = "SearchLightIcon",
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={title}
      style={{ color, ...props.style }}
      {...props}
    >
      <title>{title}</title>
      <circle cx="11" cy="11" r="6" stroke="currentColor"/>
<path d="M20 20L17 17" stroke="currentColor" strokeLinecap="round"/>
    </svg>
  );
}
