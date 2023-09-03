import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("flex items-center rounded-md px-6 py-3 text-lg", {
  variants: {
    action: {
      save: "bg-lime-600 text-white disabled:opacity-80",
      delete: "text-red-600",
    },
  },
});

const saveText = cva("", {
  variants: {
    isSaving: {
      true: "Saving...",
      false: "Save",
    },
  },
});

const deleteText = cva("", {
  variants: {
    isDeleting: {
      true: "Deleting...",
      false: "Delete",
    },
  },
});

import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> &
  Required<VariantProps<typeof buttonVariants>> & {
    isLoading?: boolean;
  };

export const ActionButton = ({ action, isLoading = false, ...rest }: Props) => {
  return (
    <button
      type={action === "save" ? "submit" : "button"}
      className={buttonVariants({ action })}
      {...rest}
    >
      {isLoading && <ArrowPathIcon className="mr-2 h-5 w-5 animate-spin" />}
      {action === "save" && saveText({ isSaving: isLoading })}
      {action === "delete" && deleteText({ isDeleting: isLoading })}
    </button>
  );
};
