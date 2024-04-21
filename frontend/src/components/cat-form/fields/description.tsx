import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import { twMerge } from "tailwind-merge";
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
            <div
              className={twMerge(
                "rounded-md border border-gray-300",
                isSubmitting && "bg-gray-100",
              )}
            >
              <section className="border-b border-gray-200">
                <div className="flex space-x-2 p-4">
                  <MarkButton mark="bold" disabled={isSubmitting} />
                  <MarkButton mark="italic" disabled={isSubmitting} />
                  <MarkButton mark="underline" disabled={isSubmitting} />
                </div>
              </section>
              <Editable
                placeholder="Describe your cat"
                className="p-4"
                readOnly={isSubmitting}
                renderLeaf={renderLeaf}
              />
            </div>
          </Slate>
        );
      }}
    </Field>
  );
};
