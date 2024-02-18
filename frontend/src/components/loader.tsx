import { twMerge } from "tailwind-merge";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";

type Props = {
  className?: string;
  title?: string;
};

export const Loader = ({ title, className }: Props) => {
  return (
    <p
      className={twMerge(
        "fixed left-0 top-0 z-30 flex h-full w-full items-center justify-center bg-white text-gray-700",
        className,
      )}
    >
      <span className="flex items-center space-x-2 rounded-full border border-gray-200 bg-white p-2 shadow-lg">
        <ArrowPathIcon className="h-5 w-5 animate-spin" />
      </span>
    </p>
  );
};
