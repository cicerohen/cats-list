import { useState } from "react";

import { useCatForm, initialValues } from "../components/cat-form";
import { useToasterContext } from "../components/toaster/provider";
import { useCatsContext } from "../contexts/cats-provider";
import { useFetchApi } from "./use-fetch-api";

import { Cat } from "@app/types";

type Parameters = {
  petForm: ReturnType<typeof useCatForm>;
};

export const useOnRemovePhotoHandler = ({ petForm }: Parameters) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { addToast } = useToasterContext();
  const { fetchCats } = useCatsContext();
  const fetchApi = useFetchApi();

  const onRemovePhoto = () => {
    if (!petForm.values.photo.key) {
      return;
    }
    setLoading(true);
    fetchApi<Cat["photo"]>(
      `/photos/${petForm.values.photo.key}?catId=${petForm.values.id}`,
      "DELETE",
    )
      .then(() => {
        petForm.setFieldValue("photo", initialValues.photo);
        addToast({
          type: "success",
          text: "Photo was removed",
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
        setLoading(false);
      });
  };

  return {
    loading,
    onRemovePhoto,
  };
};
