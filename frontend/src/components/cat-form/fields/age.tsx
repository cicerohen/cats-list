import { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { Select } from "grommet";

import { Field } from "../../field";
import { Age as AgeType } from "@app/types";

import { Values } from "../use-cat-form";

type Props = {
  ages: AgeType[];
};

export const Age = ({ ages }: Props) => {
  const { setFieldValue, validateForm } = useFormikContext();
  const [options, setOptions] = useState<AgeType[]>(ages);

  useEffect(() => {
    setOptions(ages);
  }, [ages]);

  return (
    <Field<Values["age"]> name="age" label="Age">
      {({ field, form }) => {
        return (
          <Select
            disabled={form.isSubmitting}
            options={options}
            onClose={() => {
              setOptions(ages);
              validateForm();
            }}
            onChange={({ option }) => setFieldValue(field.name, option)}
            value={field.value}
            labelKey="name"
            size="medium"
          />
        );
      }}
    </Field>
  );
};
