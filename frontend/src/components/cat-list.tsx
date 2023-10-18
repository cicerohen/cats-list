import { CatCard } from "./cat-card";
import { Cat } from "@app/types";

type Props = {
  cats: Cat[];
};

export const CatList = ({ cats }: Props) => {
  return (
    <div className="relative min-h-[400px]">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {cats.map((cat) => (
          <CatCard key={cat.id} {...cat} />
        ))}
      </div>
    </div>
  );
};
