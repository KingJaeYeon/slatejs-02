"use client";

// Define a React component to render leaves with bold text.
import { MARK_BOLD, MARK_NORMAL } from "@/components/slate-plugins/constants";

export const Leaf = (props: any) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? MARK_BOLD : MARK_NORMAL }}
    >
      {props.children}
    </span>
  );
};
