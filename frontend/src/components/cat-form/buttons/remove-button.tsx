import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";

type Props = {
  disabled: boolean;
  loading: boolean;
  onClick: () => void;
};

export const RemoveButton = ({ disabled, loading, onClick }: Props) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className="flex items-center rounded-md px-7 py-3 text-red-600 enabled:hover:bg-red-100 disabled:opacity-70"
      onClick={onClick}
    >
      {loading && <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />}
      Remove cat
    </button>
  );
};
