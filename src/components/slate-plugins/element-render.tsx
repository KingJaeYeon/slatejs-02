"use client";
import { DefaultElement } from "@/components/default-block-element";
import { CodeElement } from "@/components/code-block-element";
import { Leaf } from "@/components/render-leaf";
import { MARK_CODE } from "@/components/slate-plugins/constants";

export const renderElement = (props: any) => {
  switch (props.element.type) {
    case MARK_CODE:
      return <CodeElement {...props} />;
    default:
      return <DefaultElement {...props} />;
  }
};

export const renderLeaf = (props: any) => {
  return <Leaf {...props} />;
};
