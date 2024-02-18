import { Slate, Editable, ReactEditor, RenderLeafProps } from "slate-react";
import { BaseEditor } from "slate";
import { Leaf } from "../../slate-editor/leaf";

type Props = {
  editor: BaseEditor & ReactEditor;
};

export const Description = ({ editor }: Props) => {
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
    >
      <Editable
        readOnly
        className="mt-4 text-gray-600"
        renderLeaf={renderLeaf}
      />
    </Slate>
  );
};
