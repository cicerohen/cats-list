import { TextInput } from "grommet";

import { Field } from "../../field";
import { ProfileValues } from "../use-profile-form";

export const Email = () => {
  return (
    <Field<ProfileValues["email"]> name="email" label="Email">
      {({ field }) => {
        return (
          <TextInput
            id={field.name}
            name={field.name}
            disabled
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        );
      }}
    </Field>
  );
};
