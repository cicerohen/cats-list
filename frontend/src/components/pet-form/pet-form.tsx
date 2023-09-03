import { Descendant } from "slate";

import { PhotoField } from "./pet-form-photo-field";
import { NameField } from "./pet-form-name-field";
import { BreedField } from "./pet-form-breed-field";
import { AgeField } from "./pet-form-age-field";
import { DescriptionField } from "./pet-form-description-field";
import { ActionButton } from "./pet-form-action-button";

import { usePetForm } from "./use-pet-form";

import { Breed, Age } from "@app/types";

export type Props = ReturnType<typeof usePetForm> & {
  breeds: Breed[];
  ages: Age[];
  loadingPhoto: boolean;
  onChangePhoto: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemovePhoto: () => void;
};

export const PetForm = ({
  values,
  errors,
  breeds,
  ages,
  validateOnBlur,
  isSubmitting,
  dirty,
  loadingPhoto,
  handleSubmit,
  handleBlur,
  handleChange,
  setFieldValue,
  validateForm,
  onChangePhoto,
  onRemovePhoto,
}: Props) => {
  const onChangeAge = (age: Age) => {
    setFieldValue("age", age);
  };

  const onChangeBreed = (breed: Breed) => {
    setFieldValue("breed", breed);
  };

  const onBlur = () => {
    if (validateOnBlur) {
      validateForm();
    }
  };

  const onChangeDescription = (e: Descendant[]) => {
    setFieldValue("description", JSON.stringify(e));
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="flex justify-center">
        <PhotoField
          loading={loadingPhoto}
          value={values.photo}
          onChange={onChangePhoto}
          onRemove={onRemovePhoto}
        />
      </div>
      <NameField
        label="Pet name"
        name="name"
        value={values.name}
        disabled={isSubmitting}
        invalid={!!errors.name}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={errors.name}
      />
      <BreedField
        label="Pet breed"
        name="breed"
        breeds={breeds}
        value={values.breed}
        invalid={!!errors.breed}
        disabled={isSubmitting}
        errorMessage={errors.breed}
        onChange={onChangeBreed}
        onBlur={onBlur}
      />
      <AgeField
        label="Pet age"
        ages={ages}
        value={values.age}
        invalid={!!errors.age}
        disabled={isSubmitting}
        errorMessage={errors.age}
        onChange={onChangeAge}
        onBlur={onBlur}
      />
      <DescriptionField
        value={values.description}
        label="Pet description"
        invalid={!!errors.description}
        disabled={isSubmitting}
        errorMessage={errors.description}
        onChange={onChangeDescription}
      />
      <ActionButton
        action="save"
        isLoading={isSubmitting}
        disabled={isSubmitting || !dirty}
      />
    </form>
  );
};
