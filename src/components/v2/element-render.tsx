"use client";
import { RenderElementProps, RenderLeafProps } from "slate-react";
import { Element, Leaf } from "@/components/v2/change-element";

export const renderElement = (props: RenderElementProps) => (
  <Element {...props} />
);

export const renderLeaf = (props: RenderLeafProps) => <Leaf {...props} />;
