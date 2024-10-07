import { useState } from "react";

import EyeSlashIcon from "@heroicons/react/24/solid/EyeSlashIcon";
import EyeIcon from "@heroicons/react/24/solid/EyeIcon";

export const InputPassword = (
  props: React.InputHTMLAttributes<HTMLInputElement>,
) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative flex h-12 w-full rounded-md border border-gray-300 disabled:bg-gray-100 disabled:opacity-70">
      <input
        {...props}
        type={(show && "text") || "password"}
        className="w-full flex-1 rounded-md px-4 pr-10"
      />
      <div className="absolute right-0 flex  h-full w-12 items-center justify-center">
        <button
          type="button"
          className="text-gray-500"
          onClick={() => {
            setShow((prev) => !prev);
          }}
        >
          {(show && <EyeIcon className=" h-5 w-5" />) || (
            <EyeSlashIcon className=" h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
};
