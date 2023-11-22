import { Editor, Element, Transforms } from "slate";
import { CustomText } from "@/components/slate-plugins/custom-types";
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
      CustomEditor.toggleBoldMark(editor);
      break;
    }
    case MARK_UNDERLINE_HOTKEY: {
      event.preventDefault();
      CustomEditor.toggleUnderlineMark(editor);
      break;
    }
    case MARK_ITALIC_HOTKEY: {
      event.preventDefault();
      CustomEditor.toggleItalicMark(editor);
      break;
    }
  }
};

export const CustomEditor = {
  // Bold
  isBoldMarkActive(editor: any) {
    const marks: CustomText | null = Editor.marks(editor);
    return marks ? marks.bold === true : false;
  },
  toggleBoldMark(editor: any) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, MARK_BOLD);
    } else {
      Editor.addMark(editor, MARK_BOLD, true);
    }
  },

  // Italic
  isItalicMarkActive(editor: any) {
    const marks: CustomText | null = Editor.marks(editor);
    return marks ? marks.italic === true : false;
  },
  toggleItalicMark(editor: any) {
    const isActive = CustomEditor.isItalicMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, MARK_ITALIC);
    } else {
      Editor.addMark(editor, MARK_ITALIC, true);
    }
  },

  // Underline
  isUnderlineMarkActive(editor: any) {
    const marks: CustomText | null = Editor.marks(editor);
    return marks ? marks.underline === true : false;
  },
  toggleUnderlineMark(editor: any) {
    const isActive = CustomEditor.isUnderlineMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, MARK_UNDERLINE);
    } else {
      Editor.addMark(editor, MARK_UNDERLINE, true);
    }
  },

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
