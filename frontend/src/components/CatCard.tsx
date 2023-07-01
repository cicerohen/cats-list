import HeartIcon from "@heroicons/react/24/solid/HeartIcon";
import HeartIconOutline from "@heroicons/react/24/outline/HeartIcon";

import {Cat} from "@app/types";


type Props = Cat;

export const CatCard = ({ name, age, breed, thumbnail }: Props) => {
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
      <p className="text-lg text-gray-600">{breed}</p>
      <p className="text-sm font-semibold text-gray-600">{age}</p>
      <p className="mt-4 text-gray-600">
        Bartô é um gato vagabundo que não dispensa uma ração premium e umas 20
        horas de sono
      </p>
    </div>
  );
};
