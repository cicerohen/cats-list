import { useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: React.ReactNode;
};

export const Portal = ({ children }: Props) => {
  const [mountNode] = useState(document.body);
  return createPortal(children, mountNode);
};
