import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../components/modal";
import { PetForm } from "../../components/pet-form";
import {
  usePetForm,
  initialValues,
} from "../../components/pet-form/use-pet-form";

import { useToasterContext } from "../../components/toaster/toaster-context";
import { useFetchApi } from "../../hooks/use-fetch-api";
import { getDefaultHeaders, DefaultHeaders } from "../../services/fetch-api";

import { Age, Cat, Breed } from "@app/types";

export const AddCatPage = () => {
  const fetchApi = useFetchApi();
  const [ages, setAges] = useState<Age[]>([]);
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [loadingPhoto, setLoadingPhoto] = useState<boolean>(false);
  const { addToast } = useToasterContext();

  const navigation = useNavigate();

  const form = usePetForm({
    onSubmit: (values, helpers) => {
      if (values.id) {
        fetchApi(`/cats/${values.id}`, "PATCH", JSON.stringify(values))
          .then(() => {
            addToast({
              type: "success",
              text: "Cat was updated",
            });
          })
          .catch((error) => {
            addToast({
              type: "error",
              text: error.message,
            });
          })
          .finally(() => {
            helpers.setSubmitting(false);
            helpers.resetForm();
          });

        return;
      }

      fetchApi("/cats", "POST", JSON.stringify(values))
        .then(() => {
          addToast({
            type: "success",
            text: "Cat was added",
          });
        })
        .catch((error) => {
          addToast({
            type: "error",
            text: error.message,
          });
        })
        .finally(() => {
          form.resetForm({
            values: initialValues,
          });

          helpers.setSubmitting(false);
        });
    },
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

  const onCloseModal = () => {
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

    const headers: DefaultHeaders = getDefaultHeaders();
    delete headers["Content-Type"];

    fetchApi<Cat["photo"]>("/photos", "POST", formData, {
      headers,
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
    <Modal title="Add a cat" show onClose={onCloseModal}>
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
