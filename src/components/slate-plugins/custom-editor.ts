import { Editor, Element as SlateElement, Transforms } from "slate";
import {
  CustomText,
  MarkFormat,
} from "@/components/slate-plugins/custom-types";
import {
  ALIGN,
  BLOCK_CODE,
  BLOCK_PARAGRAPH,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
  TEXT_ALIGN_TYPES,
  TYPE,
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
      BlockEditor.toggleBlock(editor, BLOCK_CODE);
      break;
    }
    case MARK_BOLD_HOTKEY: {
      event.preventDefault();
      MarkEditor.toggleMark(editor, MARK_BOLD);
      break;
    }
    case MARK_UNDERLINE_HOTKEY: {
      event.preventDefault();
      MarkEditor.toggleMark(editor, MARK_UNDERLINE);
      break;
    }
    case MARK_ITALIC_HOTKEY: {
      event.preventDefault();
      MarkEditor.toggleMark(editor, MARK_ITALIC);
      break;
    }
  }
};
export const ShiftEventPlugin = (event: any, editor: any) => {
  if (event.shiftKey && event.key === "Enter") {
  }
};
export const BlockEditor = {
  isBlockActive(editor: any, format: string, blockType = TYPE) {
    const { selection } = editor;
    if (!selection) return false;

    const [match]: any = Editor.nodes(editor, {
      match: (n: any) => SlateElement?.isElement(n) && n[blockType] === format,
    });

    return !!match;
  },

  toggleBlock(editor: any, format: string) {
    const isActive = BlockEditor.isBlockActive(
      editor,
      format,
      TEXT_ALIGN_TYPES.includes(format) ? ALIGN : TYPE,
    );

    let newProperties: Partial<SlateElement>;
    if (TEXT_ALIGN_TYPES.includes(format)) {
      newProperties = {
        align: isActive ? undefined : format,
      };
    } else {
      newProperties = {
        // type: isActive ? BLOCK_PARAGRAPH : isList ? LIST_ITEM : format,
        type: isActive ? BLOCK_PARAGRAPH : format,
      };
    }
    Transforms.setNodes<SlateElement>(editor, newProperties);
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
