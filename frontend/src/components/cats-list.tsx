import { Loader } from "./loader";
import { Cat } from "@app/types";

type Props = {
  cats: Cat[];
  loading: boolean;
  renderCat: (cat: Cat) => JSX.Element;
};

export const CatsList = ({ cats, loading, renderCat }: Props) => {
  return (
    <div className="relative z-0 min-h-[800px]">
      {loading && (
        <div className="absolute w-full bg-red-200">
          <Loader className="absolute" />
        </div>
      )}
      {cats.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cats.map((cat) => renderCat(cat))}
        </div>
      )}
      {!loading && cats.length === 0 && (
        <p className="text-center text-gray-600">No cats to show</p>
      )}
    </div>
  );
};
