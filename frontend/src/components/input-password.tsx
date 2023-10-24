import { useState } from "react";

import EyeSlashIcon from "@heroicons/react/24/solid/EyeSlashIcon";
import EyeIcon from "@heroicons/react/24/solid/EyeIcon";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const InputPassword = (props: Props) => {
  const [show, setShow] = useState(false);
  return (
    <span className="relative flex h-12 w-full rounded-md border border-gray-300 disabled:bg-gray-100 disabled:opacity-70">
      <input
        {...props}
        type={(show && "text") || "password"}
        className="w-full flex-1 rounded-md px-4 pr-10"
      />
      <span className="absolute right-0 flex  h-full w-12 items-center justify-center">
        <button
          type="button"
          onClick={() => {
            setShow((prev) => !prev);
          }}
        >
          {(show && <EyeIcon className=" h-6 w-6" />) || (
            <EyeSlashIcon className=" h-6 w-6" />
          )}
        </button>
      </span>
    </span>
  );
};
