import { TextInput } from "grommet";
import { Field } from "../../field";
import { Values } from "../use-cat-form";

export const Name = () => {
  return (
    <Field<Values["name"]> name="name" label="Name">
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
