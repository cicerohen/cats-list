import { Field } from "../../field";
import { TextInput } from "grommet";

import { Values } from "../use-signin-form";

export const Email = () => {
  return (
    <Field<Values["email"]> name="email" label="Email">
      {({ field, form }) => {
        return (
          <TextInput
            id={field.name}
            name={field.name}
            value={field.value}
            disabled={form.isSubmitting}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        );
      }}
    </Field>
  );
};
