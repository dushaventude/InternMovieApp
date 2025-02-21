import * as React from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "large" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size, className, children, ...props }, ref) => {
    return (
      <button
        className={`
          ${styles.button}
          ${styles[`button--${variant}`]}
          ${size ? styles[`button--${size}`] : ""}
          ${className || ""}
        `}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
