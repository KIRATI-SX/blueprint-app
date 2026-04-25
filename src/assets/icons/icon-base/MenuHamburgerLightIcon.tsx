import type { IconProps } from "./types"

export default function MenuHamburgerLightIcon({
  size = 24,
  color = "currentColor",
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color, ...props.style }}
      focusable="false"
      aria-hidden
      {...props}
    >
      <path
        d="M4 6H20M4 12H20M4 18H20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}
