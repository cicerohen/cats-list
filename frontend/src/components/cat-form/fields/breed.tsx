import { useEffect, useState } from "react";
import { Select } from "grommet";
import { useFormikContext } from "formik";

import { Field } from "../../field";

import { Breed as BreedType } from "@app/types";
import { Values } from "../use-cat-form";

type Props = {
  breeds: BreedType[];
};

export const Breed = ({ breeds }: Props) => {
  const { setFieldValue, validateForm } = useFormikContext();
  const [options, setOptions] = useState<BreedType[]>(breeds);

  const onSearch = (text: string) => {
    // setQuery(text);
    // The line below escapes regular expression special characters:
    // [ \ ^ $ . | ? * + ( )
    const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");

    // // Create the regular expression with modified value which
    // // handles escaping special characters. Without escaping special
    // // characters, errors will appear in the console
    const exp = new RegExp(escapedText, "i");
    setOptions(breeds.filter((breed) => exp.test(breed.name)));
  };

  useEffect(() => {
    setOptions(breeds);
  }, [breeds]);
  return (
    <Field<Values["breed"]> name="breed" label="Breed">
      {({ field, form }) => {
        console.log("dddd", field);
        return (
          <Select
            disabled={form.isSubmitting}
            options={options}
            onClose={() => {
              setOptions(breeds);
              validateForm();
            }}
            onChange={({ option }) => setFieldValue(field.name, option)}
            onSearch={onSearch}
            value={field.value}
            labelKey="name"
            size="medium"
          />
        );
      }}
    </Field>
  );
};
