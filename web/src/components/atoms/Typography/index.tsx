import React, { JSX } from "react";
import "./styles.scss";

type TypographyClass =
  | "sm"
  | "xs"
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
  variant?: keyof JSX.IntrinsicElements; // Allow any valid HTML tag
  className?: TypographyClass | TypographyClass[]; // Allow single class or array of classes
}

const Typography: React.FC<TypographyProps> = ({
  children,
  variant = "p",
  className,
}) => {

  const Tag = variant;

  // Convert className to a string if it's an array
  const classNames = Array.isArray(className) ? className.join(" ") : className;

  return <Tag className={classNames}>{children}</Tag>;

<!--   const Tag = variant as keyof JSX.IntrinsicElements;
  return <Tag className={`typography ${className}`}>{children}</Tag>; -->

};

export default Typography;
