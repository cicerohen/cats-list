import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Modal } from "../components/modal";
import { CatForm } from "../components/cat-form";

import { useFetchApi } from "../hooks/use-fetch-api";
import { useOnChangePhotoHandler } from "../hooks/use-onchange-photo-handler";
import { useOnRemovePhotoHandler } from "../hooks/use-onremove-photo-handler";
import { useOnSubmitPetFormHandler } from "../hooks/use-onsubmit-pet-form-handler";

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
    <Modal.Root show>
      <Modal.Backdrop />
      <Modal.Content>
        <Modal.Header>
          <Modal.Close onClick={onCloseModal} />
          <Modal.Title>Add a cat</Modal.Title>
        </Modal.Header>
        <CatForm.Root {...petForm}>
          <CatForm.Photo
            loading={loadingOnChangePhoto || loadingOnRemovePhoto}
            onChange={onChangePhoto}
            onRemove={onRemovePhoto}
          />
          <CatForm.Name />
          <CatForm.Age ages={ages} />
          <CatForm.Breed breeds={breeds} />
          <CatForm.Description editor={petForm.editor} />
          <div>
            <CatForm.Submit />
          </div>
        </CatForm.Root>
      </Modal.Content>
    </Modal.Root>
  );
};
