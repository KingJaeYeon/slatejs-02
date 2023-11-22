"use client";
import { DefaultElement } from "@/components/default-block-element";
import { CodeElement } from "@/components/code-block-element";
import { Leaf } from "@/components/render-leaf";

export const renderElement = (props: any) => {
  switch (props.element.type) {
    case "code-block":
      return <CodeElement {...props} />;
    default:
      return <DefaultElement {...props} />;
  }
};

export const renderLeaf = (props: any) => {
  return <Leaf {...props} />;
};
