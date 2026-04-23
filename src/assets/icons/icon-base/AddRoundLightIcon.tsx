import type { IconProps } from "./types";

export default function AddRoundLightIcon({
  size = 24,
  color = "currentColor",
  title = "AddRoundLightIcon",
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
      <path d="M12 6L12 18" stroke="currentColor" strokeLinecap="round"/>
<path d="M18 12L6 12" stroke="currentColor" strokeLinecap="round"/>
    </svg>
  );
}
