import {
  Editor as SlateEditor,
  Element as SlateElement,
  Transforms,
} from "slate";
import {
  CustomText,
  MarkFormat,
} from "@/components/slate-plugins/custom-types";
import {
  ALIGN,
  MARK_CODE,
  BLOCK_PARAGRAPH,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
  TEXT_ALIGN_TYPES,
  TYPE,
  LIST_TYPES,
  LIST_ITEM,
  NUMBER_LIST,
  BULLETED_LIST,
  IMAGE,
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
      MarkEditor.toggleMark(editor, MARK_CODE);
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

export const ShiftEnter = (event: any, editor: any) => {
  event.preventDefault();
  editor.insertText("\n");
};

export const ListDeleter = {
  isElementListType(editor: any) {
    const [match]: any = SlateEditor.nodes(editor, {
      match: (n: any) => n.type === NUMBER_LIST || n.type === BULLETED_LIST,
    });
    let length;
    if (!!match) {
      length =
        match[0].children[match[0].children.length - 1].children[0].text.length;
    }
    return {
      isMatch: !!match,
      match,
      length,
    };
  },

  ActionHandler(editor: any, event: any) {
    const { isMatch, length } = ListDeleter.isElementListType(editor);
    if (length === 0 && isMatch) {
      event.preventDefault();
      Transforms.unwrapNodes(editor, {
        match: (n: any) => LIST_TYPES.includes(n.type),
        split: true,
      });
      Transforms.setNodes(editor, {
        type: BLOCK_PARAGRAPH,
      });
    }
  },
};

export const ListEditor = {
  isListActive(editor: any, format: string) {
    const [match]: any = SlateEditor.nodes(editor, {
      match: (n: any) => n.type === format,
    });
    return !!match;
  },

  toggleList(editor: any, format: string) {
    const isActive = ListEditor.isListActive(editor, format);
    const isList = LIST_TYPES.includes(format);
    Transforms.unwrapNodes(editor, {
      match: (n: any) => LIST_TYPES.includes(n.type),
      split: true,
    });

    Transforms.setNodes(editor, {
      type: isActive ? BLOCK_PARAGRAPH : isList ? LIST_ITEM : format,
    });

    if (!isActive && isList) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  },
};

export const BlockEditor = {
  isBlockActive(editor: any, format: string, blockType = TYPE) {
    const { selection } = editor;
    if (!selection) return false;

    const [match]: any = SlateEditor.nodes(editor, {
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
        type: isActive ? BLOCK_PARAGRAPH : format,
      };
    }
    Transforms.setNodes<SlateElement>(editor, newProperties);
  },
};

export const MarkEditor = {
  isMarkActive(editor: any, format: MarkFormat) {
    const marks: Omit<CustomText, "text"> | null = SlateEditor.marks(editor);
    return marks ? (marks as any)[format] === true : false;
  },

  toggleMark(editor: any, format: MarkFormat) {
    const isActive = MarkEditor.isMarkActive(editor, format);
    if (isActive) {
      SlateEditor.removeMark(editor, format);
    } else {
      SlateEditor.addMark(editor, format, true);
    }
  },
};
