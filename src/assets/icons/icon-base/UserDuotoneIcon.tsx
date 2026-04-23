import type { IconProps } from "./types";

export default function UserDuotoneIcon({
  size = 24,
  color = "currentColor",
  title = "UserDuotoneIcon",
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
      <path d="M19.7274 20.4471C19.2716 19.1713 18.2672 18.0439 16.8701 17.2399C15.4729 16.4358 13.7611 16 12 16C10.2389 16 8.52706 16.4358 7.12991 17.2399C5.73276 18.0439 4.72839 19.1713 4.27259 20.4471" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
<circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}
