import { Input } from "./Input";
import { Field } from "./Field";
import { BreedSelect } from "./BreedSelect";
import { AgeSelect } from "./AgeSelect";
import { CatDescriptionEditor } from "./CatDescriptionEditor";
import { usePetEditForm } from "../hooks/usePetEditForm";

import { Breed, Age } from "@app/types";

export type Props = ReturnType<typeof usePetEditForm> & {
  breeds: Breed[];
  ages: Age[];
};

export const PetEditForm = ({
  handleSubmit,
  handleBlur,
  handleChange,
  setFieldValue,
  validateForm,
  isSubmitting,
  validateOnBlur,
  values,
  errors,
  breeds,
  ages,
  editor,
}: Props) => {
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Field
        label="Cat name"
        invalid={!!errors.name}
        errorMessage={errors.name}
      >
        <Input
          name="name"
          invalid={!!errors.name}
          value={values.name}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </Field>
      <Field
        label="Cat breed"
        invalid={!!errors.breed}
        errorMessage={errors.breed}
      >
        <BreedSelect
          value={values.breed}
          name="breed"
          invalid={!!errors.breed}
          breeds={breeds}
          onChange={(breed) => {
            setFieldValue("breed", breed);
          }}
          onBlur={() => {
            if (validateOnBlur) {
              validateForm();
            }
          }}
        />
      </Field>

      <Field label="Cat age" invalid={!!errors.age} errorMessage={errors.age}>
        <AgeSelect
          ages={ages}
          value={values.age}
          invalid={!!errors.age}
          onChange={(age) => {
            setFieldValue("age", age);
          }}
          onBlur={() => {
            if (validateOnBlur) {
              validateForm();
            }
          }}
        />
      </Field>

      <Field label="Describe your cat" invalid={!!errors.age}>
        <CatDescriptionEditor
          editor={editor}
          onChange={(e) => {
            setFieldValue("description", JSON.stringify(e));
          }}
        />
      </Field>

      <div className="flex space-x-2">
        <button
          disabled={isSubmitting}
          type="submit"
          className="rounded-md bg-lime-600 px-8 py-3 text-lg text-white"
        >
          Save
        </button>
      </div>
    </form>
  );
};
