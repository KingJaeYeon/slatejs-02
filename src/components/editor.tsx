"use client";
import React from "react";
import { Editable, Slate } from "slate-react";
import { Descendant, Editor as SlateEditor, Transforms } from "slate";
import { renderElement, renderLeaf } from "@/components/v2/element-render";
import { useEditorStore } from "@/store/editorStore";
import { keydownEventPlugin } from "@/components/slate-plugins/custom-editor";
import {
  BLOCK_PARAGRAPH,
  BULLETED_LIST,
  LIST_ITEM,
  LIST_TYPES,
  NUMBER_LIST,
} from "@/components/slate-plugins/constants";
import { Toolbar } from "@/components/toolbar";
import { Title } from "@/components/title";

const initialValue: Descendant[] = [
  {
    type: BLOCK_PARAGRAPH,
    children: [
      {
        text: "title: 10 Expert Performance Tips Every Senior JS React Developer Should Know\n",
      },
    ],
  },
  {
    type: BLOCK_PARAGRAPH,
    children: [
      {
        text:
          "Hey, senior JS React developers! Are you looking to take your skills to the next level and optimize your React applications for top-notch performance?\n" +
          "\n" +
          "You’re in the right place!\n" +
          "\n" +
          "In this article, I’ll share with you 10 expert performance tips that will supercharge your React development.\n" +
          "\n" +
          "Get ready to optimize, streamline, and make your apps lightning-fast. Let’s dive in!",
      },
    ],
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
            onKeyDownCapture={(event) => {
              if (event.key === "Enter" && event.shiftKey) {
                event.preventDefault();
                editor.insertText("\n");
              }
              if (event.key === "Backspace" || event.key === "Delete") {
                const [match]: any = SlateEditor.nodes(editor, {
                  match: (n: any) =>
                    n.type === NUMBER_LIST || n.type === BULLETED_LIST,
                });
                if (!!match) {
                  const length =
                    match[0].children[match[0].children.length - 1].children[0]
                      .text.length;
                  if (length === 0) {
                    console.log(match);
                    event.preventDefault();
                    Transforms.unwrapNodes(editor, {
                      match: (n: any) => LIST_TYPES.includes(n.type),
                      split: false,
                    });
                    Transforms.setNodes(editor, {
                      type: BLOCK_PARAGRAPH,
                    });
                  }
                }
                // if (!!match) {
                //   event.preventDefault();
                // }
              }
            }}
            renderLeaf={renderLeaf}
            onKeyDown={(event) => {
              if (event.key === "Enter" && event.shiftKey) {
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
