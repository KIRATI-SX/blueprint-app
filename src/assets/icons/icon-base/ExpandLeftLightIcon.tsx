import type { IconProps } from "./types";

export default function ExpandLeftLightIcon({
  size = 24,
  color = "currentColor",
  title = "ExpandLeftLightIcon",
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
      <path d="M15 6L9 12L15 18" stroke="currentColor"/>
    </svg>
  );
}
