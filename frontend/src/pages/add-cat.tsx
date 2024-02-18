import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Modal } from "../components/modal";
import { CatForm } from "../components/cat-form";

import { useFetchApi } from "../hooks/use-fetch-api";
import { useOnChangePhotoHandler } from "../hooks/use-on-change-photo-handler";
import { useOnRemovePhotoHandler } from "../hooks/use-on-remove-photo-handler";
import { useOnSubmitPetFormHandler } from "../hooks/use-on-submit-pet-form-handler";

import { Age, Breed } from "@app/types";

export const AddCatPage = () => {
  const fetchApi = useFetchApi();
  const [ages, setAges] = useState<Age[]>([]);
  const [breeds, setBreeds] = useState<Breed[]>([]);

  const navigation = useNavigate();
  const petForm = useOnSubmitPetFormHandler();

  const { loading: loadingOnChangePhoto, onChangePhoto } =
    useOnChangePhotoHandler({
      petForm,
    });

  const { loading: loadingOnRemovePhoto, onRemovePhoto } =
    useOnRemovePhotoHandler({
      petForm,
    });

  const onCloseModal = () => {
    navigation("/");
  };

  useEffect(() => {
    Promise.all([fetchApi<Age[]>("/ages"), fetchApi<Breed[]>("/breeds")]).then(
      (res) => {
        setAges(res[0].data);
        setBreeds(res[1].data);
      },
    );
  }, []);

  return (
    <Modal title="Add a cat" show onClose={onCloseModal}>
      <CatForm
        {...petForm}
        ages={ages}
        breeds={breeds}
        loadingPhoto={loadingOnChangePhoto || loadingOnRemovePhoto}
        onChangePhoto={onChangePhoto}
        onRemovePhoto={onRemovePhoto}
      />
    </Modal>
  );
};
