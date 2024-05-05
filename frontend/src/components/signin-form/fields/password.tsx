import { Field } from "../../field";
import { TextInput } from "grommet";
import { Values } from "../use-signin-form";

export const Password = () => {
  return (
    <Field<Values["password"]> name="password" label="Password">
      {({ field, form }) => {
        return (
          <TextInput
            type="password"
            id={field.name}
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
