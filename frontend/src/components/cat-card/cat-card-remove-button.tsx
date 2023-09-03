import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";

export const RemoveButton = ({
  loading,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading: boolean;
}) => {
  return (
    <button
      {...rest}
      type="button"
      className="flex items-center rounded-md border border-gray-200 px-2 py-1 text-red-600"
    >
      {loading ? (
        <ArrowPathIcon className="mr-1 h-4 w-4  animate-spin text-red-600" />
      ) : (
        <TrashIcon className="mr-1 h-4 w-4 text-red-600" />
      )}
      {loading ? "Removing" : "Remove"}
    </button>
  );
};
