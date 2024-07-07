import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";
import { Link } from "react-router-dom";

type ButtonProps = ButtonVariantProps &
  (
    | ({ to?: undefined } & ComponentProps<"button">)
    | ({ to: string } & ComponentProps<typeof Link>)
  );
type ButtonVariantProps = VariantProps<typeof buttonVariant>;

const buttonVariant = cva(
  "rounded text-white [&+&]: mb-2 hover:brightness-90 active:brightness-75",
  {
    variants: {
      intent: {
        primary: "bg-blue-500",
        secondary: "bg-gray-600",
        red: "bg-red-600",
        game: "bg-yellow-500",
        survey: "bg-violet-500",
        green: "bg-green-500",
      },
      size: {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-1.5 text-[17px]",
        lg: "w-2/5 py-2.5 text-[19px] text-center rounded-lg",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "sm",
    },
  }
);
function Button({ intent, size, children, ...props }: ButtonProps) {
  if (props.to) {
    return (
      <Link className={buttonVariant({ intent, size })} {...props}>
        {children}
      </Link>
    );
  } else if (typeof props.to === "undefined") {
    return (
      <button className={buttonVariant({ intent, size })} {...props}>
        {children}
      </button>
    );
  }
}

export default Button;
