import { useEffect, useMemo } from "react";
import { Descendant, createEditor } from "slate";

import { withReact } from "slate-react";
import { Link } from "react-router-dom";

import { Photo } from "./components/photo";
import { Description } from "./components/description";

import { resetEditor } from "../../utils/slate-editor";

import { Cat } from "@app/types";

export type Props = Cat & {
  editable: boolean;
};

export const CatCard = ({
  id,
  name,
  age,
  breed,
  description,
  photo,
  editable,
}: Props) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  useEffect(() => {
    if (description) {
      resetEditor(editor, JSON.parse(description) as Descendant[]);
    }
  }, [editor, description]);

  return (
    <div className="group relative flex flex-col justify-between space-y-6 overflow-hidden rounded-lg border border-gray-200 p-4 transition-all">
      <div>
        <Photo url={photo.url} />

        <h2 className="text-xl">{name}</h2>
        <p className="text-lg text-gray-600">{breed.name}</p>
        <p className="text-sm font-semibold text-gray-600">{age.name}</p>
        {description && <Description editor={editor} />}
      </div>

      {editable && (
        <div>
          <Link
            to={`/cats/${id}/edit`}
            className="inline-block rounded-md bg-green-700 px-5 py-2 text-sm font-medium text-white"
          >
            Edit
          </Link>
        </div>
      )}
    </div>
  );
};
