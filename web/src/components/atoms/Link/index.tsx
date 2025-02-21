import { Link as LinkTag } from "react-router-dom";

import React from "react";

interface LinkProps {
  href: string;
  target?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const Link: React.FC<LinkProps> = ({ children, href }) => {
  return <LinkTag to={href}>{children}</LinkTag>;
};

export default Link;
