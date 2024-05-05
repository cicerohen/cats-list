import { TextInput } from "grommet";

import { Field } from "../../field";
import { ProfileValues } from "../use-profile-form";

export const Name = () => {
  return (
    <Field<ProfileValues["name"]> name="name" label="Name">
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
