"use client";

import * as React from "react";
import styles from "./textarea.module.scss";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={`${styles.textarea} ${className}`}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };

// import { Textarea } from "@/components/ui/textarea"

// <Textarea />