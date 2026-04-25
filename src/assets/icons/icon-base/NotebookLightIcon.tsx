import type { IconProps } from "./types";

export default function NotebookLightIcon({
  size = 24,
  color = "currentColor",
  title = "NotebookLightIcon",
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
      <rect x="6" y="4" width="13" height="17" rx="2" stroke="currentColor"/>
<path d="M15 10V8" stroke="currentColor" strokeLinecap="round"/>
<path d="M4 9H8" stroke="currentColor" strokeLinecap="round"/>
<path d="M4 13H8" stroke="currentColor" strokeLinecap="round"/>
<path d="M4 17H8" stroke="currentColor" strokeLinecap="round"/>
    </svg>
  );
}
