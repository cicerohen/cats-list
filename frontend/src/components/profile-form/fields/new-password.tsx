import { Field } from "../../field";
import { InputPassword } from "../../input-password";
import { PassswordValues } from "../use-password-form";

export const NewPassword = () => {
  return (
    <Field<PassswordValues["newPassword"]>
      name="newPassword"
      label="New password"
    >
      {({ field, form }) => {
        return (
          <InputPassword
            name={field.name}
            disabled={form.isSubmitting}
            onPaste={(e) => e.preventDefault()}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        );
      }}
    </Field>
  );
};
