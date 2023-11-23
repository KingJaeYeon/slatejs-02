import { Editor, Element, Transforms } from "slate";
import {
  CustomText,
  MarkFormat,
} from "@/components/slate-plugins/custom-types";
import {
  BLOCK_HEADING_ONE,
  BLOCK_HEADING_THREE,
  BLOCK_HEADING_TWO,
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_UNDERLINE,
} from "@/components/slate-plugins/constants";
import {
  MARK_BOLD_HOTKEY,
  MARK_CODE_HOTKEY,
  MARK_ITALIC_HOTKEY,
  MARK_UNDERLINE_HOTKEY,
} from "@/components/slate-plugins/constants-hotkey";

export const keydownEventPlugin = (event: any, editor: any) => {
  if (!event.ctrlKey) return;

  switch (event.key) {
    case MARK_CODE_HOTKEY: {
      event.preventDefault();
      CustomEditor.toggleCodeBlock(editor);
      break;
    }
    case MARK_BOLD_HOTKEY: {
      event.preventDefault();
      MarkEditor.toggleMark(editor, "bold");
      break;
    }
    case MARK_UNDERLINE_HOTKEY: {
      event.preventDefault();
      MarkEditor.toggleMark(editor, "underline");
      break;
    }
    case MARK_ITALIC_HOTKEY: {
      event.preventDefault();
      MarkEditor.toggleMark(editor, "italic");
      break;
    }
  }
};

export const CustomEditor = {
  // Code
  isCodeBlockActive(editor: any) {
    const [match]: any = Editor.nodes(editor, {
      match: (n: any) => Element?.isElement(n) && n.type === MARK_CODE,
    });
    return !!match;
  },
  toggleCodeBlock(editor: any) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? undefined : MARK_CODE },
      { match: (n) => Element?.isElement(n) && Editor.isBlock(editor, n) },
    );
  },
  // Header - One
  isHeaderOneActive(editor: any) {
    const [match]: any = Editor.nodes(editor, {
      match: (n: any) => Element?.isElement(n) && n.type === BLOCK_HEADING_ONE,
    });
    return !!match;
  },
  toggleHeaderOneBlock(editor: any) {
    const isActive = CustomEditor.isHeaderOneActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? undefined : BLOCK_HEADING_ONE },
      { match: (n) => Element?.isElement(n) && Editor.isBlock(editor, n) },
    );
  },

  // Header - Two
  isHeaderTwoActive(editor: any) {
    const [match]: any = Editor.nodes(editor, {
      match: (n: any) => Element?.isElement(n) && n.type === BLOCK_HEADING_TWO,
    });
    return !!match;
  },
  toggleHeaderTwoBlock(editor: any) {
    const isActive = CustomEditor.isHeaderTwoActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? undefined : BLOCK_HEADING_TWO },
      { match: (n) => Element?.isElement(n) && Editor.isBlock(editor, n) },
    );
  },
  // Header - Three
  isHeaderThreeActive(editor: any) {
    const [match]: any = Editor.nodes(editor, {
      match: (n: any) =>
        Element?.isElement(n) && n.type === BLOCK_HEADING_THREE,
    });
    return !!match;
  },
  toggleHeaderThreeBlock(editor: any) {
    const isActive = CustomEditor.isHeaderThreeActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? undefined : BLOCK_HEADING_THREE },
      { match: (n) => Element?.isElement(n) && Editor.isBlock(editor, n) },
    );
  },
};

export const MarkEditor = {
  isMarkActive(editor: any, format: MarkFormat) {
    const marks: Omit<CustomText, "text"> | null = Editor.marks(editor);
    return marks ? (marks as any)[format] === true : false;
  },
  toggleMark(editor: any, format: MarkFormat) {
    const isActive = MarkEditor.isMarkActive(editor, format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  },
};
