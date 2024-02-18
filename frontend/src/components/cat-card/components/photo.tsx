import PhotoIcon from "@heroicons/react/24/outline/PhotoIcon";
import { Cat } from "@app/types";

type Props = Pick<Cat["photo"], "url">;

export const Photo = ({ url }: Props) => {
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
};
