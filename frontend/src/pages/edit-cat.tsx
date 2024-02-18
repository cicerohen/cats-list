import { useEffect, useState } from "react";
import {} from "formik";
import { useNavigate, useParams } from "react-router-dom";

import { Modal } from "../components/modal";
import { CatForm } from "../components/cat-form";

import { useFetchApi } from "../hooks/use-fetch-api";
import { useOnChangePhotoHandler } from "../hooks/use-on-change-photo-handler";
import { useOnRemovePhotoHandler } from "../hooks/use-on-remove-photo-handler";
import { useOnSubmitPetFormHandler } from "../hooks/use-on-submit-pet-form-handler";
import { useOnRemoveCatHandler } from "../hooks/use-on-remove-cat-handler";

import { Age, Cat, Breed } from "@app/types";

export const EditCatPage = () => {
  const [ages, setAges] = useState<Age[]>([]);
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [showLoader, setShowLoader] = useState<boolean>(true);

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

  const onClose = () => {
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
      setShowLoader(false);
    });
  }, []);

  return (
    <Modal title="Edit cat" show onClose={onClose} showLoader={showLoader}>
      <CatForm
        {...petForm}
        ages={ages}
        breeds={breeds}
        removingCat={loadingOnRemoveCat}
        loadingPhoto={loadingOnChangePhoto || loadingOnRemovePhoto}
        onChangePhoto={onChangePhoto}
        onRemovePhoto={onRemovePhoto}
        onRemove={onRemove}
      />
    </Modal>
  );
};
