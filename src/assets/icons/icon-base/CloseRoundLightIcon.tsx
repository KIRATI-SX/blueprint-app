import type { IconProps } from "./types";

export default function CloseRoundLightIcon({
  size = 24,
  color = "currentColor",
  title = "CloseRoundLightIcon",
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
      <path d="M18 6L6 18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M6 6L18 18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
