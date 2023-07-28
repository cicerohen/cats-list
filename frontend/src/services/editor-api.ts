import { ReactEditor } from "slate-react";
import { BaseEditor, Editor, Descendant, Transforms } from "slate";

export type Mark = "bold" | "italic" | "underline";
export type Format = Mark | "paragraph";
export type Text = Partial<Record<Mark, boolean>> & {
  text: string;
};
export type Element = {
  type: Format;
  children: Text[];
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: Element;
    Text: Text;
  }
}

export const isMarkActive = (editor: Editor, mark: Mark) => {
  if (!editor.selection) {
    return false;
  }
  const marks = Editor.marks(editor);
  return !!marks?.[mark];
};

export const toggleMark = (editor: Editor, mark: Mark) => {
  if (isMarkActive(editor, mark)) {
    Editor.removeMark(editor, mark);
    return;
  }
  Editor.addMark(editor, mark, true);
};

export const resetEditor = (editor: ReactEditor, value: Descendant[]) => {
  editor.children.map(() => {
    Transforms.delete(editor, { at: [0] });
  });
  Transforms.insertNodes(editor, value, {
    at: [0],
  });
};
