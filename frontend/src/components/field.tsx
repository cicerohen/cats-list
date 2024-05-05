import {
  useFormikContext,
  FieldInputProps,
  FormikValues,
  FieldHelperProps,
  FormikState,
} from "formik";

import { Box, Text } from "grommet";

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
    <Box>
      <Text margin={{ bottom: "small" }}>{label}</Text>
      {children({
        field: getFieldProps(name),
        helpers: getFieldHelpers(name),
        form: rest,
      })}
      <Text margin={{ top: "small" }} size="small" color="red">
        {getFieldMeta(name).error}
      </Text>
    </Box>
  );
};
