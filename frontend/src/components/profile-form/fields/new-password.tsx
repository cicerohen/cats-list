import { TextInput } from "grommet";
import { Field } from "../../field";
import { PassswordValues } from "../use-password-form";

export const NewPassword = () => {
  return (
    <Field<PassswordValues["newPassword"]>
      name="newPassword"
      label="New password"
    >
      {({ field, form }) => {
        return (
          <TextInput
            id={field.name}
            type="password"
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
