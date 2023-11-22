import { Descendant, BaseEditor, BaseRange, Range, Element } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";
import {
  BADGE,
  BLOCK_HEADING_ONE,
  BLOCK_HEADING_THREE,
  BLOCK_HEADING_TWO,
  BLOCK_PARAGRAPH,
  BLOCK_QUOTE,
  BULLETED_LIST,
  BUTTON,
  CHECK_LIST_ITEM,
  CODE_LINE,
  EDITABLE_VOID,
  IMAGE,
  LINK,
  LIST_ITEM,
  MARK_CODE,
  MENTION,
  TABLE,
  TABLE_CELL,
  TABLE_ROW,
  TITLE,
  VIDEO,
} from "@/components/slate-plugins/constants";

export type BlockQuoteElement = {
  type: BLOCK_QUOTE;
  align?: string;
  children: Descendant[];
};

export type BulletedListElement = {
  type: BULLETED_LIST;
  align?: string;
  children: Descendant[];
};

export type CheckListItemElement = {
  type: CHECK_LIST_ITEM;
  checked: boolean;
  children: Descendant[];
};

export type EditableVoidElement = {
  type: EDITABLE_VOID;
  children: EmptyText[];
};

export type HeadingElement = {
  type: BLOCK_HEADING_ONE;
  align?: string;
  children: Descendant[];
};

export type HeadingTwoElement = {
  type: BLOCK_HEADING_TWO;
  align?: string;
  children: Descendant[];
};

export type HeadingThreeElement = {
  type: BLOCK_HEADING_THREE;
  align?: string;
  children: Descendant[];
};

export type ImageElement = {
  type: IMAGE;
  url: string;
  children: EmptyText[];
};

export type LinkElement = { type: LINK; url: string; children: Descendant[] };

export type ButtonElement = { type: BUTTON; children: Descendant[] };

export type BadgeElement = { type: BADGE; children: Descendant[] };

export type ListItemElement = { type: LIST_ITEM; children: Descendant[] };

export type MentionElement = {
  type: MENTION;
  character: string;
  children: CustomText[];
};

export type ParagraphElement = {
  type: BLOCK_PARAGRAPH;
  align?: string;
  children: Descendant[];
};

export type TableElement = { type: TABLE; children: TableRow[] };

export type TableCellElement = { type: TABLE_CELL; children: CustomText[] };

export type TableRowElement = { type: TABLE_ROW; children: TableCell[] };

export type TitleElement = { type: TITLE; children: Descendant[] };

export type VideoElement = {
  type: VIDEO;
  url: string;
  children: EmptyText[];
};

export type CodeBlockElement = {
  type: MARK_CODE;
  language: string;
  children: Descendant[];
};

export type CodeLineElement = {
  type: CODE_LINE;
  children: Descendant[];
};

type CustomElement =
  | BlockQuoteElement
  | BulletedListElement
  | CheckListItemElement
  | EditableVoidElement
  | HeadingElement
  | HeadingTwoElement
  | HeadingThreeElement
  | ImageElement
  | LinkElement
  | ButtonElement
  | BadgeElement
  | ListItemElement
  | MentionElement
  | ParagraphElement
  | TableElement
  | TableRowElement
  | TableCellElement
  | TitleElement
  | VideoElement
  | CodeBlockElement
  | CodeLineElement;

export type CustomText = {
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  text?: string;
};

export type EmptyText = {
  text: string;
};

export type CustomEditor = BaseEditor &
  ReactEditor &
  HistoryEditor & {
    nodeT;
    oDecorations?: Map<Element, Range[]>;
  };

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText | EmptyText;
    Range: BaseRange & {
      [key: string]: unknown;
    };
  }
}
