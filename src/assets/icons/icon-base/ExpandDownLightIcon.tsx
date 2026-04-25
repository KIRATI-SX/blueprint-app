import type { IconProps } from "./types";

export default function ExpandDownLightIcon({
  size = 24,
  color = "currentColor",
  title = "ExpandDownLightIcon",
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
      <path d="M18 9L12 15L6 9" stroke="currentColor"/>
    </svg>
  );
}
