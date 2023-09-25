import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../components/modal";
import { PetForm } from "../../components/pet-form";
import { usePetForm } from "../../components/pet-form/use-pet-form";

import { useToasterContext } from "../../components/toaster/toaster-context";
import { useFetchApi } from "../../hooks/use-fetch-api";
import { Age, Cat, Breed } from "@app/types";

export const AddCatPage = () => {
  const fetchApi = useFetchApi();
  const [ages, setAges] = useState<Age[]>([]);
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [loadingPhoto, setLoadingPhoto] = useState<boolean>(false);
  const { addToast } = useToasterContext();

  const initialValues = useMemo<Cat>(
    () => ({
      id: "",
      name: "",
      breed: { id: 0, name: "" },
      age: { id: 0, name: "" },
      description: JSON.stringify([
        {
          type: "paragraph",
          children: [
            {
              text: "",
            },
          ],
        },
      ]),
      photo: {
        key: "",
        url: "",
      },
    }),
    [],
  );

  const navigation = useNavigate();

  const form = usePetForm({
    onSubmit: () => {},
  });

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

  const onClose = () => {
    navigation("/");
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
    <Modal title="Add a cat" show onClose={onClose}>
      <PetForm
        {...form}
        ages={ages}
        breeds={breeds}
        loadingPhoto={loadingPhoto}
        onChangePhoto={onChangePhoto}
        onRemovePhoto={onRemovePhoto}
      />
    </Modal>
  );
};
