import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";

type Props = {
  disabled: boolean;
  loading: boolean;
};

export const SubmitButton = ({ disabled, loading }: Props) => {
  return (
    <button
      title="Save cat"
      aria-disabled={disabled}
      type="submit"
      disabled={disabled}
      className="flex items-center rounded-md bg-green-700 px-7 py-3 text-white disabled:opacity-70"
    >
      {loading && <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />}
      Save
    </button>
  );
};
