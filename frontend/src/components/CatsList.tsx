import { CatCard } from "./CatCard";

import { Cat } from "@app/types";

type Props = {
  cats: Cat[];
};

export const CatsList = ({ cats }: Props) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {cats.map((cat) => {
        return <CatCard key={cat.id} {...cat} />;
      })}
    </div>
  );
};
