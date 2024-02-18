import { Field } from "../../field";
import { InputPassword } from "../../input-password";
import { PassswordValues } from "../use-password-form";

export const Password = () => {
  return (
    <Field<PassswordValues["password"]> name="password" label="Password">
      {({ field, form }) => {
        return (
          <InputPassword
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
