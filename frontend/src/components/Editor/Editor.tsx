import { useState } from "react";
import { createEditor, Descendant } from "slate";
import {
  Slate,
  Editable,
  withReact,
  RenderElementProps,
  RenderLeafProps,
} from "slate-react";

import { Toolbar } from "./Toolbar";
import { Leaf } from "./Leaf";
import { Element } from "./Element";

type Props = Partial<Parameters<typeof Slate>[0]>;

export const Editor = ({ onChange }: Props) => {
  const [editor] = useState(() => withReact(createEditor()));

  const initialValue: Descendant[] = [
    {
      type: "paragraph",
      children: [
        {
          text: "",
        },
      ],
    },
  ];

  const renderElement = (props: RenderElementProps) => <Element {...props} />;
  const renderLeaf = (props: RenderLeafProps) => <Leaf {...props} />;

  return (
    <Slate editor={editor} initialValue={initialValue} onChange={onChange}>
      <div className="border border-gray-400 rounded-md overflow-hidden">
        <Toolbar />
        <Editable
          className="p-4"
          placeholder="Enter your text here"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
      </div>
    </Slate>
  );
};
