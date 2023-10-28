import { Field } from "../field";
import { InputPassword } from "../../input-password";

export const RepeatPassword = () => {
  return (
    <Field name="repeatPassword" label="Repeat password">
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
