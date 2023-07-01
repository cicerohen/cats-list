import { ReactEditor } from "slate-react";
import { BaseEditor } from "slate";

export type BlockFormat =
  | "paragraph"
  | "left"
  | "center"
  | "right"
  | "justify"
  | "list-item"
  | "bulleted-list"
  | "numbered-list";

export type MarkFormat =
  | "bold"
  | "italic"
  | "block-quote"
  | "underline"
  | "code";

export type AlignFormat = "left" | "center" | "right" | "justify";
export type ListFormat = "list-item" | "bulleted-list" | "numbered-list";

export type Format = BlockFormat | MarkFormat | AlignFormat | ListFormat;

export type Text = Partial<Record<MarkFormat, boolean>> & {
  text: string;
};

type ElementType = Exclude<Format, AlignFormat>;

export type Element = {
  type: ElementType;
  children: Text[];
  align?: AlignFormat;
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: Element;
    Text: Text;
  }
}
