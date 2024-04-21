import { Field } from "../../field";
import { Values } from "../use-signin-form";

export const Email = () => {
  return (
    <Field<Values["email"]> name="email" label="Email">
      {({ field }) => {
        return (
          <input
            id={field.name}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            className="h-12 w-full rounded-md border border-gray-300 px-4 disabled:bg-gray-100 disabled:opacity-70"
          />
        );
      }}
    </Field>
  );
};
