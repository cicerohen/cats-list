import { TextInput } from "grommet";
import { Field } from "../../field";
import { PassswordValues } from "../use-password-form";

export const Password = () => {
  return (
    <Field<PassswordValues["password"]> name="password" label="Password">
      {({ field, form }) => {
        return (
          <TextInput
            id={field.name}
            type="password"
            name={field.name}
            disabled={form.isSubmitting}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        );
      }}
    </Field>
  );
};
