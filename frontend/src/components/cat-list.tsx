import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import { CatCard } from "./cat-card";
import { Cat } from "@app/types";

type Props = {
  cats: Cat[];
  showLoading: boolean;
  renderCat: (cat: Cat) => React.ReactNode;
};

export const CatList = ({ cats, showLoading, renderCat }: Props) => {
  return (
    <div className="relative min-h-[400px]">
      {showLoading && (
        <div className="absolute flex h-full w-full items-center justify-center bg-white/50">
          <ArrowPathIcon className="mr-2 h-5 w-5 animate-spin" />
          <span>Loading cats</span>
        </div>
      )}
      {!showLoading && !cats.length && (
        <p className="absolute flex h-full w-full items-center justify-center">
          No cats to show
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <CatCard
          name=""
          id="2"
          breed={{ name: "", id: 2 }}
          age={{ name: "", id: 2 }}
          description=""
          photo={{
            url: "",
            key: "",
          }}
        />
        <CatCard
          name=""
          id="2"
          breed={{ name: "", id: 2 }}
          age={{ name: "", id: 2 }}
          description=""
          photo={{
            url: "",
            key: "",
          }}
        />
        <CatCard
          name=""
          id="2"
          breed={{ name: "", id: 2 }}
          age={{ name: "", id: 2 }}
          description=""
          photo={{
            url: "",
            key: "",
          }}
        />
      </div>
    </div>
  );
};
