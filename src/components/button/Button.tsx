import type { ComponentProps } from "react";

interface IButton {
  children: React.ReactNode;
  variant: "primary" | "success" | "danger";
}
type TButton = ComponentProps<"button"> & IButton;

function Button({ children, className, variant, ...rest }: TButton) {
  const checkVariant = () => {
    if (variant === "primary") {
      return "bg-white/20 hover:bg-white/30  border-white/30";
    } else if (variant === "success") {
      return "bg-green-500/20 hover:bg-green-500/30 border-green-500/30";
    } else if (variant === "danger") {
      return "bg-red-500/20 hover:bg-red-500/30 border-red-500/30";
    }
  };
  return (
    <button
      className={`${className} px-3 py-1 rounded-lg cursor-pointer text-white w-fit border text-sm  ${checkVariant()}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
