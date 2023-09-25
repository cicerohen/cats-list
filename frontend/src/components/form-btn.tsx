type Props = {
  children: React.ReactNode;
};

export const FormButton = ({ children }: Props) => {
  return (
    <button
      type="submit"
      className="rounded-md bg-lime-600 px-5  py-3 text-white"
    >
      {children}
    </button>
  );
};
