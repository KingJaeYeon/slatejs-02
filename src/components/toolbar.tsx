"use client";
import { Button } from "@/components/button";
import {
  BlockEditor,
  MarkEditor,
} from "@/components/slate-plugins/custom-editor";
import { useEditorStore } from "@/store/editorStore";
import {
  BLOCK_CODE,
  BLOCK_HEADING_ONE,
  BLOCK_HEADING_THREE,
  BLOCK_HEADING_TWO,
  BLOCK_PARAGRAPH,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
  TEXT_ALIGN_CENTER,
  TEXT_ALIGN_LEFT,
  TEXT_ALIGN_RIGHT,
} from "@/components/slate-plugins/constants";

export const Toolbar = ({ show }: { show: boolean }) => {
  const { editor } = useEditorStore((state) => state);
  if (!show) return null;
  return (
    <div className={"flex"}>
      <Button
        title={"ctrl+b"}
        onclickHandler={() => {
          BlockEditor.toggleBlock(editor, BLOCK_PARAGRAPH);
        }}
        className={"flex border border-gray-300 px-1.5 py-0.5 italic"}
      >
        P
      </Button>
      <Button
        title={"ctrl+b"}
        onclickHandler={() => {
          MarkEditor.toggleMark(editor, MARK_BOLD);
        }}
        className={"flex border border-gray-300 px-1.5 py-0.5 italic"}
      >
        B
      </Button>
      <Button
        onclickHandler={() => {
          BlockEditor.toggleBlock(editor, BLOCK_CODE);
        }}
        className={"flex border border-gray-300 px-1.5 py-0.5 italic"}
      >
        C
      </Button>
      <Button
        onclickHandler={() => {
          MarkEditor.toggleMark(editor, MARK_UNDERLINE);
        }}
        className={"flex border border-gray-300 px-1.5 py-0.5 italic"}
      >
        U
      </Button>
      <Button
        onclickHandler={() => {
          MarkEditor.toggleMark(editor, MARK_ITALIC);
        }}
        className={"flex border border-gray-300 px-1.5 py-0.5 italic"}
      >
        I
      </Button>
      <Button
        onclickHandler={() => {
          BlockEditor.toggleBlock(editor, BLOCK_HEADING_ONE);
        }}
        className={"flex border border-gray-300 px-1.5 py-0.5 italic"}
      >
        H1
      </Button>
      <Button
        onclickHandler={() => {
          BlockEditor.toggleBlock(editor, BLOCK_HEADING_TWO);
        }}
        className={"flex border border-gray-300 px-1.5 py-0.5 italic"}
      >
        H2
      </Button>
      <Button
        onclickHandler={() => {
          BlockEditor.toggleBlock(editor, BLOCK_HEADING_THREE);
        }}
        className={"flex border border-gray-300 px-1.5 py-0.5 italic"}
      >
        H3
      </Button>
      <Button
        onclickHandler={() => {
          BlockEditor.toggleBlock(editor, TEXT_ALIGN_LEFT);
        }}
        className={"flex border border-gray-300 px-1.5 py-0.5 italic"}
      >
        Left
      </Button>
      <Button
        onclickHandler={() => {
          BlockEditor.toggleBlock(editor, TEXT_ALIGN_CENTER);
        }}
        className={"flex border border-gray-300 px-1.5 py-0.5 italic"}
      >
        Center
      </Button>
      <Button
        onclickHandler={() => {
          BlockEditor.toggleBlock(editor, TEXT_ALIGN_RIGHT);
        }}
        className={"flex border border-gray-300 px-1.5 py-0.5 italic"}
      >
        Right
      </Button>
    </div>
  );
};
