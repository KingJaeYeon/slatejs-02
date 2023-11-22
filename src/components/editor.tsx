"use client";
import React from "react";
import { Editable, Slate } from "slate-react";
import { Descendant } from "slate";
import {
  renderElement,
  renderLeaf,
} from "@/components/slate-plugins/element-render";
import { useEditorStore } from "@/store/editorStore";
import { keydownEventPlugin } from "@/components/slate-plugins/custom-editor";

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
];

function Editor(props: any) {
  const { editor } = useEditorStore((state) => state);

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(event) => {
          keydownEventPlugin(event, editor);
        }}
      />
    </Slate>
  );
}

export default Editor;
