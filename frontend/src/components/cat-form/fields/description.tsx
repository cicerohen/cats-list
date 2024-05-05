import { BaseEditor } from "slate";
import { Box } from "grommet";
import { ReactEditor } from "slate-react";
import { useFormikContext } from "formik";
import { Descendant } from "slate";
import { Slate, Editable, RenderLeafProps } from "slate-react";

import { Field } from "../../field";
import { Leaf } from "../../slate-editor/leaf";
import { MarkButton } from "../../slate-editor/mark-button";

type Props = {
  editor: BaseEditor & ReactEditor;
};

export const Description = ({ editor }: Props) => {
  const renderLeaf = (props: RenderLeafProps) => <Leaf {...props} />;
  const { setFieldValue, isSubmitting } = useFormikContext();

  const onChange = (e: Descendant[]) => {
    setFieldValue("description", JSON.stringify(e));
  };

  return (
    <Field name="description" label="Description">
      {() => {
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
            <Box border round="small">
              <Box border={{ side: "bottom" }}>
                <Box flex direction="row" pad="small">
                  <MarkButton mark="bold" disabled={isSubmitting} />
                  <MarkButton mark="italic" disabled={isSubmitting} />
                  <MarkButton mark="underline" disabled={isSubmitting} />
                </Box>
              </Box>
              <Editable
                placeholder="Describe your cat"
                style={{
                  padding: "1rem",
                }}
                readOnly={isSubmitting}
                renderLeaf={renderLeaf}
              />
            </Box>
          </Slate>
        );
      }}
    </Field>
  );
};
