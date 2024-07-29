import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Modal } from "../components/modal";
import { CatForm } from "../components/cat-form";

import { useFetchApi } from "../hooks/use-fetch-api";
import { useOnChangePhotoHandler } from "../hooks/use-onchange-photo-handler";
import { useOnRemovePhotoHandler } from "../hooks/use-onremove-photo-handler";
import { useOnSubmitPetFormHandler } from "../hooks/use-onsubmit-pet-form-handler";
import { useOnRemoveCatHandler } from "../hooks/use-onremove-cat-handler";

import { Age, Cat, Breed } from "@app/types";

export const EditCatPage = () => {
  const [ages, setAges] = useState<Age[]>([]);
  const [breeds, setBreeds] = useState<Breed[]>([]);

  const fetchApi = useFetchApi();
  const navigation = useNavigate();
  const params = useParams();

  const petForm = useOnSubmitPetFormHandler();

  const { onRemove, loading: loadingOnRemoveCat } = useOnRemoveCatHandler({
    petForm,
  });

  const { loading: loadingOnChangePhoto, onChangePhoto } =
    useOnChangePhotoHandler({
      petForm,
    });

  const { loading: loadingOnRemovePhoto, onRemovePhoto } =
    useOnRemovePhotoHandler({
      petForm,
    });

  const onCloseModal = () => {
    navigation(-1);
  };

  useEffect(() => {
    Promise.all([
      fetchApi<Age[]>("/ages"),
      fetchApi<Breed[]>("/breeds"),
      fetchApi<Cat>(`/cats/${params.id}`),
    ]).then((res) => {
      setAges(res[0].data);
      setBreeds(res[1].data);
      petForm.resetForm({
        values: res[2].data,
      });
    });
  }, []);

  return (
    <Modal.Root show>
      <Modal.Backdrop />
      <Modal.Content>
        <Modal.Header>
          <Modal.Close onClick={onCloseModal} />
          <Modal.Title>Edit cat</Modal.Title>
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
          <CatForm.ActionButtons>
            <CatForm.Submit />
            <CatForm.Remove
              onClick={onRemove}
              loading={loadingOnRemoveCat}
              disabled={loadingOnChangePhoto || loadingOnRemovePhoto}
            />
          </CatForm.ActionButtons>
        </CatForm.Root>
      </Modal.Content>
    </Modal.Root>
  );
};
