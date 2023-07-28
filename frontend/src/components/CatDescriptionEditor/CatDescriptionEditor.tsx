import { Descendant } from "slate";

import { Slate, Editable, RenderLeafProps, ReactEditor } from "slate-react";

import { Toolbar } from "./Toolbar";
import { Leaf } from "./Leaf";

type Props = {
  editor: ReactEditor;
  onChange: (value: Descendant[]) => void;
};

export const CatDescriptionEditor = ({ onChange, editor }: Props) => {
  const renderLeaf = (props: RenderLeafProps) => <Leaf {...props} />;

  return (
    <Slate
      editor={editor}
      initialValue={[
        {
          type: "paragraph",
          children: [
            {
              text: "",
            },
          ],
        },
      ]}
      onChange={onChange}
    >
      <div className="border border-gray-300 rounded-md">
        <Toolbar />
        <Editable
          className="p-4"
          placeholder="Describe your kitten here"
          renderLeaf={renderLeaf}
        />
      </div>
    </Slate>
  );
};
