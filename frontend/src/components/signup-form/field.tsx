import {
  useFormikContext,
  FieldInputProps,
  FormikValues,
  FieldHelperProps,
  FormikState,
} from "formik";

type Props = {
  name: string;
  label: string;
  children: (props: {
    field: FieldInputProps<never>;
    helpers: FieldHelperProps<never>;
    form: FormikState<FormikValues>;
  }) => React.ReactNode;
};

export const Field = ({ name, label, children }: Props) => {
  const { getFieldProps, getFieldHelpers, getFieldMeta, ...rest } =
    useFormikContext<FormikValues>();

  return (
    <label className="block">
      <span className="mb-2 block">{label}</span>
      {children({
        field: getFieldProps(name),
        helpers: getFieldHelpers(name),
        form: rest,
      })}
      <p className="mt-2 text-sm text-red-600">{getFieldMeta(name).error}</p>
    </label>
  );
};
