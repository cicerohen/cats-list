import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "../../components/modal";
import { PetForm } from "../../components/pet-form";
import { usePetForm } from "../../components/pet-form/use-pet-form";

import { useToasterContext } from "../../components/toaster/toaster-context";
import { useFetchApi } from "../../hooks/use-fetch-api";

import { Age, Cat, Breed } from "@app/types";

export const EditCatPage = () => {
  const fetchApi = useFetchApi();
  const navigation = useNavigate();
  const [ages, setAges] = useState<Age[]>([]);
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [loadingPhoto, setLoadingPhoto] = useState<boolean>(false);
  const { addToast } = useToasterContext();
  const params = useParams();

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

  const fetchCat = () => {
    fetchApi<Cat>(`/cats/${params.id}`).then((data) => {
      console.log("dsdsd", data);
    });
  };

  const onClose = () => {
    navigation(-1);
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
    fetchCat();
  }, []);
  return (
    <Modal title="Edit cat" show onClose={onClose}>
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
