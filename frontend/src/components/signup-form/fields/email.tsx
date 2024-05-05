import { Field } from "../../field";
import { TextInput } from "grommet";

import { Values } from "../use-signup-form";

export const Email = () => {
  return (
    <Field<Values["email"]> name="email" label="Email">
      {({ field, form }) => {
        return (
          <TextInput
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
