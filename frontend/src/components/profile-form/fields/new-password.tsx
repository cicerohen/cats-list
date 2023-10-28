import { Field } from "../field";
import { InputPassword } from "../../input-password";

export const NewPassword = () => {
  return (
    <Field name="newPassword" label="New password">
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
