import { Field } from "../../field";
import { InputPassword } from "../../input-password";

import { Values } from "../use-signin-form";

export const Password = () => {
  return (
    <Field<Values["password"]> name="password" label="Password">
      {({ field, form }) => {
        return (
          <InputPassword
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
