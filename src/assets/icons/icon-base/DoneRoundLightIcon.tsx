import type { IconProps } from "./types";

export default function DoneRoundLightIcon({
  size = 24,
  color = "currentColor",
  title = "DoneRoundLightIcon",
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
      <path d="M5 14L8.23309 16.4248C8.66178 16.7463 9.26772 16.6728 9.60705 16.2581L18 6" stroke="currentColor" strokeLinecap="round"/>
    </svg>
  );
}
