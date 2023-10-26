import { Field } from "../field";
import { InputPassword } from "../../input-password";

export const Password = () => {
  return (
    <Field name="password" label="Password">
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
