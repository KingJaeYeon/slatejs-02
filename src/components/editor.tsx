"use client";
import React from "react";
import { Editable, Slate } from "slate-react";
import { renderElement, renderLeaf } from "@/components/v2/element-render";
import { useEditorStore } from "@/store/editorStore";
import {
  keydownEventPlugin,
  ListDeleter,
  ShiftEnter,
} from "@/components/slate-plugins/custom-editor";
import { BLOCK_PARAGRAPH } from "@/components/slate-plugins/constants";
import { Toolbar } from "@/components/toolbar";
import { Title } from "@/components/title";

const initialValue = [
  {
    type: BLOCK_PARAGRAPH,
    children: [
      {
        text: `title: 10 Expert Performance Tips Every Senior JS React Developer Should Know\n`,
      },
    ],
  },
  {
    type: BLOCK_PARAGRAPH,
    children: [
      {
        text:
          `Hey, senior JS React developers! Are you looking to take your skills to the next level and optimize your React applications for top-notch performance?\n` +
          `\n` +
          `You’re in the right place!\n` +
          `\n` +
          `In this article, I’ll share with you 10 expert performance tips that will supercharge your React development.\n` +
          `\n` +
          `Get ready to optimize, streamline, and make your apps lightning-fast. Let’s dive in!`,
      },
    ],
  },
];

function Editor() {
  const { editor } = useEditorStore((state) => state);

  return (
    <div className={`flex w-full flex-col items-center px-2 py-1`}>
      <Slate editor={editor} initialValue={initialValue}>
        <Toolbar show={true} />
        <div className={`grid w-full max-w-[45rem] overflow-auto`}>
          <Title />
          <hr className={`my-5`} />
          <Editable
            className={`min-h-[60vh] w-full max-w-full outline-none`}
            renderElement={renderElement}
            onKeyDownCapture={(event) => {
              if (event.key === `Enter` && event.shiftKey) {
                ShiftEnter(event, editor);
              }
              if (event.key === `Backspace` || event.key === `Delete`) {
                ListDeleter.ActionHandler(editor, event);
              }
            }}
            renderLeaf={renderLeaf}
            onKeyDown={(event) => {
              if (event.key === `Enter` && event.shiftKey) {
              } else {
                keydownEventPlugin(event, editor);
              }
            }}
          />
          <div className={`h-[200px] border border-gray-300`}>
            <p>dmkdmk</p>
          </div>
        </div>
      </Slate>
    </div>
  );
}

export default Editor;
