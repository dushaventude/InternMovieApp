import React, { JSX } from "react";
import "./styles.scss";

type TypographyClass =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "xxl"
  | "thin"
  | "light"
  | "regular"
  | "medium"
  | "bold"
  | "black"
  | "lh-sm"
  | "lh-md"
  | "lh-lg"
  | "ls-tight"
  | "ls-normal"
  | "ls-wide"
  | "text-primary"
  | "text-secondary"
  | "text-success"
  | "text-danger"
  | "text-warning"
  | "text-info"
  | "text-light"
  | "text-dark"
  | "text-left"
  | "text-center"
  | "text-right"
  | "text-justify"
  | "underline"
  | "line-through"
  | "no-underline"
  | "uppercase"
  | "lowercase"
  | "capitalize"
  | "break-word"
  | "break-all"
  | "nowrap";

interface TypographyProps {
  children: React.ReactNode;
  variant?: "p" | "span";
  className?: TypographyClass;
}

const Typography: React.FC<TypographyProps> = ({
  children,
  variant = "p",
  className,
}) => {
  const Tag = variant as keyof JSX.IntrinsicElements;
  return <Tag className={className}>{children}</Tag>;
  //   return <Tag className={`typography ${size} ${className}`}>{children}</Tag>;
};

export default Typography;
