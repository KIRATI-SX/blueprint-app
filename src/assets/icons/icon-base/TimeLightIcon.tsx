import type { IconProps } from "./types";

export default function TimeLightIcon({
  size = 24,
  color = "currentColor",
  title = "TimeLightIcon",
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
      <circle cx="12" cy="12" r="8.5" stroke="currentColor"/>
<path d="M16.5 12H12.25C12.1119 12 12 11.8881 12 11.75V8.5" stroke="currentColor" strokeLinecap="round"/>
    </svg>
  );
}
