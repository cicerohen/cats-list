import { CatCard } from "./CatCard";

import { Cat } from "@app/types";

type Props = {
  cats: Cat[];
  onEdit?: (cat: Cat) => void;
};

export const CatsList = ({ cats, onEdit }: Props) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {cats.map((cat) => {
        return <CatCard key={cat.id} {...cat} onEdit={onEdit} />;
      })}
    </div>
  );
};
