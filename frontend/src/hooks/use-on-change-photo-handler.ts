import { useState } from "react";

import { useCatForm } from "../components/cat-form";
import { useToasterContext } from "../components/toaster/provider";
import { useCatsContext } from "../contexts/cats-provider";

import { useFetchApi } from "./use-fetch-api";
import { getDefaultHeaders, DefaultHeaders } from "../utils/fetch-api";

import { Cat } from "@app/types";

type Parameters = {
  petForm: ReturnType<typeof useCatForm>;
};

export const useOnChangePhotoHandler = ({ petForm }: Parameters) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { addToast } = useToasterContext();
  const { fetchCats } = useCatsContext();
  const fetchApi = useFetchApi();

  const onChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];

    if (!file) {
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("catId", petForm.values.id);

    const headers: DefaultHeaders = getDefaultHeaders();
    delete headers["Content-Type"];

    fetchApi<Cat["photo"]>("/photos", "POST", formData, {
      headers,
    })
      .then((data) => {
        if (data.data) {
          petForm.setFieldValue("photo", data.data);
          fetchCats();
        }
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
    onChangePhoto,
  };
};
