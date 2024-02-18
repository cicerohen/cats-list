import {
  useFormikContext,
  FieldInputProps,
  FormikValues,
  FieldHelperProps,
  FormikState,
} from "formik";

type Props<Value> = {
  name: string;
  label: string;
  children: (props: {
    field: FieldInputProps<Value>;
    helpers: FieldHelperProps<Value>;
    form: FormikState<FormikValues>;
  }) => React.ReactNode;
};

export const Field = <Value,>({ name, label, children }: Props<Value>) => {
  const { getFieldProps, getFieldHelpers, getFieldMeta, ...rest } =
    useFormikContext<FormikValues>();

  return (
    <div className="block">
      <span className="mb-2 block">{label}</span>
      {children({
        field: getFieldProps(name),
        helpers: getFieldHelpers(name),
        form: rest,
      })}
      <p className="mt-2 text-sm text-red-600">{getFieldMeta(name).error}</p>
    </div>
  );
};
