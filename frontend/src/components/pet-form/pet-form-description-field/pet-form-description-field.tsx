import { useEffect, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { Descendant } from "slate";
import { createEditor } from "slate";
import { withReact } from "slate-react";
import { Slate, Editable, RenderLeafProps } from "slate-react";

import { Field, Props as FieldProps } from "../pet-form-field";
import { Leaf } from "./leaf";
import { MarkButton } from "./mark-button";

import { resetEditor } from "../../../services/slate-editor-api";

type Props = Omit<FieldProps, "children"> & {
  value: string;
  disabled: boolean;
  onChange: (value: Descendant[]) => void;
};

export const DescriptionField = ({
  value,
  label,
  invalid,
  disabled,
  errorMessage,
  onChange,
}: Props) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const renderLeaf = (props: RenderLeafProps) => <Leaf {...props} />;

  useEffect(() => {
    if (value) {
      resetEditor(editor, JSON.parse(value));
    }
  }, []);
  return (
    <Field label={label} invalid={invalid} errorMessage={errorMessage}>
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
            disabled && "bg-gray-100",
          )}
        >
          <section className="border-b border-gray-200">
            <div className="flex space-x-2 p-4">
              <MarkButton mark="bold" disabled={disabled} />
              <MarkButton mark="italic" disabled={disabled} />
              <MarkButton mark="underline" disabled={disabled} />
            </div>
          </section>
          <Editable
            className="p-4"
            placeholder="Describe your kitten here"
            readOnly={disabled}
            renderLeaf={renderLeaf}
          />
        </div>
      </Slate>
    </Field>
  );
};
