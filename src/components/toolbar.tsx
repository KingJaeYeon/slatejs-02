"use client";
import { Button } from "@/components/button";
import { CustomEditor } from "@/components/slate-plugins/custom-editor";
import { useEditorStore } from "@/store/editorStore";

export const Toolbar = ({ show }: { show: boolean }) => {
  const { editor } = useEditorStore((state) => state);
  if (!show) return null;
  return (
    <div className={"flex"}>
      <Button
        onclickHandler={() => {
          CustomEditor.toggleBoldMark(editor);
        }}
        className={"flex border border-gray-300 px-1.5 py-0.5 italic"}
      >
        B
      </Button>
      <Button
        onclickHandler={() => {
          CustomEditor.toggleCodeBlock(editor);
        }}
        className={"flex border border-gray-300 px-1.5 py-0.5 italic"}
      >
        C
      </Button>
      <Button
        onclickHandler={() => {
          CustomEditor.toggleUnderlineMark(editor);
        }}
        className={"flex border border-gray-300 px-1.5 py-0.5 italic"}
      >
        U
      </Button>
      <Button
        onclickHandler={() => {
          CustomEditor.toggleItalicMark(editor);
        }}
        className={"flex border border-gray-300 px-1.5 py-0.5 italic"}
      >
        I
      </Button>
      <Button
        onclickHandler={() => {
          CustomEditor.toggleHeaderOneBlock(editor);
        }}
        className={"flex border border-gray-300 px-1.5 py-0.5 italic"}
      >
        H1
      </Button>
      <Button
        onclickHandler={() => {
          CustomEditor.toggleHeaderTwoBlock(editor);
        }}
        className={"flex border border-gray-300 px-1.5 py-0.5 italic"}
      >
        H2
      </Button>
      <Button
        onclickHandler={() => {
          CustomEditor.toggleHeaderThreeBlock(editor);
        }}
        className={"flex border border-gray-300 px-1.5 py-0.5 italic"}
      >
        H3
      </Button>
    </div>
  );
};
