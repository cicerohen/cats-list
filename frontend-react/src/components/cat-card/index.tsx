import { Link } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { Slate, Editable, RenderLeafProps, withReact } from "slate-react";
import { Descendant, createEditor } from "slate";
import PhotoIcon from "@heroicons/react/24/outline/PhotoIcon";
import { Leaf } from "../slate-editor/leaf";
import { resetEditor } from "../../utils/slate-editor";
import { Cat } from "@app/types";

export const CatCard = {
  Root,
  Header,
  Footer,
  Photo,
  Title,
  Description,
  Breed,
  Age,
  Edit,
  Skeleton,
};

function Root({ children }: React.PropsWithChildren) {
  return (
    <div className="group relative flex flex-col justify-between  overflow-hidden rounded-lg border border-gray-200  transition-all">
      {children}
    </div>
  );
}

function Header({ children }: React.PropsWithChildren) {
  return <div className="p-4">{children}</div>;
}

function Footer({ children }: React.PropsWithChildren) {
  return <div className="px-4 pb-4">{children}</div>;
}

function Title({ children }: React.PropsWithChildren) {
  return <h2 className="text-xl">{children}</h2>;
}

function Breed({ children }: React.PropsWithChildren) {
  return <p className="text-lg text-gray-600">{children}</p>;
}

function Age({ children }: React.PropsWithChildren) {
  return <p className="text-sm font-semibold text-gray-600">{children}</p>;
}

function Description({ description }: { description: string }) {
  const editor = useMemo(() => withReact(createEditor()), []);
  const renderLeaf = (props: RenderLeafProps) => <Leaf {...props} />;

  useEffect(() => {
    if (description) {
      resetEditor(editor, JSON.parse(description) as Descendant[]);
    }
  }, [editor, description]);
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
}

function Photo({ url }: Pick<Cat["photo"], "url">) {
  return (
    <div
      style={
        {
          "--bg-url": `url(${url})`,
        } as React.CSSProperties
      }
      className="
      relative mb-4 flex h-52 w-full items-center justify-center rounded-lg border  bg-[image:var(--bg-url)] bg-cover bg-center bg-no-repeat grayscale group-hover:grayscale-0"
    >
      {!url && <PhotoIcon className="h-8 w-8 text-gray-300" />}
    </div>
  );
}

function Edit({ catId }: { catId: string }) {
  return (
    <Link
      to={`/cats/${catId}/edit`}
      className="inline-block rounded-md bg-green-700 px-5 py-2 text-sm font-medium text-white"
    >
      Edit
    </Link>
  );
}

function Skeleton() {
  return (
    <div className="flex animate-pulse flex-col justify-between space-y-4 rounded-lg border p-4">
      <div className="space-y-2">
        <div className="mb-4 h-52 w-full animate-pulse rounded-lg bg-gray-200"></div>
        <div className="h-4 max-w-[100px] animate-pulse rounded-full bg-gray-200" />
        <div className="h-4 animate-pulse rounded-full  bg-gray-200" />
        <div className="h-4 animate-pulse rounded-full  bg-gray-200" />
      </div>
      <div className="h-10  w-20 animate-pulse rounded-lg bg-gray-200 px-3 py-2  text-white" />
    </div>
  );
}
