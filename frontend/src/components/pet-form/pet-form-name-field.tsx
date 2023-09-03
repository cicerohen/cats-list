import { Field, Props as FieldProps } from "./pet-form-field";

type Props = Omit<FieldProps, "children"> &
  React.DOMAttributes<object> &
  React.AllHTMLAttributes<object>;

export const NameField = ({ label, errorMessage, invalid, ...rest }: Props) => {
  return (
    <Field label={label} errorMessage={errorMessage} invalid={invalid}>
      <input
        className="block h-14 w-full rounded-md border border-gray-300 px-4 disabled:bg-gray-100 disabled:opacity-70"
        {...rest}
      />
    </Field>
  );
};
