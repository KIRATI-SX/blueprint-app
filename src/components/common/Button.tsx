import React from "react";

type ButtonVariant = "solid" | "outline" | "text";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export default function Button({
  variant = "solid",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex h-[48px] w-[133px] items-center justify-center gap-[6px] rounded-[999px] px-[40px] py-[12px] border text-base leading-6 font-medium transition-colors duration-200 disabled:cursor-not-allowed";

  const variantClasses: Record<ButtonVariant, string> = {
    solid:
      "border-transparent bg-[#26231E] text-white hover:not-disabled:bg-[#43403B] active:not-disabled:bg-[#26231E] disabled:bg-[#75716B] disabled:text-white",
    outline:
      "border-[#75716B] bg-transparent text-[#26231E] hover:not-disabled:border-[#43403B] hover:not-disabled:text-[#43403B] active:not-disabled:border-[#26231E] active:not-disabled:text-[#26231E] disabled:border-[#B9B6B1] disabled:text-[#75716B]",
    text: "border-transparent bg-transparent text-[#26231E] underline underline-offset-2 hover:not-disabled:text-[#43403B] active:not-disabled:text-[#26231E] disabled:text-[#75716B]",
  };

  const classes = [baseClasses, variantClasses[variant], className].filter(Boolean).join(" ");

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
