import { useEffect, useMemo } from "react";
import { Descendant, createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { Link } from "react-router-dom";

import { CatCardPhoto } from "./cat-card-photo";
import { resetEditor } from "../../services/slate-editor-api";

import { Cat } from "@app/types";

export type Props = Cat;
export const CatCard = ({
  id,
  name,
  age,
  breed,
  description,
  photo,
}: Props) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  useEffect(() => {
    if (description) {
      resetEditor(editor, JSON.parse(description) as Descendant[]);
    }
  }, [editor, description]);

  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 p-4 transition-all">
      <CatCardPhoto {...photo} />
      <h2 className="text-xl">{name}</h2>
      <p className="text-lg text-gray-600">{breed.name}</p>
      <p className="text-sm font-semibold text-gray-600">{age.name}</p>
      {description && (
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
          <Editable readOnly className="mt-4 text-gray-600" />
        </Slate>
      )}

      <Link to="/cats/2/edit">Edit</Link>
    </div>
  );
};
