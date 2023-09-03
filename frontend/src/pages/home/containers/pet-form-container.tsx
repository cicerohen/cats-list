import { useEffect, useState } from "react";
import { PetForm } from "../../../components/pet-form";

import { usePetFormContext } from "../contexts/pet-form-context";
import { fetchApi } from "../../../services/fetch-api";

import { Age, Cat, Breed } from "@app/types";
import { useToasterContext } from "../../../components/toaster/toaster-context";

type Props = {
  fetchCats: () => void;
};

export const PetFormContainer = ({ fetchCats }: Props) => {
  const { form, initialValues } = usePetFormContext();
  const { addToast } = useToasterContext();
  const [ages, setAges] = useState<Age[]>([]);
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [loadingPhoto, setLoadingPhoto] = useState<boolean>(false);

  const fetchAges = () => {
    fetchApi<Age[]>("/ages").then((data) => {
      setAges(data.data);
    });
  };

  const fetchBreeds = () => {
    fetchApi<Breed[]>("/breeds").then((data) => {
      setBreeds(data.data);
    });
  };

  const onChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];

    if (!file) {
      return;
    }

    setLoadingPhoto(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("catId", form.values.id);

    fetchApi<Cat["photo"]>("/photos", "POST", formData, {
      headers: {},
    })
      .then((data) => {
        if (data.data) {
          form.setFieldValue("photo", data.data);
        }
        fetchCats();
      })
      .catch((error) => {
        addToast({
          type: "error",
          text: error.message,
        });
      })
      .finally(() => {
        setLoadingPhoto(false);
      });
  };

  const onRemovePhoto = () => {
    if (!form.values.photo.key) {
      return;
    }
    setLoadingPhoto(true);

    fetchApi<Cat["photo"]>(
      `/photos/${form.values.photo.key}?catId=${form.values.id}`,
      "DELETE",
    )
      .then(() => {
        form.setFieldValue("photo", initialValues.photo);
        addToast({
          type: "success",
          text: "Photo successfully removed",
        });
        fetchCats();
      })
      .catch((error) => {
        addToast({
          type: "error",
          text: error.message,
        });
      })
      .finally(() => {
        setLoadingPhoto(false);
      });
  };

  useEffect(() => {
    fetchAges();
    fetchBreeds();
  }, []);

  return (
    <PetForm
      {...form}
      ages={ages}
      breeds={breeds}
      loadingPhoto={loadingPhoto}
      onChangePhoto={onChangePhoto}
      onRemovePhoto={onRemovePhoto}
    />
  );
};
