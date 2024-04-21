import { useFormikContext } from "formik";

import { Field } from "../../field";
import { Values } from "../use-cat-form";

export const Name = () => {
  const { isSubmitting } = useFormikContext();
  return (
    <Field<Values["name"]> name="name" label="Name">
      {({ field }) => {
        return (
          <input
            placeholder="Enter your cat name"
            disabled={isSubmitting}
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
