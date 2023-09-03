import PencilIcon from "@heroicons/react/24/outline/PencilIcon";

export const EditButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) => {
  return (
    <button
      {...props}
      type="button"
      className="flex items-center rounded-md border border-gray-300 px-2 py-1"
    >
      <PencilIcon className="mr-1 h-4 w-4" />
      Edit
    </button>
  );
};
