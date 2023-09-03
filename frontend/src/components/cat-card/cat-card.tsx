import { useEffect, useMemo } from "react";
import { Descendant, createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

import { CatCardPhoto } from "./cat-card-photo";
import { EditButton } from "./cat-card-edit-button";
import { RemoveButton } from "./cat-card-remove-button";

import { resetEditor } from "../../services/slate-editor-api";

import { Cat } from "@app/types";

export type Props = Cat & {
  removing: boolean;
  onEdit: (cat: Cat) => void;
  onRemove: (cat: Cat) => void;
};

export const CatCard = ({
  id,
  name,
  age,
  breed,
  description,
  photo,
  removing,
  onEdit,
  onRemove,
}: Props) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const onEditHandler = () => {
    onEdit({
      id,
      name,
      age,
      breed,
      description,
      photo,
    });
  };

  const onRemoveHandler = () => {
    onRemove({
      id,
      name,
      age,
      breed,
      description,
      photo,
    });
  };

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

      <div className="mt-4 flex items-center space-x-2">
        <EditButton onClick={onEditHandler} disabled={removing} />
        <RemoveButton onClick={onRemoveHandler} loading={removing} />
      </div>
    </div>
  );
};
