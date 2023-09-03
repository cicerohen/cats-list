import HeartIcon from "@heroicons/react/24/solid/HeartIcon";
import { Cat } from "@app/types";

type Props = Cat["photo"];

export const CatCardPhoto = ({ url }: Props) => {
  return (
    <div
      style={{
        "--bg-url": `url(${url})`,
      }}
      className="relative mb-4 h-52 w-full rounded-lg border bg-[image:var(--bg-url)] bg-cover bg-center bg-no-repeat grayscale group-hover:grayscale-0"
    >
      <button className="absolute right-2 top-2 inline-flex items-center space-x-1 rounded-md bg-black/50 px-2 py-1 text-white">
        <span className="text-sm">2</span>
        <HeartIcon className="h-5 w-5" />
      </button>
    </div>
  );
};
