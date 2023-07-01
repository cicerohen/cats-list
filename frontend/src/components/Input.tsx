import { twMerge } from "tailwind-merge";

export type Props = {
  invalid: boolean;
} & React.DOMAttributes<object> &
  React.AllHTMLAttributes<object>;

export const Input = ({ invalid = false, ...rest }: Props) => {
  return (
    <input
      {...rest}
      className={twMerge(
        "block h-14 w-full rounded-md border border-gray-300 px-4 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none",
        invalid && [
          "border-red-500",
          "text-red-600",
          "focus:border-red-500",
          "focus:ring-red-500",
        ]
      )}
    />
  );
};
