import { Editor, Element, Transforms } from "slate";
import { CustomText } from "@/components/slate-plugins/custom-types";

export const keydownEventPlugin = (event: any, editor: any) => {
  if (!event.ctrlKey) return;

  switch (event.key) {
    case "`": {
      event.preventDefault();
      CustomEditor.toggleCodeBlock(editor);
      break;
    }
    case "b": {
      event.preventDefault();
      CustomEditor.toggleBoldMark(editor);
      break;
    }
  }
};

export const CustomEditor = {
  isBoldMarkActive(editor: any) {
    const marks: CustomText | null = Editor.marks(editor);
    return marks ? marks.bold === true : false;
  },

  isCodeBlockActive(editor: any) {
    const [match]: any = Editor.nodes(editor, {
      match: (n: any) => Element?.isElement(n) && n.type === "code-block",
    });
    return !!match;
  },

  toggleBoldMark(editor: any) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "bold");
    } else {
      Editor.addMark(editor, "bold", true);
    }
  },

  toggleCodeBlock(editor: any) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? undefined : "code-block" },
      { match: (n) => Element?.isElement(n) && Editor.isBlock(editor, n) },
    );
  },
};
