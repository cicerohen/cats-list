export type Props = {
  label: string;
  errorMessage: string;
  children?: React.ReactNode;
};

export const FormField = ({ label, errorMessage, children }: Props) => {
  return (
    <div>
      {label && <span className="mb-2 block text-sm">{label}</span>}
      {children}
      {errorMessage && (
        <span className="text-xs text-red-500">{errorMessage}</span>
      )}
    </div>
  );
};
