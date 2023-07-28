import { useEffect, useMemo } from "react";
import { Descendant, createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import HeartIcon from "@heroicons/react/24/solid/HeartIcon";

import { resetEditor } from "../services/editor-api";

import { Cat } from "@app/types";

type Props = Cat & {
  onEdit?: (cat: Cat) => void;
};

export const CatCard = ({
  id,
  name,
  age,
  breed,
  description,
  thumbnail,
  onEdit,
}: Props) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const onEditHandler = () => {
    onEdit?.({
      id,
      name,
      age,
      breed,
      description,
      thumbnail,
    });
  };

  useEffect(() => {
    if (description) {
      resetEditor(editor, JSON.parse(description) as Descendant[]);
    }
  }, [editor, description]);

  return (
    <div className="group overflow-hidden rounded-lg border border-gray-200 p-4 transition-all">
      <div
        style={{
          "--bg-url": `url(${thumbnail?.url})`,
        }}
        className="relative mb-4 h-52 w-full rounded-lg border bg-[image:var(--bg-url)] bg-cover bg-center bg-no-repeat grayscale group-hover:grayscale-0"
      >
        <button className="absolute right-2 top-2 inline-flex items-center space-x-1 rounded-md bg-black/50 px-2 py-1 text-white">
          <span className="text-sm">2</span>
          <HeartIcon className="h-5 w-5" />
        </button>
      </div>

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
      <button type="button" className="pt-4" onClick={onEditHandler}>
        Editar
      </button>
    </div>
  );
};
