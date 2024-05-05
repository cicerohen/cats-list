import { Field } from "../../field";
import { TextInput } from "grommet";
import { Values } from "../use-signup-form";

export const RepeatPassword = () => {
  return (
    <Field<Values["repeatPassword"]>
      name="repeatPassword"
      label="Repeat password"
    >
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
