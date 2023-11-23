"use client";
import React from "react";
import { Editable, Slate } from "slate-react";
import { Descendant } from "slate";
import { renderElement, renderLeaf } from "@/components/v2/element-render";
import { useEditorStore } from "@/store/editorStore";
import {
  keydownEventPlugin,
  ShiftEventPlugin,
} from "@/components/slate-plugins/custom-editor";
import { BLOCK_PARAGRAPH } from "@/components/slate-plugins/constants";
import { Toolbar } from "@/components/toolbar";
import { Title } from "@/components/title";

const initialValue: Descendant[] = [
  {
    type: BLOCK_PARAGRAPH,
    children: [{ text: "A line of text in a paragraph." }],
  },
];

function Editor(props: any) {
  const { editor, shift } = useEditorStore((state) => state);

  return (
    <div className={"flex w-full flex-col items-center px-2 py-1"}>
      <Slate editor={editor} initialValue={initialValue}>
        <Toolbar show={true} />
        <div className={"grid w-full max-w-[45rem]"}>
          <Title />
          <hr className={"my-5"} />
          <Editable
            className={"w-full outline-none"}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                ShiftEventPlugin(event, editor);
              } else {
                keydownEventPlugin(event, editor);
              }
            }}
          />
        </div>
      </Slate>
    </div>
  );
}

export default Editor;
